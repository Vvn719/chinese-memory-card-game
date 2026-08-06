import { getBucket, isAdmin } from "../../../lib/admin";

const ALLOWED = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);

export async function GET(request: Request) {
  const key = new URL(request.url).searchParams.get("key") ?? "";
  if (!key.startsWith("unit-images/")) return new Response("Not found", { status: 404 });
  const object = await (await getBucket()).get(key);
  if (!object) return new Response("Not found", { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");
  return new Response(object.body, { headers });
}

export async function POST(request: Request) {
  if (!await isAdmin(request)) return Response.json({ error: "無權限" }, { status: 403 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return Response.json({ error: "請選擇圖片" }, { status: 400 });
  const extension = ALLOWED.get(file.type);
  if (!extension || file.size > 5 * 1024 * 1024) {
    return Response.json({ error: "請上傳 5MB 以下的 JPG、PNG、WebP 或 GIF" }, { status: 400 });
  }
  const key = `unit-images/${crypto.randomUUID()}.${extension}`;
  await (await getBucket()).put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
  return Response.json({ url: `/api/uploads?key=${encodeURIComponent(key)}` }, { status: 201 });
}

type AppEnv = { ADMIN_EMAIL?: string; BUCKET?: R2Bucket };

async function getBindings() {
  const { env } = await import("cloudflare:workers");
  return env as unknown as AppEnv;
}

export async function isAdmin(request: Request) {
  const appEnv = await getBindings();
  const expected = appEnv.ADMIN_EMAIL?.trim().toLowerCase();
  const actual = request.headers.get("oai-authenticated-user-email")?.trim().toLowerCase();
  return Boolean(expected && actual && expected === actual);
}

export async function getBucket() {
  const bucket = (await getBindings()).BUCKET;
  if (!bucket) throw new Error("R2 binding `BUCKET` is unavailable");
  return bucket;
}

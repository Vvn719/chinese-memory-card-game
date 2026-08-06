import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { units, words } from "../../../../db/schema";
import { isAdmin } from "../../../../lib/admin";
import { COLORS, type Unit } from "../../../../lib/units";

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: Context) {
  if (!await isAdmin(request)) return Response.json({ error: "無權限" }, { status: 403 });
  const { id } = await context.params;
  const payload = await request.json() as Partial<Unit>;
  const title = payload.title?.trim();
  const entries = payload.words?.filter((item) => item.word?.trim() && item.zhuyin?.trim()) ?? [];
  if (!title || entries.length < 2) return Response.json({ error: "請至少保留兩個完整單字" }, { status: 400 });

  const db = await getDb();
  await db.update(units).set({
    title,
    subtitle: payload.subtitle?.trim() ?? "",
    icon: payload.icon?.trim() || "📚",
  }).where(eq(units.id, id));
  await db.delete(words).where(eq(words.unitId, id));
  await db.insert(words).values(entries.map((item, index) => ({
    id: item.id || crypto.randomUUID(),
    unitId: id,
    word: item.word.trim(),
    zhuyin: item.zhuyin.trim(),
    khmer: item.khmer?.trim() ?? "",
    imageUrl: item.imageUrl || null,
    emoji: item.emoji || "🖼️",
    color: item.color || COLORS[index % COLORS.length],
    sortOrder: index,
  })));
  return Response.json({ ok: true });
}

export async function DELETE(request: Request, context: Context) {
  if (!await isAdmin(request)) return Response.json({ error: "無權限" }, { status: 403 });
  const { id } = await context.params;
  const db = await getDb();
  await db.delete(words).where(eq(words.unitId, id));
  await db.delete(units).where(eq(units.id, id));
  return Response.json({ ok: true });
}

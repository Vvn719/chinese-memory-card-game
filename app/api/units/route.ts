import { asc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { units, words } from "../../../db/schema";
import { isAdmin } from "../../../lib/admin";
import { COLORS, DEFAULT_UNITS, type Unit } from "../../../lib/units";

async function seedDefaults() {
  const db = await getDb();
  const existing = await db.select({ id: units.id }).from(units).limit(1);
  if (existing.length) return;
  await db.insert(units).values(DEFAULT_UNITS.map((unit) => ({
    id: unit.id,
    title: unit.title,
    subtitle: unit.subtitle,
    icon: unit.icon,
    sortOrder: unit.sortOrder,
  }))).onConflictDoNothing();

  await db.insert(words).values(DEFAULT_UNITS.flatMap((unit) => unit.words.map((word, index) => ({
    ...word,
    unitId: unit.id,
    sortOrder: index,
  })))).onConflictDoNothing();
}

export async function GET(request: Request) {
  try {
    await seedDefaults();
    const db = await getDb();
    const unitRows = await db.select().from(units).orderBy(asc(units.sortOrder), asc(units.createdAt));
    const wordRows = await db.select().from(words).orderBy(asc(words.sortOrder));
    const result: Unit[] = unitRows.map((unit) => ({
      id: unit.id,
      title: unit.title,
      subtitle: unit.subtitle,
      icon: unit.icon,
      sortOrder: unit.sortOrder,
      words: wordRows.filter((word) => word.unitId === unit.id).map((word) => ({
        id: word.id,
        word: word.word,
        zhuyin: word.zhuyin,
        khmer: word.khmer,
        imageUrl: word.imageUrl,
        emoji: word.emoji,
        color: word.color,
      })),
    }));
    return Response.json({ units: result, isAdmin: await isAdmin(request) });
  } catch {
    return Response.json({ units: DEFAULT_UNITS, isAdmin: await isAdmin(request), fallback: true });
  }
}

export async function POST(request: Request) {
  if (!await isAdmin(request)) return Response.json({ error: "無權限" }, { status: 403 });
  const payload = await request.json() as Partial<Unit>;
  const title = payload.title?.trim();
  const entries = payload.words?.filter((item) => item.word?.trim() && item.zhuyin?.trim()) ?? [];
  if (!title || entries.length < 2) {
    return Response.json({ error: "請填寫單元名稱與至少兩個單字" }, { status: 400 });
  }

  const db = await getDb();
  const unitId = crypto.randomUUID();
  const maxOrder = (await db.select().from(units).orderBy(asc(units.sortOrder))).length;
  await db.insert(units).values({
    id: unitId,
    title,
    subtitle: payload.subtitle?.trim() ?? "",
    icon: payload.icon?.trim() || "📚",
    sortOrder: maxOrder + 1,
  });
  await db.insert(words).values(entries.map((item, index) => ({
    id: crypto.randomUUID(),
    unitId,
    word: item.word.trim(),
    zhuyin: item.zhuyin.trim(),
    khmer: item.khmer?.trim() ?? "",
    imageUrl: item.imageUrl || null,
    emoji: item.emoji || "🖼️",
    color: COLORS[index % COLORS.length],
    sortOrder: index,
  })));
  const [created] = await db.select().from(units).where(eq(units.id, unitId));
  return Response.json({ unit: created }, { status: 201 });
}

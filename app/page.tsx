"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { DEFAULT_UNITS, type Unit, type WordEntry } from "../lib/units";

type Card = WordEntry & { cardId: string };
type View = "units" | "review" | "game" | "manage";
type DraftWord = WordEntry & { file?: File };

const EMPTY_WORD = (index: number): DraftWord => ({
  id: "",
  word: "",
  zhuyin: "",
  khmer: "",
  imageUrl: null,
  emoji: "🖼️",
  color: ["coral", "orange", "mint", "blue", "violet", "yellow"][index % 6],
});

function shuffle<T>(items: T[]) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function makeDeck(words: WordEntry[]): Card[] {
  return shuffle(words.flatMap((item) => [
    { ...item, cardId: `${item.id}-a` },
    { ...item, cardId: `${item.id}-b` },
  ]));
}

function WordPicture({ item, className = "" }: { item: WordEntry; className?: string }) {
  if (item.imageUrl) {
    return <img className={className} src={item.imageUrl} alt="" />;
  }
  return <span className={className} aria-hidden="true">{item.emoji || "🖼️"}</span>;
}

export default function Home() {
  const [view, setView] = useState<View>("units");
  const [units, setUnits] = useState<Unit[]>(DEFAULT_UNITS);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeUnitId, setActiveUnitId] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [openCards, setOpenCards] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formSubtitle, setFormSubtitle] = useState("");
  const [formIcon, setFormIcon] = useState("📚");
  const [formWords, setFormWords] = useState<DraftWord[]>([EMPTY_WORD(0), EMPTY_WORD(1)]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const activeUnit = useMemo(
    () => units.find((unit) => unit.id === activeUnitId) ?? null,
    [activeUnitId, units],
  );

  const loadUnits = useCallback(async () => {
    try {
      const response = await fetch("/api/units");
      if (!response.ok) return;
      const data = await response.json() as { units?: Unit[]; isAdmin?: boolean };
      if (data.units?.length) setUnits(data.units);
      setIsAdmin(Boolean(data.isAdmin || window.location.hostname === "terminal.local"));
    } catch {
      setUnits(DEFAULT_UNITS);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/units")
      .then((response) => response.ok ? response.json() : null)
      .then((data: { units?: Unit[]; isAdmin?: boolean } | null) => {
        if (cancelled || !data) return;
        if (data.units?.length) setUnits(data.units);
        setIsAdmin(Boolean(data.isAdmin || window.location.hostname === "terminal.local"));
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, []);

  function resetGame(unit = activeUnit) {
    if (!unit) return;
    setCards(makeDeck(unit.words));
    setOpenCards([]);
    setMatched([]);
    setMoves(0);
    setLocked(false);
    setShowWin(false);
  }

  function selectUnit(unit: Unit) {
    setActiveUnitId(unit.id);
    setHasStarted(false);
    setCards(makeDeck(unit.words));
    setOpenCards([]);
    setMatched([]);
    setMoves(0);
    setShowWin(false);
    setView("review");
  }

  function openReview() {
    if (!activeUnit) return;
    setShowWin(false);
    setView("review");
  }

  function openGame() {
    if (!activeUnit) return;
    if (!hasStarted || matched.length === activeUnit.words.length) resetGame(activeUnit);
    setHasStarted(true);
    setView("game");
  }

  function flipCard(card: Card) {
    if (locked || openCards.includes(card.cardId) || matched.includes(card.id)) return;
    if (openCards.length === 0) {
      setOpenCards([card.cardId]);
      return;
    }

    const firstCard = cards.find((item) => item.cardId === openCards[0]);
    setOpenCards((current) => [...current, card.cardId]);
    setMoves((current) => current + 1);

    if (firstCard?.id === card.id) {
      const nextMatched = [...matched, card.id];
      setMatched(nextMatched);
      window.setTimeout(() => setOpenCards([]), 420);
      if (activeUnit && nextMatched.length === activeUnit.words.length) {
        window.setTimeout(() => setShowWin(true), 650);
      }
      return;
    }

    setLocked(true);
    window.setTimeout(() => {
      setOpenCards([]);
      setLocked(false);
    }, 900);
  }

  function resetForm() {
    setFormTitle("");
    setFormSubtitle("");
    setFormIcon("📚");
    setFormWords([EMPTY_WORD(0), EMPTY_WORD(1)]);
    setEditingId(null);
    setFormMessage("");
  }

  function editUnit(unit: Unit) {
    setFormTitle(unit.title);
    setFormSubtitle(unit.subtitle);
    setFormIcon(unit.icon);
    setFormWords(unit.words.map((word) => ({ ...word })));
    setEditingId(unit.id);
    setFormMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateDraft(index: number, patch: Partial<DraftWord>) {
    setFormWords((current) => current.map((item, i) => i === index ? { ...item, ...patch } : item));
  }

  async function saveUnit() {
    if (!formTitle.trim() || formWords.length < 2 || formWords.some((word) => !word.word.trim() || !word.zhuyin.trim() || !word.khmer.trim())) {
      setFormMessage("請填寫單元名稱，以及至少兩個完整的中文、注音與柬文。");
      return;
    }
    setSaving(true);
    setFormMessage("正在儲存…");
    try {
      const uploadedWords = await Promise.all(formWords.map(async (word) => {
        if (!word.file) return word;
        const form = new FormData();
        form.append("file", word.file);
        const upload = await fetch("/api/uploads", { method: "POST", body: form });
        const result = await upload.json() as { url?: string; error?: string };
        if (!upload.ok || !result.url) throw new Error(result.error || "圖片上傳失敗");
        return { ...word, imageUrl: result.url, emoji: null, file: undefined };
      }));

      const response = await fetch(editingId ? `/api/units/${editingId}` : "/api/units", {
        method: editingId ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title: formTitle,
          subtitle: formSubtitle,
          icon: formIcon,
          words: uploadedWords.map((word) => ({
            id: word.id,
            word: word.word,
            zhuyin: word.zhuyin,
            khmer: word.khmer,
            imageUrl: word.imageUrl,
            emoji: word.emoji,
            color: word.color,
          })),
        }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "儲存失敗");
      await loadUnits();
      resetForm();
      setFormMessage("已儲存！學生現在就能看到這個單元。");
    } catch (error) {
      setFormMessage(error instanceof Error ? error.message : "儲存失敗，請再試一次。");
    } finally {
      setSaving(false);
    }
  }

  async function deleteUnit(unit: Unit) {
    if (!window.confirm(`確定要刪除「${unit.title}」嗎？`)) return;
    const response = await fetch(`/api/units/${unit.id}`, { method: "DELETE" });
    if (response.ok) {
      await loadUnits();
      if (editingId === unit.id) resetForm();
    }
  }

  const wordCount = activeUnit?.words.length ?? 0;
  const progress = wordCount ? matched.length / wordCount : 0;
  const gridColumns = wordCount <= 2 ? 4 : Math.min(6, wordCount);
  const subtitle = view === "units"
    ? "ជ្រើសរើសមេរៀន！選一個單元開始學習！"
    : view === "manage"
      ? "គ្រប់គ្រងមេរៀន · 老師的單元管理"
      : view === "review"
        ? "មើលពាក្យជាមុនសិន！先複習，再挑戰！"
        : "រកកាតដែលដូចគ្នា！找出兩張一樣的卡片吧！";

  return (
    <main>
      <div className="sun sun-one" aria-hidden="true" />
      <div className="sun sun-two" aria-hidden="true" />

      <nav className="top-nav" aria-label="頁面導覽">
        <button type="button" className={`unit-nav ${view === "units" ? "is-active" : ""}`} onClick={() => { setShowWin(false); setView("units"); }}>
          <span aria-hidden="true">⌂</span> 單元
        </button>
        {activeUnit && view !== "units" && view !== "manage" && (
          <button type="button" className={`review-nav ${view === "review" ? "is-active" : ""}`} onClick={openReview}>
            <span aria-hidden="true">▤</span> 複習
          </button>
        )}
        {isAdmin && (
          <button type="button" className={`manage-nav ${view === "manage" ? "is-active" : ""}`} onClick={() => { setShowWin(false); setView("manage"); }}>
            <span aria-hidden="true">✎</span> 管理
          </button>
        )}
      </nav>

      <header className="hero">
        <div className="brand-mark" aria-hidden="true"><span>中</span></div>
        <div className="hero-copy">
          <p className="eyebrow">រៀនភាសាចិន · 中文學習</p>
          <h1>中文翻牌挑戰</h1>
          <p className="subtitle">{subtitle}</p>
        </div>
        <div className="hero-doodle" aria-hidden="true">✦</div>
      </header>

      {view === "units" && (
        <section className="units-shell" aria-labelledby="units-title">
          <div className="section-heading">
            <div>
              <p className="step-label"><span>1</span> 選擇今天要複習的內容</p>
              <h2 id="units-title">學習單元</h2>
              <p>每個單元都會先看圖片和注音，再進入翻牌挑戰。</p>
            </div>
            {isAdmin && <button type="button" className="add-unit-button" onClick={() => { resetForm(); setView("manage"); }}>＋ 新增單元</button>}
          </div>
          <div className="unit-grid">
            {units.map((unit, index) => (
              <button type="button" className={`unit-tile tile-${index % 3}`} key={unit.id} onClick={() => selectUnit(unit)}>
                <span className="unit-icon" aria-hidden="true">{unit.icon}</span>
                <span className="unit-copy">
                  <strong>{unit.title}</strong>
                  <small>{unit.subtitle || "中文單字練習"}</small>
                  <em>{unit.words.length} 個單字 · {unit.words.length * 2} 張牌</em>
                </span>
                <span className="unit-thumbnails" aria-hidden="true">
                  {unit.words.slice(0, 3).map((word) => <WordPicture item={word} className="unit-thumb" key={word.id} />)}
                </span>
                <span className="unit-arrow" aria-hidden="true">→</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {view === "review" && activeUnit && (
        <section className="review-shell" aria-labelledby="review-title">
          <div className="review-heading">
            <div>
              <p className="step-label"><span>2</span> 挑戰前先看一看</p>
              <h2 id="review-title">{activeUnit.icon} {activeUnit.title}</h2>
              <p>看看圖片、讀讀中文和注音，準備好再開始！</p>
            </div>
            <span className="word-count">{activeUnit.words.length} 個單字</span>
          </div>
          <div className={`review-grid count-${activeUnit.words.length}`}>
            {activeUnit.words.map((item, index) => (
              <article className={`review-card ${item.color}`} key={item.id}>
                <span className="review-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <WordPicture item={item} className={item.imageUrl ? "review-image" : "review-emoji"} />
                <div className={item.word.length >= 7 ? "review-copy is-phrase" : "review-copy"}>
                  <h3>{item.word}</h3>
                  <p className="review-zhuyin">{item.zhuyin}</p>
                  <p className="review-khmer" lang="km">{item.khmer}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="review-footer">
            <p><span aria-hidden="true">💡</span> 可以大聲唸一次，會記得更牢喔！</p>
            <button type="button" className="start-button" onClick={openGame}>
              {hasStarted && matched.length < activeUnit.words.length ? "繼續挑戰" : "開始挑戰"}<span aria-hidden="true">→</span>
            </button>
          </div>
        </section>
      )}

      {view === "game" && activeUnit && (
        <section className="game-shell" aria-label={`${activeUnit.title}中文單字配對遊戲`}>
          <div className="game-toolbar">
            <div className="progress-block">
              <div className="progress-label"><span>{activeUnit.icon} {activeUnit.title} · 配對進度</span><strong>{matched.length} / {activeUnit.words.length}</strong></div>
              <div className="progress-track" aria-label={`完成 ${matched.length} 組，共 ${activeUnit.words.length} 組`}>
                <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
              </div>
            </div>
            <div className="toolbar-actions">
              <div className="move-counter" aria-live="polite"><span>翻牌次數</span><strong>{moves}</strong></div>
              <button className="restart-button" type="button" onClick={() => resetGame()}><span aria-hidden="true">↻</span> 重新開始</button>
            </div>
          </div>
          <div className="card-grid" style={{ "--grid-cols": gridColumns } as CSSProperties} aria-live="polite">
            {cards.map((card) => {
              const isOpen = openCards.includes(card.cardId);
              const isMatched = matched.includes(card.id);
              const isVisible = isOpen || isMatched;
              return (
                <button key={card.cardId} type="button" className={`card ${card.word.length >= 7 ? "is-phrase" : ""} ${isVisible ? "is-flipped" : ""} ${isMatched ? "is-matched" : ""}`} onClick={() => flipCard(card)} aria-label={isVisible ? `${card.word}，注音 ${card.zhuyin}，柬文 ${card.khmer}${isMatched ? "，已配對" : ""}` : "尚未翻開的卡片"} aria-pressed={isVisible} disabled={isMatched}>
                  <span className="card-inner">
                    <span className="card-face card-back"><span className="back-ring"><span className="back-symbol">中</span></span><span className="back-dots" aria-hidden="true">• • •</span></span>
                    <span className={`card-face card-front ${card.color}`}>
                      <WordPicture item={card} className={card.imageUrl ? "card-image" : "sport-emoji"} />
                      <span className="word">{card.word}</span>
                      <span className="zhuyin">{card.zhuyin}</span>
                      <span className="khmer" lang="km">{card.khmer}</span>
                      {isMatched && <span className="matched-check" aria-hidden="true">✓</span>}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          <p className="tip"><span aria-hidden="true">💡</span> 小提示：先記住每張卡片的位置，再找出相同的詞！</p>
        </section>
      )}

      {view === "manage" && isAdmin && (
        <section className="manage-shell" aria-labelledby="manage-title">
          <div className="section-heading manage-heading">
            <div><p className="step-label"><span>✎</span> 老師專用</p><h2 id="manage-title">{editingId ? "編輯單元" : "新增單元"}</h2><p>單字可以是 2、4、6 個或更多，版面會自動調整。</p></div>
            {editingId && <button type="button" className="cancel-edit" onClick={resetForm}>取消編輯</button>}
          </div>
          <div className="unit-form">
            <div className="unit-form-row">
              <label><span>單元圖示</span><input value={formIcon} onChange={(event) => setFormIcon(event.target.value)} maxLength={4} /></label>
              <label className="grow"><span>單元名稱 *</span><input value={formTitle} onChange={(event) => setFormTitle(event.target.value)} placeholder="例如：交通工具" /></label>
              <label className="grow"><span>簡短說明</span><input value={formSubtitle} onChange={(event) => setFormSubtitle(event.target.value)} placeholder="例如：生活中常見的車子" /></label>
            </div>
            <div className="word-form-list">
              {formWords.map((item, index) => (
                <fieldset className="word-form-card" key={`${item.id}-${index}`}>
                  <legend>單字 {index + 1}</legend>
                  <div className="word-preview">
                    {item.file ? <img src={URL.createObjectURL(item.file)} alt="圖片預覽" /> : item.imageUrl ? <img src={item.imageUrl} alt="圖片預覽" /> : <span>{item.emoji || "🖼️"}</span>}
                  </div>
                  <label><span>中文 *</span><input value={item.word} onChange={(event) => updateDraft(index, { word: event.target.value })} placeholder="例如：雨衣" /></label>
                  <label><span>注音 *</span><input value={item.zhuyin} onChange={(event) => updateDraft(index, { zhuyin: event.target.value })} placeholder="例如：ㄩˇ ㄧ" /></label>
                  <label className="khmer-field"><span>柬文 *</span><input lang="km" value={item.khmer} onChange={(event) => updateDraft(index, { khmer: event.target.value })} placeholder="例如：អាវភ្លៀង" /></label>
                  <label className="file-label"><span>圖片</span><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => updateDraft(index, { file: event.target.files?.[0] })} /></label>
                  {formWords.length > 2 && <button type="button" className="remove-word" onClick={() => setFormWords((current) => current.filter((_, i) => i !== index))} aria-label={`移除單字 ${index + 1}`}>×</button>}
                </fieldset>
              ))}
            </div>
            <div className="form-actions">
              <button type="button" className="add-word" onClick={() => setFormWords((current) => [...current, EMPTY_WORD(current.length)])}>＋ 再加一個單字</button>
              <span className="form-message" aria-live="polite">{formMessage}</span>
              <button type="button" className="save-unit" disabled={saving} onClick={() => void saveUnit()}>{saving ? "儲存中…" : editingId ? "儲存修改" : "建立單元"}</button>
            </div>
          </div>
          <div className="existing-units">
            <h3>現有單元</h3>
            {units.map((unit) => (
              <article key={unit.id}><span>{unit.icon}</span><div><strong>{unit.title}</strong><small>{unit.words.length} 個單字</small></div><button type="button" onClick={() => editUnit(unit)}>編輯</button><button type="button" className="delete-unit" onClick={() => void deleteUnit(unit)}>刪除</button></article>
            ))}
          </div>
        </section>
      )}

      <footer><p>每天認識一點中文，就會越來越厲害！</p><span aria-hidden="true">加油 · ស៊ូៗ</span></footer>

      {showWin && activeUnit && (
        <div className="modal-backdrop" role="presentation">
          <section className="win-modal" role="dialog" aria-modal="true" aria-labelledby="win-title">
            <div className="confetti" aria-hidden="true">✦　●　★　●　✦</div><div className="trophy" aria-hidden="true">🏆</div><p className="win-kicker">ពូកែណាស់!</p>
            <h2 id="win-title">太棒了，全部過關！</h2><p>你用了 <strong>{moves}</strong> 次完成「{activeUnit.title}」。</p>
            <div className="win-actions"><button type="button" className="secondary" onClick={() => { setShowWin(false); setView("units"); }}>選別的單元</button><button type="button" onClick={() => { resetGame(activeUnit); setView("game"); }}>再玩一次 →</button></div>
          </section>
        </div>
      )}
    </main>
  );
}

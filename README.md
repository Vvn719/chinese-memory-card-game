# 中文翻牌挑戰

給柬埔寨學生複習繁體中文的翻牌配對遊戲。

## 功能

- 挑戰前先用圖片、中文、注音與柬文複習
- 兩張相同的牌配對成功
- 支援 2、4、6 個或更多單字的不同單元
- 內建運動、機車配備、牙齒、交通、足球場、加油站、天氣與方向等課程
- 老師可新增、編輯、刪除單元並上傳圖片
- 使用 D1 儲存單元與單字，R2 儲存上傳圖片

## 線上版本

[開啟中文翻牌挑戰](https://chinese-sports-memory.uj-web-2871.chatgpt.site)

## 本機執行

需要 Node.js 22.13 或更新版本。

```bash
npm ci
npm run dev
```

## 環境設定

- `DB`：Cloudflare D1 binding
- `BUCKET`：Cloudflare R2 binding
- `ADMIN_EMAIL`：允許進入老師管理功能的帳號信箱

請勿將實際帳號或密鑰提交到 GitHub。

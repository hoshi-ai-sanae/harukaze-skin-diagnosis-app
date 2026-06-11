# 石けん工房 春風 アプリ・会員サイト

石けん工房 春風様向けの診断アプリと定期購入者限定サイトです。

## フォルダ構成

- `app/`
  - お肌診断アプリ本体
  - 診断画面、診断結果、商品リンク、レシピ検索を管理します。
- `member-site/`
  - 定期購入者様向けの会員サイト
  - パスワード入口、月別メッセージ、今月のレシピ、診断アプリへの導線を管理します。
- `assets/`
  - 共通画像、季節バナー、ロゴ、レシピPDF、OGP画像を管理します。
- `index.html`
  - 古いトップURLから `app/` へ案内する入口です。
- `member.html`
  - 古い会員サイトURLから `member-site/` へ案内する入口です。

## 主な編集場所

- 診断アプリの質問や結果文: `app/app.js`
- 診断アプリの見た目: `app/styles.css`
- レシピデータ: `app/recipes-data.js` / `app/formatted-recipes-data.js`
- 会員サイトの本文: `member-site/index.html`
- 会員サイトのパスワードや月表示: `member-site/member.js`
- 会員サイトの見た目: `member-site/member.css`

## 公開URL

- 診断アプリ: `https://hoshi-ai-sanae.github.io/harukaze-skin-diagnosis-app/app/`
- 会員サイト: `https://hoshi-ai-sanae.github.io/harukaze-skin-diagnosis-app/member-site/`

古いURLも入口ページとして残しているため、既存リンクからも移動できます。

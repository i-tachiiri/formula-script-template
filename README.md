# Formula Script Template

Google Apps Script用の数式生成テンプレートプロジェクトです。

## 概要

このテンプレートは、Google Apps Script (GAS) を使用してスプレッドシートで使用できる数式生成機能を開発するためのベースプロジェクトです。CLASPを使用してローカル開発環境からGoogle Apps Scriptプロジェクトを管理できます。

## 機能

- 数式生成のためのベース構造
- CLASP を使用したローカル開発環境
- TypeScript型定義サポート

## セットアップ

1. リポジトリをクローン
```bash
git clone https://github.com/i-tachiiri/formula-script-template.git
cd formula-script-template
```

2. 依存関係をインストール
```bash
npm install
```

3. CLASPにログインし、プロジェクトを作成
```bash
npx clasp login
npx clasp create --type sheets
```

## 使用方法

### 開発コマンド

- `npm run build` - コードをGoogle Apps Scriptにプッシュ
- `npm run watch` - ファイル変更を監視して自動プッシュ
- `npm run open` - ブラウザでGASエディタを開く
- `npm run logs` - 実行ログを表示
- `npm run deploy` - 新しいバージョンをデプロイ

### ファイル構成

```
src/
├── main.js           - メイン処理
├── FormulaGenerator.js - 数式生成ロジック
└── appsscript.json   - Apps Script設定
```

## ライセンス

MIT License
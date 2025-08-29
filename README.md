# Formula Script Template

Google Apps Script 用の数式生成テンプレートプロジェクトです。

## 🎯 このテンプレートについて

任意の数式タイプ（基本演算、文章題、微分積分など）に対応できる柔軟な Google Apps Script テンプレートです。

### 主な機能

- **柔軟な数式フォーマット**: 配列、文字列、カスタム構造など任意の形式に対応
- **Notion 連携**: NotionService 経由で Notion データベースと連携
- **Google Sheets 出力**: 生成した数式をスプレッドシートに出力
- **CLASP 統合**: ローカル開発環境から GAS プロジェクトを管理

## 📚 ドキュメント

### 🚀 新しい数式プロジェクトを作成する場合

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - 完全なセットアップ・実装ガイド

### 🛠️ 開発者向け

- **[CLAUDE.md](./CLAUDE.md)** - Claude Code 技術仕様
- **[package.json](./package.json)** - 利用可能なコマンド

## 🏗️ アーキテクチャ

```
_main.js → FormulaGenerator.js →  Google Sheets
    ↓
Notion API (PAGE_ID取得・更新)
```

## ⚡ クイックスタート

### テンプレートから新しいプロジェクトを作成

```bash
curl -fsSL https://raw.githubusercontent.com/i-tachiiri/formula-script-template/main/scripts/create-project.js | node - pageId=あなたのPageID projectName=プロジェクト名 formulaType="数式種類"
```

### セットアップと実装

詳細は [SETUP_GUIDE.md](./SETUP_GUIDE.md) をご覧ください。

## 💻 開発環境のセットアップ

1. 依存関係をインストール

```bash
npm install
```

2. CLASP ログイン

```bash
npx clasp login
```

## 使用方法

### 開発コマンド

- `npm run build` - コードを Google Apps Script にプッシュ
- `npm run watch` - ファイル変更を監視して自動プッシュ
- `npm run open` - Claude に GAS スクリプトエディタを開いてもらう（Claude が .clasp.json から scriptId を読み取ってブラウザで開く）
- `npm run deploy` - 新しいバージョンをデプロイ

### ファイル構成

```
src/
├── _main.js          - メイン処理
├── FormulaGenerator.js - 数式生成ロジック
└── appsscript.json   - Apps Script設定
```

## ライセンス

MIT License

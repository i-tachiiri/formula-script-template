# Formula Script Template

Google Apps Script用の数式生成テンプレートプロジェクトです。

## 🎯 このテンプレートについて

任意の数式タイプ（基本演算、文章題、微分積分など）に対応できる柔軟なGoogle Apps Scriptテンプレートです。

### 主な機能
- **柔軟な数式フォーマット**: 配列、文字列、カスタム構造など任意の形式に対応
- **Notion連携**: FormulaSharedLibライブラリ経由でNotionデータベースと連携  
- **Google Sheets出力**: 生成した数式をスプレッドシートに出力
- **Cloud Logging**: リアルタイムでの実行ログ監視
- **CLASP統合**: ローカル開発環境からGASプロジェクトを管理

## 📚 ドキュメント

### 🚀 新しい数式プロジェクトを作成する場合
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - 完全なセットアップ・実装ガイド
- **[CLAUDE_QUICK_START.md](./CLAUDE_QUICK_START.md)** - Claude Code用クイックスタート

### 🛠️ 開発者向け
- **[CLAUDE.md](./CLAUDE.md)** - Claude Code技術仕様
- **[package.json](./package.json)** - 利用可能なコマンド

## 🏗️ アーキテクチャ

```
main.js → FormulaGenerator.js → FormulaSharedLib → Google Sheets
    ↓
Notion API (PAGE_ID取得・更新)
```

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
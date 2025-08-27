# Notion連携 - ワンライナープロジェクト作成

NotionデータベースからワンライナーコマンドでFormula Scriptプロジェクトを作成する方法です。

## 🎯 概要

Notionの数式で自動生成されたコマンドを1行実行するだけで、新しいプロジェクトが完全セットアップされます。

## 📊 Notionデータベース設定

### 必須カラム

| カラム名 | タイプ | 説明 | 例 |
|---------|-------|------|---|
| `商品名` | Title | 数式の種類 | `10までの足し算` |
| `PageId` | Formula | ページID（ハイフンなし32文字） | `254d9f5c28f58150a167db703c269da5` |
| `TemplateName` | Select | テンプレート名 | `基本足し算`, `2桁掛け算` |

### 追加推奨カラム

| カラム名 | タイプ | 用途 |
|---------|-------|------|
| `ProjectName` | Formula | GitHub用プロジェクト名生成 |
| `CreateCommand` | Formula | **実行用コマンド生成** |
| `Status` | Select | 作成状況管理 |

## ⚡ Notion計算式

### ProjectName生成
```javascript
// 商品名から英語プロジェクト名を生成
// 例: "10までの足し算" → "addition-basic"
replaceAll(
  replaceAll(
    replaceAll(lower(prop("商品名")), 
    "までの", "-"),
    "足し算", "addition"),
  " ", "-"
)
```

### CreateCommand生成（メインコマンド）
```javascript
"curl -fsSL https://raw.githubusercontent.com/i-tachiiri/formula-script-template/main/scripts/create-project.js | node - pageId=" + 
prop("PageId") + 
" projectName=" + 
prop("ProjectName") + 
" formulaType=\"" + 
prop("商品名") + "\""
```

## 🚀 使用方法

### Step 1: Notionでコマンド生成
1. Notionデータベースで新しい行を作成
2. `商品名`を入力 (例: `2桁の掛け算`)
3. `PageId`が自動計算される
4. `CreateCommand`が自動生成される

### Step 2: コマンド実行
```bash
# Notionの CreateCommand カラムからコピペして実行
curl -fsSL https://raw.githubusercontent.com/i-tachiiri/formula-script-template/main/scripts/create-project.js | node - pageId=254d9f5c28f58150a167db703c269da5 projectName=multiplication-2digit formulaType="2桁の掛け算"
```

### Step 3: 自動実行される処理
✅ GitHubリポジトリ作成  
✅ テンプレートコードクローン  
✅ PAGE_ID自動置換  
✅ README.md更新  
✅ 次ステップのコマンド表示  

### Step 4: 手動フォローアップ
表示されたコマンドを実行:
```bash
# GASプロジェクト作成
npx clasp create --type standalone --title "2桁の掛け算 Formula Generator" --parentId "11ExJC5FifVUDSymmo0LCVFf5kUhJoqMM"

# 初期設定  
npm run setup-logs

# 初回プッシュ
git add . && git commit -m "Initial setup with PAGE_ID: 254d9f5c28f58150a167db703c269da5" && git push
```

## 📋 完全自動化コマンド例

より高度な自動化が必要な場合:

```bash
# ワンライナーで全て実行
curl -fsSL https://raw.githubusercontent.com/i-tachiiri/formula-script-template/main/scripts/create-project.js | node - pageId=254d9f5c28f58150a167db703c269da5 projectName=addition-basic formulaType="基本足し算" autoGas=true
```

## 🔧 Notionテンプレート例

実際のNotionデータベースレコード例:

| 商品名 | PageId | ProjectName | CreateCommand |
|-------|-------|------------|---------------|
| 10までの足し算 | 254d9f5c28f... | addition-basic | `curl -fsSL https://raw.../create-project.js \| node - pageId=254...` |
| 2桁の掛け算 | a1b2c3d4e5f... | multiplication-2digit | `curl -fsSL https://raw.../create-project.js \| node - pageId=a1b...` |

## ⚠️ 注意事項

### 前提条件
- Node.js インストール済み
- GitHub CLI (`gh`) インストール・ログイン済み
- CLASP インストール・ログイン済み

### セキュリティ
- 公開スクリプトを実行するため、コード内容を事前確認推奨
- PAGE_IDは機密情報として管理

### トラブルシューティング
- GitHub認証エラー: `gh auth login` で再認証
- CLASP認証エラー: `npx clasp login` で再認証
- 権限エラー: スクリプトの実行権限を確認

## 🎯 メリット

1. **作業時間短縮**: 手動20分 → 自動2分
2. **ヒューマンエラー削減**: PAGE_ID置換忘れなし
3. **標準化**: 一貫したプロジェクト構成
4. **Notion連携**: データベース管理と同期

---

この方法により、Notionから直接プロジェクト作成が可能になり、大幅な効率化が実現できます。
# 数式生成スクリプト 新規作成ガイド

このドキュメントは、テンプレートリポジトリから新しい数式生成スクリプトを作成する完全なガイドです。

## 🎯 このテンプレートについて

### 概要
Google Apps Script用の数式生成テンプレートです。任意の数式タイプ（基本演算、文章題、微分積分など）に対応できる柔軟な構造を提供します。

### 主な機能
- **柔軟な数式フォーマット**: 配列、文字列、カスタム構造など任意の形式に対応
- **Notion連携**: FormulaSharedLibライブラリ経由でNotionデータベースと連携
- **Google Sheets出力**: 生成した数式をスプレッドシートに出力
- **Cloud Logging**: リアルタイムでの実行ログ監視

### アーキテクチャ
```
main.js → FormulaGenerator.js → FormulaSharedLib → Google Sheets
    ↓
Notion API (PAGE_ID取得・更新)
```

## 🚀 新プロジェクト作成手順

### Step 1: GitHubリポジトリ作成

**Claude Code指示例:**
```
このテンプレートから新しい数式プロジェクトを作成したい。

基本情報:
- 数式の種類: 2桁の掛け算
- プロジェクト名: multiplication-2digit-formula  
- Notion Page ID: 254d9f5c28f58150a167db703c269da5

以下を実行してください:
1. 新しいGitHubリポジトリを作成
2. テンプレートからコードをコピー
3. PAGE_IDを置換
4. README.mdを数式用に更新
```

**GitHub Template機能を使用する場合:**
1. GitHubで「Use this template」をクリック
2. 新リポジトリ名を入力
3. 作成後、Issue テンプレートで情報を整理

### Step 2: Google Apps Script プロジェクト作成

**重要: 必ず指定フォルダに作成**
```bash
# GASプロジェクトを作成（必ずこのフォルダ配下）
npx clasp create --type standalone --title "[数式名] Formula Generator" --parentId "11ExJC5FifVUDSymmo0LCVFf5kUhJoqMM"
```

### Step 3: 初期設定

#### 3.1 GCPプロジェクト設定
```bash
# .clasp.jsonにGCPプロジェクトIDを設定
# "projectId": "develop-341509"

# Cloud Logging有効化
npm run setup-logs
```

#### 3.2 PAGE_ID設定

**重要**: PAGE_IDは必ず設定が必要です。以下のいずれかの方法で設定してください。

**方法A: Claude Code に依頼**
```
PAGE_IDを [あなたのNotion Page ID] に置換してください
```

**方法B: 手動で置換**
```javascript
// src/main.js の1行目
const PAGE_ID = '{{PAGE_ID}}'; // これを実際のPage IDに変更
↓
const PAGE_ID = 'あなたのPage ID'; // 例: '254d9f5c28f58150a167db703c269da5'
```

**PAGE_IDの確認方法:**
1. NotionページのURL: `https://www.notion.so/ページ名-254d9f5c28f58150a167db703c269da5`
2. ハイフンを除いた32文字: `254d9f5c28f58150a167db703c269da5`

#### 3.3 KeyVault Library参照
appsscript.jsonに以下が含まれていることを確認:
```json
{
  "dependencies": {
    "libraries": [
      {
        "userSymbol": "KeyVault",
        "libraryId": "18YfPGRKVqtDQNXIVIK6pijnu3hox2mBfFMY11l_A61y1x7qs7Uz6k4zG",
        "version": "1"
      }
    ]
  }
}
```

## 📝 Claude実装ワークフロー

### Phase 1: 要件確認
Claude に以下を伝えて要件を整理してもらいます:

**Claude への指示テンプレート:**
```
このプロジェクトで[数式の種類]の数式生成を実装したい。

現在の状況:
- テンプレートリポジトリから複製済み
- GitHubリポジトリ: [URL]
- GASプロジェクト: [URL]
- PAGE_ID: [NotionページID]

要件をヒアリングして実装してください。
```

Claude が確認すべき項目:
1. **数式の種類と複雑さ**
   - 基本演算 / 文章題 / 数学公式 / その他
   - 難易度レベル
   - 特別な制約や条件

2. **出力フォーマット**
   - 配列形式: `[3, '+', 5, '=', 8]`
   - 文字列形式: `['3 + 5 = 8']`
   - カスタム形式: `[['問題', '3個のりんごに5個追加すると？', '答え', 8]]`

3. **生成パラメータ**
   - 数値範囲
   - 問題数
   - ランダム性の要件

4. **特別な要件**
   - 重複排除
   - 段階的難易度
   - 特定の数値パターン

### Phase 2: 実装
Claude が以下を実装:

1. **FormulaGenerator.js のgenerateFormulas()メソッド**
   ```javascript
   generateFormulas() {
     // 具体的な数式生成ロジック
     const formulas = [];
     
     // 生成処理
     for (let i = 0; i < 問題数; i++) {
       // 数式生成
       formulas.push(生成した数式);
     }
     
     return this.shuffleArray(formulas);
   }
   ```

2. **テスト用の実装確認**
   ```javascript
   // テスト実行
   function testFormulaGeneration() {
     console.log('Testing formula generation...');
     generateAndWriteFormulas();
   }
   ```

### Phase 3: デプロイ・テスト
```bash
# コードをGASにプッシュ
npm run build

# ログを監視
npm run logs:watch

# GAS側でtestFormulaGeneration()を実行してテスト
```

## 🛠 利用可能なユーティリティメソッド

### 乱数生成
```javascript
this.generateRandomNumber(1, 10);  // 1-10の整数
```

### 配列シャッフル
```javascript
this.shuffleArray(formulas);  // 配列をランダムに並び替え
```

### 数値分割
```javascript
this.numberToDigits(123);  // ['1', '2', '3']
```

## 📊 数式フォーマット例

### 基本演算
```javascript
[3, '+', 5, '=', 8]
[12, '*', 4, '=', 48]
```

### 文章題
```javascript
['太郎くんは3個のりんごを持っています。花子さんから5個もらいました。全部で何個でしょう？', 8]
```

### 複雑な数式
```javascript
['solve', 'x² + 5x + 6 = 0', 'answer', [-2, -3]]
['integrate', '∫ 2x dx', 'result', 'x² + C']
```

### カスタム形式
```javascript
[
  ['type', 'word_problem'],
  ['question', 'バスに12人乗っていました。3人降りて8人乗りました。何人になったでしょう？'],
  ['numbers', [12, 3, 8]],
  ['operation', ['subtract', 'add']],
  ['answer', 17]
]
```

## 🔧 デバッグとログ監視

### リアルタイムログ監視
```bash
npm run logs:watch
```

### ログ確認
```bash
npm run logs
```

### よくあるエラー
1. **PAGE_ID未設定**: main.jsの`{{PAGE_ID}}`が置換されていない
2. **GCPプロジェクト未設定**: `.clasp.json`のprojectIdが未設定
3. **FormulaSharedLib未参照**: appsscript.jsonでライブラリが参照されていない

## 💡 実装のヒント

### パフォーマンス
- 大量の数式生成時は進捗ログを出力
- メモリ効率を考慮した実装

### 品質
- 重複チェックの実装
- 数式の妥当性確認（必要に応じて）
- エラーハンドリングの充実

### 保守性
- コメントの充実
- 設定値の外部化
- テスト関数の作成

## 📚 関連リンク

- **テンプレートリポジトリ**: https://github.com/i-tachiiri/formula-script-template
- **Google Drive フォルダ**: https://drive.google.com/drive/folders/11ExJC5FifVUDSymmo0LCVFf5kUhJoqMM
- **FormulaSharedLib**: Google Apps Script ライブラリ (ID: 1q07i4PHy9Xkb-WQji0Jr7g_67-9MIbBHp4pR9lwhf_98RECClaR3Fjkv)

---

**注意**: このガイドに従って作業することで、Claude が一からプロジェクトを理解し、適切な実装を行えるようになります。
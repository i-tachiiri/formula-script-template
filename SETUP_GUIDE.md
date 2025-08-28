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

新しいプロジェクトは、Notion側で管理するコマンドで実施されるため、手動でのGitHubリポジトリ作成は不要です。

### Step 2: Claude Code での自動セットアップ

**重要**: PAGE_IDの置換やGCPプロジェクトの設定は、Claude Codeが自動的に処理します。手動設定は不要です。

プロジェクト作成後、以下のコマンドをClaude Codeに実行してもらいます：

```bash
# GASプロジェクト作成（Claude Codeが実行）
npx clasp create --type standalone --title "[数式名]" --parentId "11ExJC5FifVUDSymmo0LCVFf5kUhJoqMM"

# GCPプロジェクト設定（Claude Codeが実行）
npx clasp setting projectId develop-341509

# Cloud Logging有効化（Claude Codeが実行）
npm run setup-logs
```

### Step 3: ライブラリ参照の確認

appsscript.jsonに以下が含まれていることを確認（自動設定済み）:
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

プロジェクト作成スクリプト実行後に表示されるプロンプトをそのまま使用してください。PAGE_IDやGCP設定は自動的に処理されるため、実装要件のヒアリングから開始できます。

Claude が確認すべき項目:
1. **数式の代数表現**
   - 数式を代数で表現（例: ax + b、x² + bx + c など）
   - 各代数の取りうる値の条件と範囲

2. **出力フォーマット**
   - 配列形式: `[3, '+', 5, '=', 8]`
   - 文字列形式: `['3 + 5 = 8']`
   - カスタム形式: `[['問題', '3個のりんごに5個追加すると？', '答え', 8]]`

3. **生成パラメータ**
   - 問題数
   - ランダム性の要件

4. **重要な制約**
   - ページ内で問題の重複は発生しない（自動的に重複排除される）

**注意**: PAGE_IDの確認やGCPプロジェクト設定の確認は不要です。これらは自動的に処理されています。

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
1. **FormulaSharedLib未参照**: appsscript.jsonでライブラリが参照されていない
2. **実行権限エラー**: GAS側で実行権限が不足している場合
3. **ログ出力されない**: Cloud Logging が正しく設定されていない場合

**注意**: PAGE_IDとGCPプロジェクト設定は自動化されているため、手動確認は不要です。

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
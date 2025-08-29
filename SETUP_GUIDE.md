# 数式生成スクリプト 新規作成ガイド

このドキュメントは、テンプレートリポジトリから新しい数式生成スクリプトを作成する完全なガイドです。

## 🎯 このテンプレートについて

### 概要

Google Apps Script 用の数式生成テンプレートです。任意の数式タイプ（基本演算、文章題、微分積分など）に対応できる柔軟な構造を提供します。

### 主な機能

- **柔軟な数式フォーマット**: 配列、文字列、カスタム構造など任意の形式に対応
- **Notion 連携**: NotionService 経由で Notion データベースと連携
- **Google Sheets 出力**: 生成した数式をスプレッドシートに出力

### アーキテクチャ

```
_main.js → FormulaGenerator.js → SpreadsheetService → Google Sheets
    ↓
NotionService → Notion API (PAGE_ID取得・更新)
```

## 🚀 新プロジェクト作成手順

### Step 1: GAS のプロジェクトのセットアップ

```bash
# GASプロジェクト作成（Claude Codeが実行）
npx clasp create --type standalone --title "[数式名]" --parentId "11ExJC5FifVUDSymmo0LCVFf5kUhJoqMM"

# GCPプロジェクト設定（Claude Codeが実行）
# .clasp.jsonファイルを直接編集してprojectIdを適用
# clasp createで生成される.clasp.jsonに、テンプレートのprojectIdを手動で追加
Edit .clasp.json: "projectId": "develop-341509"を追加（テンプレートから.clasp.json.templateを参照）

# appsscript.json設定復元（Claude Codeが実行）
# clasp createでappsscript.jsonが上書きされるため、テンプレート設定を復元
Copy src/appsscript.json.template → src/appsscript.json（KeyVaultライブラリ等の設定を復元）

# Cloud Logging有効化（Claude Codeが実行）
npm run setup-logs
```

## 📝 Claude 実装ワークフロー

### Phase 1: 要件確認

Claude に以下を伝えて要件を整理してもらいます:

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

### Phase 2: 実装

Claude が以下を実装:

1. **FormulaGenerator.js の generateFormulas()メソッド**

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

### Phase 3: 実装・デプロイ

```bash
# コードをGASにプッシュ
npm run build

# GAS側でgenerateAndWriteFormulas()を直接実行
```

## 🛠 利用可能なユーティリティメソッド

### 乱数生成

```javascript
this.generateRandomNumber(1, 10); // 1-10の整数
```

### 配列シャッフル

```javascript
this.shuffleArray(formulas); // 配列をランダムに並び替え
```

### 数値分割

```javascript
this.numberToDigits(123); // ['1', '2', '3']
```

## 📊 数式フォーマット例

### 基本演算

```javascript
[3, "+", 5, "=", 8][(12, "*", 4, "=", 48)];
```

### 文章題

```javascript
[
  "太郎くんは3個のりんごを持っています。花子さんから5個もらいました。全部で何個でしょう？",
  8,
];
```

### 複雑な数式

```javascript
["solve", "x² + 5x + 6 = 0", "answer", [-2, -3]][
  ("integrate", "∫ 2x dx", "result", "x² + C")
];
```

### カスタム形式

```javascript
[
  ["type", "word_problem"],
  [
    "question",
    "バスに12人乗っていました。3人降りて8人乗りました。何人になったでしょう？",
  ],
  ["numbers", [12, 3, 8]],
  ["operation", ["subtract", "add"]],
  ["answer", 17],
];
```

## 🔧 本番実行とエラー時の対応

### 基本実行フロー

1. **本番実行**: GAS で`generateAndWriteFormulas()`を直接実行
2. **ログ監視**: エラー発生時にリアルタイム監視を開始
3. **デバッグ**: 必要に応じて検証用関数を追加実装

### エラー発生時のログ監視

ユーザーが手動でログを貼り付ける

### よくあるエラーと対処法

1. **ライブラリ未参照エラー**: appsscript.json で KeyVault ライブラリが参照されていない
2. **実行権限エラー**: GAS 側で実行権限が不足している場合

### エラー時の追加デバッグ

エラーが発生した場合、必要に応じて以下のようなデバッグ関数を追加実装:

```javascript
// 部分的なテスト用関数（エラー時のみ実装）
function debugFormulaGeneration() {
  const generator = new FormulaGenerator();
  const testFormulas = generator.generateFormulas().slice(0, 5);
  console.log("Sample formulas:", testFormulas);
}
```

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
- エラー発生時のデバッグ関数追加（必要に応じて）

## 📚 関連リンク

- **テンプレートリポジトリ**: https://github.com/i-tachiiri/formula-script-template
- **Google Drive フォルダ**: https://drive.google.com/drive/folders/11ExJC5FifVUDSymmo0LCVFf5kUhJoqMM

---

**注意**: このガイドに従って作業することで、Claude が一からプロジェクトを理解し、適切な実装を行えるようになります。

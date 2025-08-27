# Claude Code クイックスタートガイド

このファイルは、Claude Code が新しい数式生成プロジェクトを作成する際の最初に読むべきガイドです。

## 🔍 状況判断フローチャート

### 1. まず確認すること

ユーザーから依頼を受けたら、以下を確認してください：

**Q: これは新しい数式プロジェクトの作成依頼ですか？**
- ✅ YES → **Step 2へ**
- ❌ NO → 通常のコード作業として進める

### 2. 新規プロジェクト作成フロー

**Step 2-1: 必須ドキュメントを読む**
1. `SETUP_GUIDE.md` - 完全なセットアップ手順
2. `CLAUDE.md` - 技術的詳細
3. このファイル - ワークフロー確認

**Step 2-2: ユーザーに要件確認**
以下の質問をして情報を収集：

```
新しい数式生成プロジェクトを作成しますね。以下の情報を教えてください：

📝 **基本情報**
1. 数式の種類は？（例：足し算、文章題、微分積分など）
2. プロジェクト名は？（例：addition-basic-formula）
3. Notion Page ID は？（URLから取得: notion.so/ページ名-[32文字のID]）

🎯 **数式の詳細**
4. 難易度や範囲は？（例：1-10の数字、2桁まで）
5. 出力形式の希望は？（配列、文字列、カスタム）
6. 生成する問題数は？

⚙️ **設定確認**
7. GitHubリポジトリを新規作成しますか？
8. GASプロジェクトも作成しますか？
```

**Step 2-3: 実装手順**
1. GitHubリポジトリ作成
2. **PAGE_ID置換** (`{{PAGE_ID}}` → 実際のID)
3. GASプロジェクト作成（必ず指定フォルダ: `11ExJC5FifVUDSymmo0LCVFf5kUhJoqMM`）
4. 初期設定（GCP、ログ設定）
5. FormulaGenerator実装
6. テスト・デプロイ

**PAGE_ID置換は最優先で実行**
- 忘れると実行時エラーになります
- `src/main.js`の1行目を確認

## 🛠️ 実装時の重要ポイント

### GitHubリポジトリ作成
```bash
# テンプレートから新規リポジトリ作成
gh repo create [repository-name] --template i-tachiiri/formula-script-template --public
```

### GASプロジェクト作成（重要！）
```bash
# 必ず指定されたフォルダに作成
npx clasp create --type standalone --title "[数式名] Formula Generator" --parentId "11ExJC5FifVUDSymmo0LCVFf5kUhJoqMM"
```

### 初期設定チェックリスト
- [ ] **PAGE_ID置換** - `{{PAGE_ID}}` を実際のNotion Page IDに置換
- [ ] GCPプロジェクトID設定（`develop-341509`）
- [ ] `npm run setup-logs` 実行
- [ ] KeyVault Library参照確認

### PAGE_ID置換の実装例
```javascript
// src/main.js の置換
const PAGE_ID = '{{PAGE_ID}}';
↓
const PAGE_ID = '254d9f5c28f58150a167db703c269da5'; // ユーザー提供のID
```

### 数式生成実装
```javascript
generateFormulas() {
  // ユーザー要件に基づいて実装
  const formulas = [];
  
  for (let i = 0; i < 問題数; i++) {
    // 具体的な数式生成ロジック
  }
  
  return this.shuffleArray(formulas);
}
```

## 📋 実装パターン例

### パターン1: 基本演算
```javascript
generateFormulas() {
  const formulas = [];
  for (let i = 0; i < 20; i++) {
    const num1 = this.generateRandomNumber(1, 10);
    const num2 = this.generateRandomNumber(1, 10);
    formulas.push([num1, '+', num2, '=', num1 + num2]);
  }
  return this.shuffleArray(formulas);
}
```

### パターン2: 文章題
```javascript
generateFormulas() {
  const problems = [
    '太郎くんは3個のりんごを持っています。5個もらいました。全部で何個？',
    'バスに12人乗っています。4人降りました。何人残っている？'
  ];
  return problems.map(problem => [problem]);
}
```

### パターン3: 数学公式
```javascript
generateFormulas() {
  return [
    ['solve', 'x² + 5x + 6 = 0'],
    ['integrate', '∫ 2x dx'],
    ['differentiate', 'd/dx(x³ + 2x)']
  ];
}
```

## 🔧 デバッグとテスト

### テスト実行
```javascript
// GAS エディタでテスト実行
function testFormulaGeneration() {
  console.log('Testing formula generation...');
  generateAndWriteFormulas();
}
```

### ログ監視
```bash
# リアルタイムログ監視
npm run logs:watch
```

## ⚠️ 注意事項

1. **必ずSETUP_GUIDE.mdを最初に読む**
2. **GASプロジェクトは指定フォルダに作成**
3. **PAGE_IDの置換を忘れない**
4. **段階的にテストしながら進める**
5. **エラーが出たらログを確認**

## 🎯 成功の判断基準

実装完了の目安：
- [ ] GitHubリポジトリ作成完了
- [ ] GASプロジェクト作成・設定完了
- [ ] generateFormulas()メソッド実装完了
- [ ] テスト実行でスプレッドシートに出力確認
- [ ] ログでエラーがないことを確認

---

**このガイドに従うことで、Claude は効率的かつ確実に新しい数式生成プロジェクトを作成できます。**
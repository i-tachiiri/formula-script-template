#!/usr/bin/env node

/**
 * Formula Script Template - 自動プロジェクト作成スクリプト
 * 
 * 使用方法:
 * curl -fsSL https://raw.githubusercontent.com/i-tachiiri/formula-script-template/main/scripts/create-project.js | node - pageId=PAGE_ID projectName=PROJECT_NAME formulaType="FORMULA_TYPE"
 * 
 * または:
 * node create-project.js pageId=254d9f5c28f58150a167db703c269da5 projectName=addition-basic formulaType="基本足し算"
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// コマンドライン引数から設定を取得
const args = process.argv.slice(2);
const config = {};

// 引数をパース (key=value 形式)
args.forEach(arg => {
  const [key, value] = arg.split('=');
  config[key] = value;
});

// 必須パラメータのチェック
const requiredParams = ['pageId', 'projectName', 'formulaType'];
const missingParams = requiredParams.filter(param => !config[param]);

if (missingParams.length > 0) {
  console.error('❌ 必須パラメータが不足しています:', missingParams.join(', '));
  console.log('\n使用例:');
  console.log('node create-project.js pageId=254d9f5c28f58150a167db703c269da5 projectName=addition-basic formulaType=足し算');
  process.exit(1);
}

// プロジェクト名をPageIdベースに統一
if (/^[0-9a-f]{32}$/.test(config.projectName)) {
  // PageIdをそのままプロジェクト名として使用
  console.log(`📝 プロジェクト名をPageIdベースで設定: ${config.projectName}`);
} else if (config.projectName.length > 50) {
  // 長すぎる場合はPageIdを使用
  config.projectName = config.pageId;
  console.log(`📝 プロジェクト名をPageIdに変更: ${config.projectName}`);
}

console.log('🚀 新しい数式プロジェクトを作成中...');
console.log('📝 設定:', config);

try {
  // Step 1: GitHubリポジトリの存在チェックとクローン/作成
  let repositoryExists = false;
  
  try {
    execSync(`gh repo view ${config.projectName}`, { stdio: 'pipe' });
    repositoryExists = true;
    console.log('\n📂 既存のリポジトリが見つかりました。クローンします...');
    execSync(`gh repo clone ${config.projectName}`, { stdio: 'inherit' });
  } catch (error) {
    console.log('\n📂 新しいGitHubリポジトリを作成中...');
    execSync(`gh repo create ${config.projectName} --template i-tachiiri/formula-script-template --public --clone`, {
      stdio: 'inherit'
    });
  }

  // Step 2: ディレクトリに移動
  const projectDir = config.projectName;
  process.chdir(projectDir);
  console.log(`📁 ${projectDir} に移動しました`);

  if (!repositoryExists) {
    // Step 3: PAGE_IDを置換（新規作成時のみ）
    console.log('\n🔄 PAGE_IDを置換中...');
    const mainJsPath = path.join('src', '_main.js');
    const mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
    const updatedContent = mainJsContent.replace('{{PAGE_ID}}', config.pageId);
    fs.writeFileSync(mainJsPath, updatedContent);
    console.log(`✅ PAGE_ID を ${config.pageId} に置換しました`);

    // Step 4: README.mdを更新（新規作成時のみ）
    console.log('\n📄 README.mdを更新中...');
    const readmePath = 'README.md';
    let readmeContent = fs.readFileSync(readmePath, 'utf8');
    readmeContent = readmeContent.replace(/# Formula Script Template/g, `# ${config.formulaType} Formula Generator`);
    readmeContent = readmeContent.replace(/数式生成テンプレートプロジェクトです。/g, `${config.formulaType}の数式生成プロジェクトです。`);
    fs.writeFileSync(readmePath, readmeContent);
    console.log(`✅ README.md を ${config.formulaType} 用に更新しました`);

    // Step 4.5: .clasp.json.templateをコピーして.clasp.jsonを準備（新規作成時のみ）
    console.log('\n⚙️  .clasp.json設定を準備中...');
    const templatePath = '.clasp.json.template';
    const claspJsonPath = '.clasp.json';
    
    if (fs.existsSync(templatePath)) {
      const templateContent = fs.readFileSync(templatePath, 'utf8');
      fs.writeFileSync(claspJsonPath, templateContent);
      console.log('✅ .clasp.json.templateから設定をコピーしました');
      console.log('ℹ️  clasp create実行後に実際のscriptIdで上書きされます');
    }
  } else {
    console.log('\n📝 既存リポジトリのため、PAGE_ID置換とREADME更新をスキップしました');
    console.log(`ℹ️  必要に応じて手動でPAGE_IDを確認してください: ${config.pageId}`);
  }

  // Step 5: 完了メッセージ
  console.log('\n🎉 プロジェクト作成完了!');
  console.log(`📁 プロジェクトフォルダ: ${projectDir}`);
  console.log(`🔗 GitHub: https://github.com/${process.env.GITHUB_USER || '[YOUR_USERNAME]'}/${config.projectName}`);
  console.log(`📄 PAGE_ID: ${config.pageId}`);
  console.log(`📋 商品名: ${config.formulaType}`);

  // Step 6: GASプロジェクト作成コマンドを表示
  console.log('\n⚡ 次に実行するコマンド:');
  
  console.log(`# プロジェクトディレクトリに移動`);
  console.log(`cd ${config.projectName}`);
  console.log(`claude`);
  console.log('');  
  console.log(`このプロジェクトで${config.formulaType}の数式生成を実装したいです。README.md と SETUP_GUIDE.md を参照し、実装の計画を立て、不明点があれば聞いて下さい。`);
  console.log('数式：');
  console.log('データ形式：');
  console.log('値の範囲・条件：');
  console.log('1ページの問題数：');
  console.log('作成する問題数：');

} catch (error) {
  console.error('❌ エラーが発生しました:', error.message);
  process.exit(1);
}
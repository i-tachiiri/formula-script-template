@echo off
REM Formula Script Template - Windows用実行スクリプト
REM 使用方法: download-and-run.bat PageID "商品名"

if "%1"=="" (
    echo エラー: PageIDを指定してください
    echo 使用方法: download-and-run.bat 254d9f5c28f581cf930eff1c6b30d6e8 "テストページ"
    exit /b 1
)

if "%2"=="" (
    echo エラー: 商品名を指定してください
    echo 使用方法: download-and-run.bat 254d9f5c28f581cf930eff1c6b30d6e8 "テストページ"
    exit /b 1
)

echo Formula Script Template - プロジェクト作成中...
echo PageID: %1
echo 商品名: %2

curl -fsSL https://raw.githubusercontent.com/i-tachiiri/formula-script-template/main/scripts/create-project.js > temp-create-project.js

node temp-create-project.js pageId=%1 projectName=%1 formulaType=%2

del temp-create-project.js

echo.
echo 完了！作成されたプロジェクトフォルダに移動してください。
pause
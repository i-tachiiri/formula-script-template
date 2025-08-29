# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 For New Formula Projects

**If you're helping create a NEW formula generation script from this template, please read `SETUP_GUIDE.md` first.** This document contains complete instructions for:
- Creating new GitHub repositories
- Setting up Google Apps Script projects in the correct folder
- Understanding the architecture and workflow
- Step-by-step implementation guidance

## 📋 Template Overview

## Project Overview

This is a Google Apps Script template for formula generation projects. It provides a base structure for developing mathematical formula generation functionality that integrates with Google Sheets through CLASP (Google Apps Script CLI).

## Architecture

The project follows a modular architecture:

- **_main.js**: Entry point containing the main `generateAndWriteFormulas()` function that orchestrates the workflow
- **FormulaGenerator.js**: Base class for formula generation with validation logic - designed to be extended for specific formula types
- **External Library Integration**: Uses `FormulaSharedLib` (library ID: 1q07i4PHy9Xkb-WQji0Jr7g_67-9MIbBHp4pR9lwhf_98RECClaR3Fjkv) for Notion and Spreadsheet services

## Key Workflow

1. Retrieve QuestionSheetUrl from Notion using PAGE_ID template variable
2. Generate formulas using FormulaGenerator (override `generateFormulas()` method)
3. Validate formulas using built-in validation (supports +, -, *, / operations)
4. Write formulas to Google Sheets via shared library

## Development Commands

- `npm run build` - Push code to Google Apps Script
- `npm run watch` - Watch for file changes and auto-push
- `npm run open` - Guide Claude to open the GAS script editor (Claude will read .clasp.json scriptId and open browser)
- `npm run logs` - View execution logs
- `npm run logs:watch` - Watch execution logs in real-time
- `npm run setup-logs` - Setup Cloud Logging for GCP project
- `npm run deploy` - Deploy new version
- `npm run pull` - Pull latest from GAS
- `npm run status` - Check deployment versions

## Template Usage

### Initial Setup
1. Replace `{{PAGE_ID}}` in _main.js with actual Notion page ID
2. Replace `REPLACE_WITH_YOUR_GCP_PROJECT_ID` in .clasp.json with your GCP project ID
3. Run `npm run setup-logs` to enable Cloud Logging
4. Extend FormulaGenerator class and override `generateFormulas()` method

### Implementing Formula Generation
The `generateFormulas()` method should return an array of formulas. **Format is completely flexible** - design it to match your specific needs.

**Important:** Configure the number of problems based on your worksheet requirements:
- Determine total problems needed (pages × problems per page)
- Set `totalProblems` variable accordingly in your implementation
- Common examples: 500 problems, 1000 problems, or any count specified in requirements

**Available Utility Methods:**
- `generateRandomNumber(min, max)` - Generate random integer in range
- `numberToDigits(number)` - Split number into digit array
- `shuffleArray(array)` - Randomize array order

**Example Implementations:**
```javascript
// Basic arithmetic problems
// Generate the required number of formulas based on your worksheet needs
// Example: 1000 problems = 100 pages × 10 problems per page
generateFormulas() {
  const formulas = [];
  const totalProblems = 1000; // Adjust this number based on your requirements
  
  for (let i = 0; i < totalProblems; i++) {
    const num1 = this.generateRandomNumber(1, 10);
    const num2 = this.generateRandomNumber(1, 10);
    formulas.push([num1, '+', num2, '=', num1 + num2]);
  }
  return this.shuffleArray(formulas);
}

// Word problems  
generateFormulas() {
  const problems = [
    'A train travels 60km/h for 2 hours. How far does it travel?',
    'If f(x) = 2x + 3, what is f(5)?',
    'Find the derivative of f(x) = x²'
  ];
  return problems.map(problem => [problem]);
}

// Custom format for your specific needs
generateFormulas() {
  // Design any format that works for your use case
  return [
    ['solve', 'x² + 5x + 6 = 0'],
    ['integrate', '∫ 2x dx'],
    ['simplify', '(a + b)² - (a - b)²']
  ];
}
```

## External Dependencies

- Google Apps Script runtime (V8)
- KeyVault Library for secure credential management (ID: 18YfPGRKVqtDQNXIVIK6pijnu3hox2mBfFMY11l_A61y1x7qs7Uz6k4zG)
- Local NotionService and SpreadsheetService implementations
- Asia/Tokyo timezone configured for main appsscript.json
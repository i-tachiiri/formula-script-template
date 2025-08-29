const PAGE_ID = '{{PAGE_ID}}';

function generateAndWriteFormulas() {
  console.log(`Starting formula generation for page: ${PAGE_ID}`);
  
  try {
    const notionService = new NotionService();
    const spreadsheetService = new SpreadsheetService();
    const formulaGenerator = new FormulaGenerator();
    
    // 初回実行時にNotionのQuizScriptUrlを更新
    try {
      console.log('Updating Notion with script URL...');
      notionService.updateNotionWithScriptUrl(PAGE_ID);
    } catch (notionError) {
      console.warn('Failed to update Notion script URL (proceeding with formula generation):', notionError);
    }
    
    console.log('Getting QuestionSheetUrl from Notion...');
    const questionSheetUrl = notionService.getQuestionSheetUrl(PAGE_ID);
    console.log(`Retrieved URL: ${questionSheetUrl}`);
    
    console.log('Generating formulas...');
    const formulas = formulaGenerator.generateFormulas();
    
    console.log(`Generated ${formulas.length} formulas`);
    
    console.log('Writing formulas to spreadsheet...');
    spreadsheetService.writeFormulasToDataSheet(questionSheetUrl, formulas);
    
    console.log('Formula generation and writing completed successfully');
    
  } catch (error) {
    console.error(`Error in generateAndWriteFormulas: ${error}`);
    throw error;
  }
}


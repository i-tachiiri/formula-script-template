const PAGE_ID = '{{PAGE_ID}}';

function generateAndWriteFormulas() {
  console.log(`Starting formula generation for page: ${PAGE_ID}`);
  
  try {
    const notionService = new FormulaSharedLib.NotionService();
    const spreadsheetService = new FormulaSharedLib.SpreadsheetService();
    const formulaGenerator = new FormulaGenerator();
    
    console.log('Getting QuestionSheetUrl from Notion...');
    const questionSheetUrl = notionService.getQuestionSheetUrl(PAGE_ID);
    console.log(`Retrieved URL: ${questionSheetUrl}`);
    
    console.log('Generating formulas...');
    const formulas = formulaGenerator.generateFormulas();
    
    console.log('Validating formulas...');
    if (!formulaGenerator.validateFormulas(formulas)) {
      throw new Error('Formula validation failed');
    }
    
    console.log('Writing formulas to spreadsheet...');
    spreadsheetService.writeFormulasToDataSheet(questionSheetUrl, formulas);
    
    console.log('Formula generation and writing completed successfully');
    
  } catch (error) {
    console.error(`Error in generateAndWriteFormulas: ${error}`);
    throw error;
  }
}

function testFormulaGeneration() {
  console.log('Testing formula generation...');
  try {
    generateAndWriteFormulas();
    console.log('Test completed successfully');
  } catch (error) {
    console.error('Test failed:', error);
  }
}
class SpreadsheetService {
  constructor() {}
  
  extractSpreadsheetId(url) {
    try {
      const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      if (!match) {
        throw new Error('Invalid Google Sheets URL format');
      }
      return match[1];
    } catch (error) {
      console.error(`Error extracting spreadsheet ID: ${error}`);
      throw error;
    }
  }
  
  writeFormulasToDataSheet(spreadsheetUrl, formulas) {
    try {
      console.log(`Writing ${formulas.length} formulas to spreadsheet`);
      
      const spreadsheetId = this.extractSpreadsheetId(spreadsheetUrl);
      const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
      
      let dataSheet = spreadsheet.getSheetByName('data');
      if (!dataSheet) {
        console.log('Creating new data sheet');
        dataSheet = spreadsheet.insertSheet('data');
      }
      
      console.log('Clearing existing data from sheet');
      dataSheet.clear();
      
      console.log('Converting formulas to string format to prevent formula interpretation');
      const stringFormulas = formulas.map(formula => 
        formula.map(cell => {
          if (cell === '=') {
            return "'=";
          }
          return String(cell);
        })
      );
      
      console.log('Setting values to sheet');
      const range = dataSheet.getRange(1, 1, stringFormulas.length, 5);
      range.setValues(stringFormulas);
      
      console.log('Saving spreadsheet');
      SpreadsheetApp.flush();
      
      console.log(`Successfully wrote ${formulas.length} formulas to data sheet without headers`);
      return true;
      
    } catch (error) {
      console.error(`Error writing formulas to spreadsheet: ${error}`);
      throw error;
    }
  }
  
  getSpreadsheetInfo(url) {
    try {
      const spreadsheetId = this.extractSpreadsheetId(url);
      const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
      
      return {
        id: spreadsheetId,
        name: spreadsheet.getName(),
        url: spreadsheet.getUrl(),
        sheets: spreadsheet.getSheets().map(sheet => sheet.getName())
      };
    } catch (error) {
      console.error(`Error getting spreadsheet info: ${error}`);
      throw error;
    }
  }
}
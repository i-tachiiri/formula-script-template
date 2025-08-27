class FormulaGenerator {
  constructor() {}
  
  generateFormulas() {
    // Template method - override in specific implementations
    console.log('Base FormulaGenerator - override this method');
    return [];
  }
  
  validateFormula(formula) {
    if (!Array.isArray(formula) || formula.length !== 5) {
      return false;
    }
    
    const [num1, operator, num2, equals, result] = formula;
    
    if (typeof num1 !== 'number' || typeof num2 !== 'number' || typeof result !== 'number') {
      return false;
    }
    
    if (equals !== '=') {
      return false;
    }
    
    // Basic validation - can be overridden for specific operations
    switch (operator) {
      case '+':
        return num1 + num2 === result;
      case '-':
        return num1 - num2 === result;
      case '*':
        return num1 * num2 === result;
      case '/':
        return num1 / num2 === result;
      default:
        console.log(`Unknown operator: ${operator}`);
        return false;
    }
  }
  
  validateFormulas(formulas) {
    const invalidFormulas = formulas.filter((formula, index) => {
      const isValid = this.validateFormula(formula);
      if (!isValid) {
        console.log(`Invalid formula at index ${index}:`, formula);
      }
      return !isValid;
    });
    
    if (invalidFormulas.length > 0) {
      console.error(`Found ${invalidFormulas.length} invalid formulas`);
      return false;
    }
    
    console.log(`All ${formulas.length} formulas are valid`);
    return true;
  }
  
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}
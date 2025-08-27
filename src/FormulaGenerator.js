class FormulaGenerator {
  constructor() {}
  
  generateFormulas() {
    /**
     * OVERRIDE THIS METHOD in your specific formula generator implementation
     * 
     * This method should return an array of formulas. The format is flexible and depends on your needs:
     * 
     * Format examples:
     * - Standard equation: [3, '+', 5, '=', 8]
     * - Without equals: [3, '+', 5] (for fill-in problems)
     * - String format: ['3 + 5 = 8'] (for display purposes)
     * - Mixed format: [12, '÷', 3, '=', 4] (with any operators)
     * 
     * Implementation guidance:
     * 1. Choose the format that fits your formula type (basic, vertical, word problems, etc.)
     * 2. Determine parameters (number ranges, operations, difficulty)
     * 3. Use utility methods for generation and validation
     * 4. Return the complete formula array
     * 
     * Example implementation patterns:
     * ```javascript
     * // Basic equations
     * generateFormulas() {
     *   const formulas = [];
     *   for (let i = 0; i < 20; i++) {
     *     formulas.push(this.createBasicAddition(1, 10));
     *   }
     *   return this.shuffleArray(formulas);
     * }
     * 
     * // String format problems
     * generateFormulas() {
     *   const formulas = [];
     *   for (let i = 0; i < 10; i++) {
     *     const num1 = this.generateRandomNumber(1, 10);
     *     const num2 = this.generateRandomNumber(1, 10);
     *     const result = num1 + num2;
     *     formulas.push([`${num1} + ${num2} = ${result}`]);
     *   }
     *   return formulas;
     * }
     * ```
     */
    console.log('Base FormulaGenerator - override this method');
    throw new Error('generateFormulas() must be implemented in subclass');
  }
  
  
  // ============ UTILITY METHODS ============
  // These methods are ready to use in your formula generation

  // ------------ Helper Methods ------------

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  numberToDigits(number) {
    return number.toString().split('');
  }

}
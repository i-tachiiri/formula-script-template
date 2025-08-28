class FormulaGenerator {
  constructor() {}
  
  generateFormulas() {
    /**
     * OVERRIDE THIS METHOD in your specific formula generator implementation
     * 
     * IMPORTANT: Generate data based on your specific requirements
     * - Determine the total number of problems needed (e.g., pages × problems per page)
     * - Configure the generation count accordingly in your implementation
     * - Example: 1000 problems = 100 pages × 10 problems per page
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
     * // Basic equations (adjust totalProblems based on your needs)
     * generateFormulas() {
     *   const formulas = [];
     *   const totalProblems = 1000; // Configure this based on requirements
     *   
     *   for (let i = 0; i < totalProblems; i++) {
     *     formulas.push(this.createBasicAddition(1, 10));
     *   }
     *   return this.shuffleArray(formulas);
     * }
     * 
     * // String format problems (configure count for your worksheet needs)
     * generateFormulas() {
     *   const formulas = [];
     *   const totalProblems = 500; // Adjust based on your requirements
     *   
     *   for (let i = 0; i < totalProblems; i++) {
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
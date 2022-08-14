import { generateFontStyleTestCases } from "./fontStyleUtils";


const [testCases, advancedTestCases] = generateFontStyleTestCases('**', 'b');
const [altTestCases, altAdvancedTestCases] = generateFontStyleTestCases('__', 'b');

describe('Simple bold usage', () => {
  testCases.forEach((testCase, name) => {
    it(name, () => {
      cy.testIO(testCase.input, testCase.output);
    });
  });

  altTestCases.forEach((testCase, name) => {
    it(name, () => {
      cy.testIO(testCase.input, testCase.output);
    });
  });
})

describe('Advanced bold usage', () => {
  advancedTestCases.forEach((testCase, name) => {
    it(name, () => {
      cy.testIO(testCase.input, testCase.output);
    });
  });
  altAdvancedTestCases.forEach((testCase, name) => {
    it(name, () => {
      cy.testIO(testCase.input, testCase.output);
    });
  });
})

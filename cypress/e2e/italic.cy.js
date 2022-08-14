import { generateFontStyleTestCases } from "./fontStyleUtils";


const [testCases, advancedTestCases] = generateFontStyleTestCases('*', 'i');
const [altTestCases, altAdvancedTestCases] = generateFontStyleTestCases('_', 'i');

describe('Simple italic usage', () => {
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

describe('Advanced italic usage', () => {
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


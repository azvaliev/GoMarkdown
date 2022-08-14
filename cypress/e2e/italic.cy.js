import { typeInput, checkOutput, init } from "./utils";
import { generateFontStyleTestCases } from "./fontStyleUtils";


const [testCases, advancedTestCases] = generateFontStyleTestCases('*', 'i');
const [altTestCases, altAdvancedTestCases] = generateFontStyleTestCases('_', 'i');

describe('Simple italic usage', () => {
  beforeEach(init);
  testCases.forEach((testCase, name) => {
    it(name, () => {
      typeInput(testCase.input);
      checkOutput(testCase.output);
    }
    );
  });

  altTestCases.forEach((testCase, name) => {
    it(name, () => {
      typeInput(testCase.input);
      checkOutput(testCase.output);
    }
    );
  });
})

describe('Advanced italic usage', () => {
  beforeEach(init);
  advancedTestCases.forEach((testCase, name) => {
    it(name, () => {
      typeInput(testCase.input);
      checkOutput(testCase.output);
    }
    );
  });
  altAdvancedTestCases.forEach((testCase, name) => {
    it(name, () => {
      typeInput(testCase.input);
      checkOutput(testCase.output);
    }
    );
  });
})


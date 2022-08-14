import { typeInput, checkOutput, init } from "./utils";
import { generateFontStyleTestCases } from "./fontStyleUtils";


const [testCases, advancedTestCases] = generateFontStyleTestCases('**', 'b');
const [altTestCases, altAdvancedTestCases] = generateFontStyleTestCases('__', 'b');

describe('Simple bold usage', () => {
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

describe('Advanced bold usage', () => {
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

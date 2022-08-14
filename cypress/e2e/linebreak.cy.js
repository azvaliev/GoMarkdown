const testCases = new Map();

// Create some test cases for markdown linebreak
testCases.set(`basic`, {
  input: `foo  \nbar`,
  output: `<p>foo<br>bar</p>`,
});

testCases.set(`Shouldn't line break without two spaces`, {
  input: `foo\nbar`,
  output: `<p>foo\nbar</p>`,
});

testCases.set(`Shouldn't line break without \n`, {
  input: `foo  bar`,
  output: `<p>foo  bar</p>`,
});

testCases.set(`multiple line breaks`, {
  input: `foo  \nbar  \nbazz`,
  output: `<p>foo<br>bar<br>bazz</p>`,
});

describe('Linebreak', () => {
  testCases.forEach((testCase, name) => {
    it(name, () => {
      cy.testIO(testCase.input, testCase.output);
    });
  });
});

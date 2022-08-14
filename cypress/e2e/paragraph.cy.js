const testCases = new Map();

testCases.set(`basic`, {
  input: `foo`,
  output: `<p>foo</p>`,
});

testCases.set(`basic with newline`, {
  input: `foo\n`,
  output: `<p>foo</p>`,
});

testCases.set(`multiple paragraphs`, {
  input: `foo\n\nbar`,
  output: `<p>foo</p><p>bar</p>`,
});

// Loop over the test cases and run each one
describe('Paragraphs', () => {
  testCases.forEach((testCase, name) => {
    it(name, () => {
      cy.testIO(testCase.input, testCase.output);
    });
  });
});

const testCases = new Map();

for (let i = 1; i <= 6; i++) {
  const header = new Array(i + 1).join('#');
  testCases.set(`h${i}`, {
    input: `${header} test`,
    output: `<h${i}>test</h${i}>`,
  });
}

const advancedTestCases = new Map();
// Use multiple headers with different levels
advancedTestCases.set('Multiple headers (h1, h2, h3)', {
  input: `# h1\n## h2\n### h3`,
  output: `<h1>h1</h1>\n<h2>h2</h2>\n<h3>h3</h3>`,
});
// Use multiple headers with different levels and text
advancedTestCases.set('Multiple headers (h1, h2, h3) with text', {
  input: `# h1\n## h2\n### h3\n\nThis is a paragraph.`,
  output: `<h1>h1</h1>\n<h2>h2</h2>\n<h3>h3</h3>\n\n<p>This is a paragraph.</p>`,
});
// Test all headers 1-6
advancedTestCases.set('All headers 1-6', {
  input: `# h1\n## h2\n### h3\n#### h4\n##### h5\n###### h6`,
  output: `<h1>h1</h1>\n<h2>h2</h2>\n<h3>h3</h3>\n<h4>h4</h4>\n<h5>h5</h5>\n<h6>h6</h6>`
});
// Test multiple headers with text inbetween
advancedTestCases.set('Multiple headers with text inbetween', {
  input: `# h1\n## h2\n### h3\n\nThis is a paragraph.\n\n## h2\n### h3`,
  output: `<h1>h1</h1>\n<h2>h2</h2>\n<h3>h3</h3>\n\n<p>This is a paragraph.</p><h2>h2</h2>\n<h3>h3</h3>`,
});


describe('Simple header usage', () => {
  testCases.forEach((testCase, name) => {
    it(name, () => {
      cy.testIO(testCase.input, testCase.output);
    });
  });
});

describe('Advanced header usage', () => {
  advancedTestCases.forEach((testCase, name) => {
    it(name, () => {
      cy.testIO(testCase.input, testCase.output);
    });
  });
});

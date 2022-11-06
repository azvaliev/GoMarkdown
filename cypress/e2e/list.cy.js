const testCases = new Map();

testCases.set(
  'Basic',
  {
    input: '1. foo',
    output: '<ol><li>foo</li></ol>'
  }
);

testCases.set(
  'Multiple Items',
  {
    input: '1. bar\n2. foo\n3. 434\n4. &89',
    output: (
      `<ol>` +
      `<li>bar</li>` +
      `<li>foo</li>` +
      `<li>434</li>` +
      `<li>&amp;89</li>` +
      `</ol>`
    )
  }
)

testCases.set(
  'Not over-sensitive',
  {
    input: '1.bar\nTHere is 1.  \nfoo',
    output: (
      `<p>` +
      `1.bar\nTHere is 1.<br>foo` +
      `</p>`
    )
  }
)

testCases.set(
  'Two lists',
  {
    input: '1. &Bazzzz5237\n2. Item two\n\n3. 8New lsit\n1. Second new list',
    output: (
      `<ol><li>&amp;Bazzzz5237</li>` +
      `<li>Item two</li></ol>\n\n` +
      `<ol><li>8New lsit</li>` +
      `<li>Second new list</li></ol>`
    )
  }
)

describe('Unordered List', () => {
  testCases.forEach((testCase, name) => {
    it(name, () => {
      cy.testIO(testCase.input.replaceAll(/\d\./g, '-'), testCase.output.replaceAll(/\d\./g, '-').replaceAll('ol>', 'ul>'));
    });
  });
});

describe('Ordered List', () => {
  testCases.forEach((testCase, name) => {
    it(name, () => {
      cy.testIO(testCase.input, testCase.output);
    });
  });
});

describe('Nested List', () => {
  it('handles ul > ol', () => {
    cy.testIO(
      '- bar\n1. foo\n2. bar\n3. bazz\n- why\n- man\n- foo\n- 434\n- &89',
      '<ul><li>bar</li><ol><li>foo</li><li>bar</li><li>bazz</li></ol><li>why</li><li>man</li><li>foo</li><li>434</li><li>&amp;89</li></ul>'
    );
  });

  it('handles ol > ul', () => {
    cy.testIO(
      '1. bar\n- foo\n- bar\n- bazz\n- why\n8. man\n12. foo\n14. 434\n15. &89',
      '<ol><li>bar</li><ul><li>foo</li><li>bar</li><li>bazz</li><li>why</li></ul><li>man</li><li>foo</li><li>434</li><li>&amp;89</li></ol>'
    );
  });
})

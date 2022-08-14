const testCases = new Map();

testCases.set(`basic`, {
  input: (
    `# test\n\n` +
    `**bold**  \n` +
    `_italic_\n\n` +
    `## header\n\n` +
    `paragraph`
  ),
  output: (
    `<h1>test</h1>\n\n` +
    `<p><b>bold</b><br>` +
    `<i>italic</i></p>` +
    `<h2>header</h2>\n\n` +
    `<p>paragraph</p>`
  )
});

testCases.set(`bold and italic`, {
  input: (
    `# test\n\n` +
    `***bold and italic***\n` +
    `## header\n\nparagraph`
  ),
  output: (
    `<h1>test</h1>\n\n` +
    `<p><i><b>bold and italic</b></i></p>` +
    `<h2>header</h2>\n\n` +
    `<p>paragraph</p>`
  )
});

testCases.set(`bold header`, {
  input: `# **bold header**\n# __bold header__`,
  output: (
    `<h1><b>bold header</b></h1>\n` +
    `<h1><b>bold header</b></h1>`
  )
});

testCases.set(`italic header`, {
  input: `# *italic header*\n# _italic header_`,
  output: (
    `<h1><i>italic header</i></h1>\n` +
    `<h1><i>italic header</i></h1>`
  )
});

testCases.set(`bold and italic header`, {
  input: `# ***bold and italic header***\n# ___bold and italic header___`,
  output: (
    `<h1><i><b>bold and italic header</b></i></h1>\n` +
    `<h1><i><b>bold and italic header</b></i></h1>`
  )
});

testCases.set(`paragraph with line breaks`, {
  input: `test  \nparagraph with  \nline br/>aks`,
  output: (
    `<p>test<br>` +
    `paragraph with<br>` +
    `line br/&gt;aks</p>`
  )
});

testCases.set(`Sample file with headers, bold and italic and multiple paragraphs`, {
  input: (
    `# h1 Heading\n` +
    `## h2 Heading\n` +
    `### h3 Heading\n` +
    `#### h4 Heading\n` +
    `##### h5 Heading\n` +
    `###### h6 Heading\n\n` +
    `**This is bold text**  \n` +
    `__This is bold text__  \n` +
    `*This is italic text*  \n` +
    `_This is italic text_`
  ),
  output: (
    `<h1>h1 Heading</h1>\n` +
    `<h2>h2 Heading</h2>\n` +
    `<h3>h3 Heading</h3>\n` +
    `<h4>h4 Heading</h4>\n` +
    `<h5>h5 Heading</h5>\n` +
    `<h6>h6 Heading</h6>\n\n` +
    `<p><b>This is bold text</b><br>` +
    `<b>This is bold text</b><br>` +
    `<i>This is italic text</i><br>` +
    `<i>This is italic text</i></p>`
  ),
});

describe('Combined tests', () => {
  testCases.forEach((testCase, name) => {
    it(name, () => {
      cy.testIO(testCase.input, testCase.output);
    });
  });
});


const testCases = new Map();

testCases.set(`basic`, {
  input: (
    `# test\n\n` +
    `**bold**  \n` +
    `_italic_\n\n` +
    `## header\n\n` +
    '[link](#link)\n\n' +
    `paragraph`
  ),
  output: (
    `<h1>test</h1>\n\n` +
    `<p><b>bold</b><br>` +
    `<i>italic</i></p>` +
    `<h2>header</h2>\n\n` +
    `<p><a href="#link" rel="noopener noreferrer">link</a></p>` +
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

testCases.set(`bold link`, {
  input: '**[Foo](#bar)**',
  output: (
    `<p><b><a href="#bar" rel="noopener noreferrer">Foo</a></b></p>`
  )
});

testCases.set(`italic link`, {
  input: '_[Foo](#bar)_',
  output: (
    `<p><i><a href="#bar" rel="noopener noreferrer">Foo</a></i></p>`
  )
});

testCases.set(`bold and italic link`, {
  input: '***[Foo](#bar)***',
  output: (
    `<p><i><b><a href="#bar" rel="noopener noreferrer">Foo</a></b></i></p>`
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

testCases.set(`Link in header`, {
  input: '# [Big Bar 123 $5](#bazz-blue)',
  output: (
    `<h1><a href="#bazz-blue" rel="noopener noreferrer">Big Bar 123 $5</a></h1>`
  )
});

testCases.set(`Bold link header`, {
  input: '# __[some 1link](#foobar)__',
  output: (
    `<h1><b><a href="#foobar" rel="noopener noreferrer">some 1link</a></b></h1>`
  )
});

testCases.set(`Italic link header`, {
  input: '# *[Bazz & Bar](https://google.com)*',
  output: (
    `<h1><i><a href="https://google.com" rel="noopener noreferrer" target="_blank">` +
    `Bazz &amp; Bar</a></i></h1>`
  )
});

testCases.set(`Bold, italic link header`, {
  input: '# **_[Foo](http://got-https.com)_**',
  output: (
    `<h1><b><i><a href="http://got-https.com" rel="noopener noreferrer" target="_blank">` +
    `Foo</a></i></b></h1>`
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

testCases.set(`Sample w/ headers, bold, italic, links and multiple paragraphs`, {
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
    `_This is italic text_\n\n` +
    `[This is a fragment link](#fragment)  \n` +
    `[This is standard link](https://link-to-somewhere.com)`
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
    `<i>This is italic text</i></p>` +
    `<p><a href="#fragment" rel="noopener noreferrer">` +
    `This is a fragment link</a><br>` +
    `<a href="https://link-to-somewhere.com" rel="noopener noreferrer" ` +
    `target="_blank">This is standard link</a></p>`
  ),
});

describe('Combined tests', () => {
  testCases.forEach((testCase, name) => {
    it(name, () => {
      cy.testIO(testCase.input, testCase.output);
    });
  });
});


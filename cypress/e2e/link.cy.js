const testCases = new Map();

testCases.set(
  'Basic',
  {
    input: '[Hello](https://example.com)',
    output: '<p><a href="https://example.com" rel="noopener noreferrer" target="_blank">Hello</a></p>'
  }
);

testCases.set(
  'Shouldn\'t link with empty []',
  {
    input: '[](https://example.com)',
    output: '<p>[](https://example.com)</p>',
  }
);

testCases.set(
  'Can parse links back-to-back',
  {
    input: '[Hello](https://google.com)[World](https://foogle.com)',
    output: (
      `<p><a href="https://google.com" rel="noopener noreferrer" target="_blank">Hello</a>` +
      `<a href="https://foogle.com" rel="noopener noreferrer" target="_blank">World</a></p>`
    ),
  }
);

testCases.set(
  'Can use local id-based links',
  {
    input: '[Hello](#hello)',
    output: '<p><a href="#hello" rel="noopener noreferrer">Hello</a></p>',
  }
);

testCases.set(
  'Can parse local id-based links back-to-back',
  {
    input: '[Hello](#hello)[World](#world)',
    output: (
      `<p><a href="#hello" rel="noopener noreferrer">Hello</a>` +
      `<a href="#world" rel="noopener noreferrer">World</a></p>`
    ),
  }
);

testCases.set(
  'Mixed back-to-back',
  {
    input: '[Hello](#hello)[World](https://foogle.com)',
    output: (
      `<p><a href="#hello" rel="noopener noreferrer">Hello</a>` +
      `<a href="https://foogle.com" rel="noopener noreferrer" target="_blank">World</a></p>`
    ),
  }
);

testCases.set(
  'Mixed back-to-back pt.2',
  {
    input: '[World](https://foogle.com)[Hello](#hello)',
    output: (
      `<p><a href="https://foogle.com" rel="noopener noreferrer" target="_blank">World</a>` +
      `<a href="#hello" rel="noopener noreferrer">Hello</a></p>`
    ),
  }
);

testCases.set(
  'Strangely nested',
  {
    input: '[Link](#foo)[Link2](#[three](#linkthree))',
    output: (
      `<p><a href="#foo" rel="noopener noreferrer">Link</a>` +
      `<a href="#[three](#linkthree" rel="noopener noreferrer">Link2</a>)</p>`
    )
  }
)

testCases.set(
  'Doesn\'t trigger on normal usage of [] or ()',
  {
    input: 'Blah blah [foo] blah blah (bar)',
    output: '<p>Blah blah [foo] blah blah (bar)</p>'
  }
)

testCases.set(
  'Requires # or valid link',
  {
    input: '[foo](http:/bass)',
    output: '<p>[foo](http:/bass)</p>'
  }
)

testCases.set(
  'Handles link fragment',
  {
    input: '[Foo](https://google.com/#foo)',
    output: (
      `<p><a href="https://google.com/#foo" rel="noopener noreferrer" target="_blank">Foo</a></p>`
    ) 
  }
)

describe('Link', () => {
  testCases.forEach((testCase, name) => {
    it(name, () => {
      cy.testIO(testCase.input, testCase.output);
    });
  });
});

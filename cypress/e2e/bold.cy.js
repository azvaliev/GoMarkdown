const url = 'http://localhost:3000/';

const inputSelector = '.editing-area > textarea';
const outputSelector = '.preview-area';

const delay = () => {
  cy.wait(75);
}

/**
 * Initialize the test by going to the URl and clearing the input and output.
 * */
const init = () => {
  cy.visit(url);
  cy.get(inputSelector).clear();
  delay();
}

const typeInput = (input) => {
  cy.get(inputSelector).type(input);
}

const checkOutput = (expected) => {
  cy.get(outputSelector).invoke('html').should('equal', expected);
}

const wrapInP = (text) => {
  return `<p>${text}</p>`;
}

describe('Simple bold usage', () => {
  it('handles simple bold', () => {
    init();
    const input = '**bold**';
    const expected = wrapInP('<b>bold</b>');

    typeInput(input);
    delay();
    checkOutput(expected);
  });

  it('handles bold with spaces', () => {
    init();
    const input = '**bold with spaces**';
    const expected = wrapInP('<b>bold with spaces</b>');

    typeInput(input);
    delay();
    checkOutput(expected);
  });

  it('handles bold with newlines', () => {
    init();
    const input = '**bold with newlines\n**';
    const expected = wrapInP('<b>bold with newlines\n</b>');

    typeInput(input);
    delay();
    checkOutput(expected);
  })

  it('handles bold with newlines and spaces', () => {
    init();
    const input = '**bold with newlines\n and spaces**';
    const expected = wrapInP('<b>bold with newlines\n and spaces</b>');

    typeInput(input);
    delay();
    checkOutput(expected);
  })

  it('handles bold using __', () => {
    init();
    const input = '__bold__';
    const expected = wrapInP('<b>bold</b>');

    typeInput(input);
    delay();
    checkOutput(expected);
  })

  it('handles bold using __ with spaces', () => {
    init();
    const input = '__bold with spaces__';
    const expected = wrapInP('<b>bold with spaces</b>');

    typeInput(input);
    delay();
    checkOutput(expected);
  })

  it('handles bold using __ with newlines', () => {
    init();
    const input = '__bold with newlines\n__';
    const expected = wrapInP('<b>bold with newlines\n</b>');

    typeInput(input);
    delay();
    checkOutput(expected);
  })

  it('handles bold using __ with newlines and spaces', () => {
    init();
    const input = '__bold with newlines\n and spaces__';
    const expected = wrapInP('<b>bold with newlines\n and spaces</b>');

    typeInput(input);
    delay();
    checkOutput(expected);
  })
})

describe('Advanced bold usage', () => {
  it('handles multiple bold', () => {
    init();
    const input = '**bold** and **bold**';
    const expected = wrapInP('<b>bold</b> and <b>bold</b>');

    typeInput(input);
    delay();
    checkOutput(expected);
  })

  it('handles multiple bold with spaces', () => {
    init();
    const input = '**bold with spaces** and **bold with spaces**';
    const expected = wrapInP('<b>bold with spaces</b> and <b>bold with spaces</b>');

    typeInput(input);
    delay();
    checkOutput(expected);
  })

  it('handles multiple bold with newlines', () => {
    init();
    const input = '**bold with newlines\n** and **bold with newlines\n**';
    const expected = wrapInP('<b>bold with newlines\n</b> and <b>bold with newlines\n</b>');

    typeInput(input);
    delay();
    checkOutput(expected);
  })

  it('handles multiple bold with newlines and spaces', () => {
    init();
    const input = '**bold with newlines\n and spaces** and **bold with newlines\n and spaces**';
    const expected = wrapInP('<b>bold with newlines\n and spaces</b> and <b>bold with newlines\n and spaces</b>');

    typeInput(input);
    delay();
    checkOutput(expected);
  })

  it('handles bold in multiple paragraphs', () => {
    init();
    const input = 'Paragraph with **bold** in it.\n\nParagraph with **bold** in it.';
    const expected = wrapInP('Paragraph with <b>bold</b> in it.') + wrapInP('Paragraph with <b>bold</b> in it.');

    typeInput(input);
    delay();
    checkOutput(expected);
  })

  it('handles multiple bold using __', () => {
    init();
    const input = '__bold__ and __bold__';
    const expected = wrapInP('<b>bold</b> and <b>bold</b>');

    typeInput(input);
    delay();
    checkOutput(expected);
  })

  it('handles multiple bold using __ with spaces', () => {
    init();
    const input = '__bold with spaces__ and __bold with spaces__';
    const expected = wrapInP('<b>bold with spaces</b> and <b>bold with spaces</b>');

    typeInput(input);
    delay();
    checkOutput(expected);
  })

  it('handles multiple bold using __ with newlines', () => {
    init();
    const input = '__bold with newlines\n__ and __bold with newlines\n__';
    const expected = wrapInP('<b>bold with newlines\n</b> and <b>bold with newlines\n</b>');

    typeInput(input);
    delay();
    checkOutput(expected);
  })

  it('handles multiple bold using __ with newlines and spaces', () => {
    init();
    const input = '__bold with newlines\n and spaces__ and __bold with newlines\n and spaces__';
    const expected = wrapInP('<b>bold with newlines\n and spaces</b> and <b>bold with newlines\n and spaces</b>');

    typeInput(input);
    delay();
    checkOutput(expected);
  })

  it('handles bold in multiple paragraphs using __', () => {
    init();
    const input = 'Paragraph with __bold__ in it.\n\nParagraph with __bold__ in it.';
    const expected = wrapInP('Paragraph with <b>bold</b> in it.') + wrapInP('Paragraph with <b>bold</b> in it.');

    typeInput(input);
    delay();
    checkOutput(expected);
  })

  it('handles bold in multiple paragraphs using __ with newlines', () => {
    init();
    const input = 'Paragraph with __bold with newlines\n__ in it.\n\nParagraph with __bold with newlines\n__ in it.';
    const expected = wrapInP('Paragraph with <b>bold with newlines\n</b> in it.') + wrapInP('Paragraph with <b>bold with newlines\n</b> in it.');

    typeInput(input);
    delay();
    checkOutput(expected);
  })

  it('handles bold in multiple paragraphs using __ with newlines and spaces', () => {
    init();
    const input = 'Paragraph with __bold with newlines\n and spaces__ in it.\n\nParagraph with __bold with newlines\n and spaces__ in it.';
    const expected = wrapInP('Paragraph with <b>bold with newlines\n and spaces</b> in it.') + wrapInP('Paragraph with <b>bold with newlines\n and spaces</b> in it.');

    typeInput(input);
    delay();
    checkOutput(expected);
  })
})

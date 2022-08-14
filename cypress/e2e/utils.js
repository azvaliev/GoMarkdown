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

export {
  init,
  typeInput,
  checkOutput,
  delay,
  wrapInP,
}

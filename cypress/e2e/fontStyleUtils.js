import { wrapInP } from "./utils";

/**
 * Generate test cases for properties like style and bold
 * @param {'**'|'__'|'~~'|'*'|'_'} type The type of the markdown to generate test cases for
 * @param {'b'|'i'} tag The tag to use for the markdown
 * */
export const generateFontStyleTestCases = (type, expectedTag) => {

  let typeName
  switch (type) {
    case '**':
      typeName = 'Bold';
      break;
    case '__':
      typeName = '__Bold__';
      break;
    case '~~':
      typeName = 'Strikethrough';
      break;
    case '*':
      typeName = 'Italic';
      break;
    case '_':
      typeName = '_Italic_';
      break;
    default:
      throw new Erorr('Invalid type');
  }

  const testCases = new Map();

  testCases.set(`Regular ${typeName}`, {
    input: `This is a ${type}test${type}`,
    output: wrapInP(`This is a <${expectedTag}>test</${expectedTag}>`)
  });

  testCases.set(`${typeName} with space`, {
    input: `This is a ${type} test ${type}`,
    output: wrapInP(`This is a <${expectedTag}> test </${expectedTag}>`)
  });
  testCases.set(`${typeName} with newline`, {
    input: `This is a ${type}test\n${type}`,
    output: wrapInP(`This is a <${expectedTag}>test\n</${expectedTag}>`)
  });

  const advancedTestCases = new Map();
  advancedTestCases.set(`Multiple ${typeName}`, {
    input: `This is a ${type}test${type} ${type}test${type}`,
    output: wrapInP(`This is a <${expectedTag}>test</${expectedTag}> <${expectedTag}>test</${expectedTag}>`)
  });

  advancedTestCases.set(`Multiple ${typeName} with space`, {
    input: `This is a ${type} test ${type}   ${type} test ${type}`,
    output: wrapInP(`This is a <${expectedTag}> test </${expectedTag}>   <${expectedTag}> test </${expectedTag}>`)
  });

  advancedTestCases.set(`Multiple ${typeName} with special characters (&!^@=+)`, {
    input: `This is a ${type}test&!^@=+${type}, ${type}t@es!t&!+${type}`,
    output: wrapInP(`This is a <${expectedTag}>test&amp;!^@=+</${expectedTag}>, <${expectedTag}>t@es!t&amp;!+</${expectedTag}>`)
  });

  advancedTestCases.set(`Multiple ${typeName} with only numbers`, {
    input: `${type}123${type} ${type}456${type}`,
    output: wrapInP(`<${expectedTag}>123</${expectedTag}> <${expectedTag}>456</${expectedTag}>`)
  });

  advancedTestCases.set(`Multiple ${typeName} with only numbers and special characters (&!^@=+)`, {
    input: `${type}123&!^@=+${type} ${type}456&!^@=+${type}`,
    output: wrapInP(`<${expectedTag}>123&amp;!^@=+</${expectedTag}> <${expectedTag}>456&amp;!^@=+</${expectedTag}>`)
  });

  return [testCases, advancedTestCases]
}

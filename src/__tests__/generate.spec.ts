import {
  capitalize,
  isEnumString,
  isInterfaceString,
  isObject,
  strings,
  removeWhitespace,
} from '../utils';

describe('Utils', () => {
  it('should capitalize a string', () => {
    const result = capitalize('hello');
    expect(result).toEqual('Hello');
  });
  it('should capitalize a string with multiple words', () => {
    const result = capitalize('hello world');
    expect(result).toEqual('Hello world');
  });
  it('should test Enum String', () => {
    const result = isEnumString('hello world');
    expect(result).toEqual(false);
  });
  it('should test Interface String', () => {
    const result = isInterfaceString('hello world');
    expect(result).toEqual(false);
  });
  it('should test Type String', () => {
    const result = strings('hello world');
    expect(result).toEqual(false);
  });
  it('should test Object', () => {
    const result = isObject('hello world');
    expect(result).toEqual(false);
  });
  it('should test removeWhitespace', () => {
    const result = removeWhitespace('hello world');
    expect(result).toEqual('helloworld');
  });
});

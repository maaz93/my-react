import { createElement } from '../';

describe('createElement', () => {
  test('should create simple div element', () => {
    expect(createElement('div', { id: 'test' })).toMatchSnapshot();
  });

  test('should add different attributes', () => {
    expect(
      createElement('input', { id: 'test', value: 'foo', type: 'text' })
    ).toMatchSnapshot();
  });

  test('should add text content', () => {
    expect(createElement('span', {}, 'text content')).toMatchSnapshot();
  });

  test('should create children correctly', () => {
    expect(
      createElement(
        'div',
        {},
        createElement('span', { id: 'one' }),
        createElement('a', { href: '/bar' })
      )
    ).toMatchSnapshot();
  });
});

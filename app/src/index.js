import { render, ELEMENT_TYPES } from '../../src';

const element = {
  type: 'div',
  props: {
    id: 'container',
    children: [
      { type: 'input', props: { value: 'foo', type: 'text' } },
      { type: 'a', props: { href: '/bar' } },
      {
        type: 'span',
        props: {
          children: [
            {
              type: ELEMENT_TYPES.TEXT_ELEMENT,
              props: { nodeValue: 'Foo' }
            }
          ]
        }
      }
    ]
  }
};

render(element, document.getElementById('root'));

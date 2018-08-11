import { render, createElement } from '../../src';

const element = (
  <div id="container">
    <input value="foo" type="text" />
    <a href="/bar">bar</a>
    <span onClick={() => alert('Hi')}>click me</span>
  </div>
);

render(element, document.getElementById('root'));

import { ELEMENT_TYPES } from './elementTypes';

let rootInstance = null;

export function render(element, container) {
  const prevInstance = rootInstance;
  const nextInstance = reconcile(container, prevInstance, element);
  rootInstance = nextInstance;
}

function reconcile(parentDom, instance, element) {
  if (instance === null) {
    const newInstance = instantiate(element);
    parentDom.appendChild(newInstance.dom);
    return newInstance;
  } else {
    const newInstance = instantiate(element);
    parentDom.replaceChild(newInstance.dom, instance.dom);
    return newInstance;
  }
}

function instantiate(element) {
  const {
    type,
    props: { children, ...otherProps }
  } = element;

  // Create DOM element
  const dom =
    type === ELEMENT_TYPES.TEXT_ELEMENT
      ? document.createTextNode('')
      : document.createElement(type);
  const { events, attributes } = splitEventsAndAttributes(otherProps);

  // Add events
  Object.keys(events).forEach(eventName =>
    dom.addEventListener(eventName, events[eventName])
  );

  // Add attributes
  Object.keys(attributes).forEach(
    attributeName => (dom[attributeName] = attributes[attributeName])
  );

  // Instantiate and append children
  const childElements = children || [];
  const childInstances = childElements.map(instantiate);
  const childDoms = childInstances.map(childInstance => childInstance.dom);
  childDoms.forEach(childDom => dom.appendChild(childDom));

  const instance = { dom, element, childInstances };
  return instance;
}

function splitEventsAndAttributes(props = {}) {
  return Object.keys(props).reduce(
    (memo, prop) => {
      if (prop.indexOf('on') === 0) {
        memo.events[prop] = props[prop];
      } else {
        memo.attributes[prop] = props[prop];
      }
      return memo;
    },
    {
      events: {},
      attributes: {}
    }
  );
}

export function createElement(type, config, ...args) {
  const props = { ...config };
  const hasChildren = args.length > 0;
  const rawChildren = hasChildren ? [].concat(...args) : [];
  props.children = rawChildren
    .filter(c => c != null && c !== false)
    .map(c => (c instanceof Object ? c : createTextElement(c)));
  return { type, props };
}

function createTextElement(value) {
  return createElement(ELEMENT_TYPES.TEXT_ELEMENT, { nodeValue: value });
}

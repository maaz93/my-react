export function render(element, parentDom) {
  const {
    type,
    props: { children, ...otherProps }
  } = element;
  const dom = document.createElement(type);
  const { events, attributes } = splitEventsAndAttributes(otherProps);

  Object.keys(events).forEach(eventName =>
    dom.addEventListener(eventName, events[eventName])
  );

  Object.keys(attributes).forEach(
    attributeName => (dom[attributeName] = attributes[attributeName])
  );

  const childElements = children || [];
  childElements.forEach(childElement => render(childElement, dom));
  parentDom.appendChild(dom);
}

const splitEventsAndAttributes = props => {
  return Object.keys(props).reduce(
    (memo, prop) => {
      if (prop.indexOf('on') === 0) {
        memo.events[prop] = props[prop];
      } else {
        memo.attributes[props] = props[prop];
      }
    },
    {
      events: {},
      attributes: {}
    }
  );
};

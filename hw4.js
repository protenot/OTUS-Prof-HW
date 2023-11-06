function getPath(element) {
  const selectors = [];

  while (element.parentElement) {
    const tagName = element.tagName.toLowerCase();
    const classNames = Array.from(element.classList);
    const id = element.id;

    let selector = tagName;

    if (id) {
      selector += `#${id}`;
    } else if (classNames.length > 0) {
      selector += `.${classNames.join(".")}`;
    }

    selectors.unshift(selector);
    element = element.parentElement;
  }

  if (selectors[0] !== "body") {
    selectors.unshift("body");
  }
  const uniqueSelector = selectors.join(" ");

  if (uniqueSelector.trim() === "body") {
    return element.tagName.toLowerCase();
  }
  return uniqueSelector;
}

module.exports = getPath;

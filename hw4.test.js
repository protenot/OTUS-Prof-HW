const getPath = require("./hw4");
describe("getPath", () => {
  it("returns unique selector", () => {
    const element = document.createElement("li");
    const ul = document.createElement("ul");
    ul.classList.add("class");
    const div = document.createElement("div");
    const body = document.createElement("body");

    ul.appendChild(element);
    div.appendChild(ul);
    body.appendChild(div);

    const selector = getPath(element);
    expect(selector).toBe("body div ul.class li");
  });
  it("should return the tag name if the element has no id or classes", () => {
    const body = document.createElement("body");
    const element = document.createElement("div");
    body.append(element);
    const select = document.createElement("select");
    element.append(select);
    const option = document.createElement("option");
    select.append(option);
    const result = getPath(option);
    expect(result).toBe("body div select option");
  });
});

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
    //document.append(body)

    const selector = getPath(element);
    expect(selector).toBe("body div ul.class li");
  });
});

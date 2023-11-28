import { HTMLElement } from "./elements";
import { generate } from "./generator";

function init() {
  var testElement: HTMLElement = {
    name: "html",
    children: [
      {
        name: "body",
        children: [
          {
            name: "h1",
            attributes: [
              {
                name: "style",
                value: "color: aqua",
              },
            ],
            children: "Hello JSON Markup!",
          },
          {
            name: "button",
            attributes: [
              {
                name: "onlick",
                value: "alert('Hello!')",
              },
            ],
          },
        ],
      },
    ],
  };
  let result = new Array<string>();
  generate(testElement, result);
  console.log(result.join(""));
  console.log(JSON.stringify(testElement));
}

init();

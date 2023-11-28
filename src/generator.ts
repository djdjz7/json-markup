import { CustomExecution } from "vscode";
import { HTMLElement } from "./elements";
import { isNamedExportBindings } from "typescript";
export function generate(element: HTMLElement, result: string[]): void {
  if (element.children != undefined && element.needClosing == false) {
    throw Error(
      `Contradictory information at element:\n${JSON.stringify(
        element
      )}\nElement does not need a closing tag should have no children.`
    );
  }
  result.push(`<${element.name}`);
  if (element.attributes != undefined) {
    for (let i = 0; i < element.attributes.length; i++) {
      result.push(
        ` ${element.attributes[i].name}="${element.attributes[i].value}"`
      );
    }
  }
  result.push(">");
  if (element.needClosing == false) {
    return;
  }
  if (element.children == undefined || element.children.length == 0) {
    result.push(`</${element.name}>`);
    return;
  }
  if (typeof element.children == "string") {
    result.push(element.children);
  } else {
    for (let i = 0; i < element.children.length; i++) {
      generate(element.children[i], result);
    }
  }
  result.push(`</${element.name}>`);
  return;
}

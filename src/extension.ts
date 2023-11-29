// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { generate } from "./generator";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let generator = vscode.commands.registerTextEditorCommand(
    "json-markup.generate",
    async (textEditor, edit) => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      try {
        const result = new Array<string>();
        generate(JSON.parse(textEditor.document.getText()), result);
        const doc = await vscode.workspace.openTextDocument({
          language: "html",
          content: result.join(""),
        });
        await vscode.window.showTextDocument(
          doc,
          vscode.ViewColumn.Active,
          false
        );
        vscode.commands.executeCommand("editor.action.formatDocument");
      } catch (error) {
        const e = error as Error;
        vscode.window.showErrorMessage(`${e.name}: ${e.message}`);
      }
    }
  );

  context.subscriptions.push(generator);
}
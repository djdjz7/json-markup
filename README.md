# JSON Markup

An extremely silly project that allows you to write HTML in JSON.

This repository includes a generator to generate HTML from JSON, as well as a Visual Studio Code Extension.

## What is JSON Markup

JSON Markup intends to help developers write HTML with a JSON file (extension '.jsom').

This is how we define the data structure:

```ts
export interface HTMLElement {
  name: string;
  needClosing?: boolean;
  children?: HTMLElement[] | string;
  attributes?: Attribute[];
}

export interface Attribute {
  name: string;
  value: string;
}
```

## Sample JSOM

```json
{
  "name": "html",
  "children": [
    {
      "name": "body",
      "children": [
        {
          "name": "h1",
          "attributes": [{ "name": "style", "value": "color: aqua" }],
          "children": "Hello JSON Markup!"
        },
        {
          "name": "button",
          "attributes": [{ "name": "onclick", "value": "alert('Hello!')" }]
        }
      ]
    }
  ]
}
```

This will generate the following HTML code:

```html
<html>
  <body>
    <h1 style="color: aqua">Hello JSON Markup!</h1>
    <button onclick="alert('Hello!')"></button>
  </body>
</html>
```

Isn't it silly?
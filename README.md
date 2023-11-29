<div align="center">
<img src="icon.png" />
</div>
<h1 align="center" style="margin: 12px;">JSON Markup</h1>

An extremely silly project that allows you to write HTML in JSON.

This repository includes a generator to generate HTML from JSON, as well as a Visual Studio Code Extension.

## What is JSON Markup

JSON Markup intends to help developers write HTML with a JSON file (extension '.jsom').

This is how we define the data structure:

```ts
export interface HTMLElement {
  name: string;
  needClosing?: boolean; // Set this property to false if the element does not need a closing tag, for example, <input>
  children?: HTMLElement[] | string;
  attributes?: Attribute[];
}

export interface Attribute {
  name: string;
  value: string;
}
```

## Sample JSOM

### A simple One

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

This will generate the following HTML code (formatted):

```html
<html>
  <body>
    <h1 style="color: aqua">Hello JSON Markup!</h1>
    <button onclick="alert('Hello!')"></button>
  </body>
</html>
```

### A more complicated one

```json
// Formatted: 2602 Bytes (280.69%)
// Minified: 927 Bytes (100%)
{
  "name": "html",
  "children": [
    {
      "name": "body",
      "children": [
        { "name": "h1", "children": "Login" },
        {
          "name": "input",
          "needClosing": false,
          "attributes": [
            { "name": "type", "value": "text" },
            { "name": "id", "value": "account" },
            { "name": "placeholder", "value": "Account" }
          ]
        },
        {
          "name": "input",
          "needClosing": false,
          "attributes": [
            { "name": "type", "value": "password" },
            { "name": "id", "value": "password" },
            { "name": "placeholder", "value": "Password" },
            { "name": "style", "value": "margin:4px" }
          ]
        },
        {
          "name": "button",
          "children": "Login",
          "attributes": [
            { "name": "onclick", "value": "login()" },
            { "name": "style", "value": "margin:8px" }
          ]
        }
      ]
    },
    {
      "name": "style",
      "children": "body{margin:0;padding:0;display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;}"
    },
    {
      "name": "script",
      "children": "function login(){const account = document.getElementById('account').value;const password = document.getElementById('password').value;alert(JSON.stringify({account,password}));}"
    }
  ]
}
```

This will generate the following HTML code (formatted):

```html
<!-- Formatted: 750 Bytes (80.91%) -->
<!-- Generated: 555 Bytes (59.87%) -->
<!-- Minified: 478 Bytes (51.56%) -->
<html>
  <body>
    <h1>Login</h1>
    <input type="text" id="account" placeholder="Account" /><input
      type="password"
      id="password"
      placeholder="Password"
      style="margin: 4px"
    /><button onclick="login()" style="margin: 8px">Login</button>
  </body>
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
  </style>
  <script>
    function login() {
      const account = document.getElementById("account").value;
      const password = document.getElementById("password").value;
      alert(JSON.stringify({ account, password }));
    }
  </script>
</html>
```

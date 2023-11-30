<script setup lang="ts">
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import { onMounted, ref } from "vue";
const editorRef = ref();

const defaultCode = `{
    "name": "html",
    "children": [
        {
            "name": "body",
            "children": [
                {
                    "name": "h1",
                    "children": "Login"
                },
                {
                    "name": "input",
                    "needClosing": false,
                    "attributes": [
                        {
                            "name": "type",
                            "value": "text"
                        },
                        {
                            "name": "id",
                            "value": "account"
                        },
                        {
                            "name": "placeholder",
                            "value": "Account"
                        }
                    ]
                },
                {
                    "name": "input",
                    "needClosing": false,
                    "attributes": [
                        {
                            "name": "type",
                            "value": "password"
                        },
                        {
                            "name": "id",
                            "value": "password"
                        },
                        {
                            "name": "placeholder",
                            "value": "Password"
                        },
                        {
                            "name": "style",
                            "value": "margin:4px"
                        }
                    ]
                },
                {
                    "name": "button",
                    "children": "Login",
                    "attributes": [
                        {
                            "name": "onclick",
                            "value": "login()"
                        },
                        {
                            "name": "style",
                            "value": "margin:8px"
                        }
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
}`;

onMounted(() => {
  var modelUri = monaco.Uri.parse("foo://sample.jsom");
  var model = monaco.editor.createModel(defaultCode, "json", modelUri);
  self.MonacoEnvironment = {
    getWorker(_, label) {
      if (label === "json") {
        return new jsonWorker();
      }
      if (label === "html") {
        return new htmlWorker();
      }
      return new editorWorker();
    },
  };


  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    schemaValidation: "error",
    schemas: [
      {
        uri: "https://github.com/djdjz7/json-markup/jsom-schema.json",
        fileMatch: [modelUri.toString()],
        schema: {
          $ref: "#/definitions/HTMLElement",
          $schema: "http://json-schema.org/draft-07/schema#",
          definitions: {
            Attribute: {
              properties: {
                name: {
                  type: "string",
                },
                value: {
                  type: "string",
                },
              },
              required: ["name", "value"],
              type: "object",
            },
            HTMLElement: {
              properties: {
                attributes: {
                  items: {
                    $ref: "#/definitions/Attribute",
                  },
                  type: "array",
                },
                children: {
                  anyOf: [
                    {
                      items: {
                        $ref: "#/definitions/HTMLElement",
                      },
                      type: "array",
                    },
                    {
                      type: "string",
                    },
                  ],
                },
                name: {
                  type: "string",
                },
                needClosing: {
                  type: "boolean",
                },
              },
              required: ["name"],
              type: "object",
            },
          },
        },
      },
    ],
  });
  monaco.editor.create(editorRef.value, {
    language: "json",
    model,
  });
});
</script>
<template>
  <div class="editor" ref="editorRef"></div>
</template>

<style scoped>
.editor {
  height: 100%;
}
</style>

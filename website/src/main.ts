import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import 'monaco-editor'

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";


createApp(App).mount("#app");

self.MonacoEnvironment = {
    getWorker(_, label) {
        switch (label) {
            case 'json':
                return new jsonWorker();
            case 'html':
                return new htmlWorker();
            default:
                return new editorWorker();
        }
    },
  };
  
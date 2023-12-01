<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref } from "vue";
import { sampleCode } from "./SampleJsom";
import { jsonSchema } from "./JsomSchema";
const editorRef = ref();

const emit = defineEmits(["onModelContentChanged"]);
onMounted(() => {
  var modelUri = monaco.Uri.parse("foo://sample.jsom");
  var model = monaco.editor.createModel(sampleCode, "json", modelUri);

  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    schemaValidation: "error",
    schemas: [
      {
        uri: "",
        fileMatch: [modelUri.toString()],
        schema: jsonSchema,
      },
    ],
    validate: true,
  });

  const editor = monaco.editor.create(editorRef.value, {
    language: "json",
    model,
  });

  editor.getModel()?.onDidChangeContent((_) => {
    emit("onModelContentChanged", editor.getModel()?.getValue());
  });
});
</script>
<template>
  <div class="editor" ref="editorRef"></div>
</template>

<style scoped>
.editor {
  height: 100%;
  width: 100%;
}
</style>

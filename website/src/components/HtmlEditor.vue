<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, watch } from "vue";
import { sampleOutput } from "./SampleOutput";
const editorRef = ref();
let editor: monaco.editor.IStandaloneCodeEditor;

const props = defineProps<{
  content: string;
}>();

watch(
  () => props.content,
  (newValue, _) => {
    editor.getModel()?.setValue(newValue);
    editor.getAction("editor.action.formatDocument")?.run();
  }
);
onMounted(() => {
  var modelUri = monaco.Uri.parse("foo://sample-output.html");
  var model = monaco.editor.createModel(sampleOutput, "html", modelUri);
  editor = monaco.editor.create(editorRef.value, {
    language: "html",
    model,
    readOnly: true,
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

<script setup lang="ts">
import JsomEditor from "./components/JsomEditor.vue";
import HtmlEditor from "./components/HtmlEditor.vue";
import { generate } from "./generator/generator";
import { onMounted, onUnmounted, ref } from "vue";
import jsBeautify from "js-beautify";

const generatedHtml = ref("");

function onJsomChanged(content: string) {
  const result = new Array<string>();
  generate(JSON.parse(content), result);
  const rawHtml = result.join("");
  generatedHtml.value = jsBeautify.html(rawHtml, {
    indent_size: 2,
    indent_char: " ",
    max_preserve_newlines: 5,
    preserve_newlines: true,
    indent_scripts: "normal",
    wrap_line_length: 0,
    indent_inner_html: false,
    indent_empty_lines: false,
  });
}

function scrollToPlayground() {
  document.getElementById("playground")?.scrollIntoView({
    block: "start",
    behavior: "smooth",
  });
}

function switchTopBannerColor() {
  let offset = document
    .getElementById("playground")
    ?.getBoundingClientRect().top;
  if (offset == undefined) return;
  if (offset > 33) {
    document.getElementById("top-banner")!.style.color = "white";
  } else {
    document.getElementById("top-banner")!.style.color = "black";
  }
}

onMounted(() => {
  switchTopBannerColor();
  document.addEventListener("scroll", switchTopBannerColor);
});

onUnmounted(() => {
  document.removeEventListener("scroll", switchTopBannerColor);
});
</script>

<template>
  <main>
    <div id="top-banner-container">
      <div id="top-banner">
        <span id="top-banner-title">JSON Markup</span>
        <div id="top-banner-links">
          <a @click="scrollToPlayground()" style="cursor: pointer"
            >Playground</a
          >
          <span>·</span>
          <a
            href="https://marketplace.visualstudio.com/items?itemName=djdjz7.json-markup"
            >Visual Studio Marketplace</a
          >
          <span>·</span>
          <a href="https://github.com/djdjz7/json-markup">Github</a>
        </div>
      </div>
    </div>
    <div id="screen-one-container">
      <div id="screen-one">
        <p id="text-icon">{&lt;/&gt;}</p>
        <p id="title">Get Silly,<br />Write HTML in JSON.</p>
        <a
          href="https://marketplace.visualstudio.com/items?itemName=djdjz7.json-markup"
          id="get-started"
          >Get extension on<br />Visual Studio Marketplace &rarr;</a
        >
      </div>
    </div>
    <div id="playground"></div>
    <div id="screen-two">
      <h1>Playground</h1>
      <div id="editors-container">
        <div class="container-wrapper">
          <span>JSOM Code:</span>
          <div class="editor-wrapper">
            <JsomEditor @on-model-content-changed="onJsomChanged" />
          </div>
        </div>
        <div class="container-wrapper">
          <span>Generated HTML:</span>
          <div class="editor-wrapper">
            <HtmlEditor :content="generatedHtml" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
p {
  margin: 0;
}
a {
  text-decoration: none;
  transition: color 0.3s;
}
a:visited,
a:hover {
  color: inherit;
}

span {
  transition: color 0.3s;
}

.container-wrapper {
  height: -webkit-fill-available;
  height: stretch;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.editor-wrapper {
  flex: 1;
}

#editors-container {
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
  flex: 1;
}

#screen-two {
  box-sizing: border-box;
  padding-top: 64px;
  height: 100vh;
  max-height: 100vh;
  min-height: 512px;
  margin: 0 auto 0 auto;
  width: calc(100% - 4rem);
  max-width: 1280px;
  display: flex;
  flex-direction: column;
}

#subtitle {
  font-weight: 600;
  font-size: larger;
}

#top-banner-container {
  height: 64px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
}

#top-banner {
  margin: 0 auto;
  width: calc(100% - 4rem);
  height: 100%;
  max-width: 1280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#top-banner-links {
  display: flex;
  gap: 12px;
}

#top-banner-title {
  font-weight: bold;
}

#screen-one-container {
  height: 100vh;
  min-height: 512px;
  padding-top: 128px;
  background: #ffb300;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
}

#screen-one {
  margin: 0 auto;
  width: calc(100% - 4rem);
  height: 100%;
  max-width: 1280px;
  color: white;
}

#title {
  font-weight: 700;
  font-size: 64px;
}

#text-icon {
  font-family: monospace;
  font-size: 48px;
}

#get-started,
#get-started:hover,
#get-started:visited {
  color: inherit;
  font-size: 36px;
  text-decoration: underline;
}
</style>

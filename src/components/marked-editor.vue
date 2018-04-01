<template>
  <div id="editor">
    <textarea v-model="input" @input="updateContent"></textarea>
    <div v-html="compiledMarkdown"></div>
    <input type="text" v-model="title" v-if="type === 'create'">
    <div id="update" @click="update" v-if="type === 'edit'">更新</div>
    <div id="create" @click="create" v-else>新建</div>
  </div>
</template>

<script>
import marked from "marked";
import _ from "lodash";
import http from "../utils/client-axios";

export default {
  name: "MarkedEditor",
  props: {
    editor: {
      type: Object,
      required: true
    },
    type: {
      type: String
    }
  },
  data() {
    return {
      input: decodeURIComponent(escape(atob(this.editor.content))),
      title: "unnamed.md"
    };
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.input, { sanitize: true });
    }
  },
  methods: {
    updateContent: _.debounce(function(e) {
      this.input = e.target.value;
    }, 300),
    update: function() {
      http().put(`/repos/benbenye/git-blog/contents/${this.editor.path}`, {
        message: "test",
        sha: this.editor.sha,
        content: btoa(unescape(encodeURIComponent(this.input)))
      });
    },
    create: function() {
      http().put(`/repos/benbenye/git-blog/contents/${this.title}`, {
        path: this.title,
        message: "test",
        content: btoa(unescape(encodeURIComponent(this.input)))
      });
    }
  }
};
</script>

<style lang="scss" type="text/scss">
#editor {
  margin: 0;
  height: 100%;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
}

textarea,
#editor div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
</style>

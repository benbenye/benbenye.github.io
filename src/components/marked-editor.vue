<template>
  <div id="editor">
    <template v-if="type === 'edit'">
      <textarea v-model="input" @input="updateContent"></textarea>
      <div v-html="compiledMarkdown"></div>
      <div id="update" @click="update">更新</div>
    </template>
    <template v-else>
      <textarea v-model="createInput" @input="updateCreateContent"></textarea>
      <div v-html="compiledMarkdown"></div>
      <input type="text" v-model="title" placeholder="文章标题">
      <div id="create" @click="create">新建</div>
    </template>
    <textarea v-model="commitMes"></textarea>
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
      type: String,
      required: true //edit|create
    }
  },
  data() {
    return {
      input:
        this.type === "edit" &&
        decodeURIComponent(escape(atob(this.editor.content))),
      createInput: "",
      title: "unnamed.md",
      commitMes: "commit"
    };
  },
  computed: {
    compiledMarkdown: function() {
      if (this.type === "create") return "";

      return marked(this.input, { sanitize: true });
    }
  },
  methods: {
    updateContent: _.debounce(function(e) {
      this.input = e.target.value;
    }, 300),
    updateCreateContent: _.debounce(function(e) {
      this.createInput = e.target.value;
    }, 300),
    update: function() {
      http().put(`/repos/benbenye/git-blog/contents/${this.editor.path}`, {
        message: this.commitMes,
        sha: this.editor.sha,
        content: btoa(unescape(encodeURIComponent(this.input)))
      });
    },
    create: function() {
      http().put(`/repos/benbenye/git-blog/contents/${this.title}`, {
        path: this.title,
        message: this.commitMes,
        content: btoa(unescape(encodeURIComponent(this.createInput)))
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

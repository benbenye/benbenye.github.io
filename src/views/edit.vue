<template>
  <div class="editor">
    <marked-editor v-if="contents" :editor.sync="contents" :type="type"></marked-editor>
  </div>
</template>
<script>
import http from "../utils/client-axios";
import config from "../config";
import MarkedEditor from "../components/marked-editor.vue";

export default {
  components: {
    MarkedEditor
  },
  data() {
    return {
      contents: null,
      type: "edit"
    };
  },
  mounted() {
    http()
      .get(`${config.repoPath}/contents/${this.$route.params.path}`)
      .then(res => {
        if (res.status <= 299) {
          this.contents = res.data;
        }
      });
  }
};
</script>

<template>
  <div class="blog">
    <div v-html="html"></div>
    <comment></comment>
  </div>
</template>
<script>
import marked from "marked";
import http from "../utils/client-axios";
import Comment from "../components/comment.vue";
import config from "../config";

export default {
  components: {
    Comment
  },
  data() {
    return {
      contents: null,
      html: ""
    };
  },
  mounted() {
    http()
      .get(`${config.repoPath}/contents/${this.$route.params.path}`)
      .then(res => {
        if (res.status <= 299) {
          this.contents = res.data;
          this.html = marked(
            decodeURIComponent(escape(atob(this.contents.content))),
            { sanitize: true }
          );
        }
      });
  }
};
</script>

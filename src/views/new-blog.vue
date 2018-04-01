<template>
  <div class="new">
    <marked-editor :editor="editor"></marked-editor>
  </div>
</template>

<script>
import MarkedEditor from "../components/marked-editor.vue";

export default {
  name: "new-blog",
  components: {
    MarkedEditor
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss" type="text/scss">
</style>

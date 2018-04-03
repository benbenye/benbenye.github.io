<template>
  <div class="new">
    <marked-editor :editor="editor" :type="'create'"></marked-editor>
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
    return {
      editor: {}
    };
  }
};
</script>

<style scoped lang="scss" type="text/scss">
</style>

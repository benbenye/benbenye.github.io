<template>
  <div class="home">
    <ul>
      <li v-for="(item, index) in files" v-if="item.type === 'file'" :key="index">
        <span>{{item.name}}</span>
        <router-link :to="{name:'edit', params: {path: item.path}}">修改</router-link>
        <span class="delete" @click="cut(item)">删除</span>
      </li>
    </ul>
    <router-link to="/new-blog">新建博客</router-link>
  </div>
</template>

<script>
import http from "../utils/client-axios";

export default {
  name: "home",
  components: {},
  data() {
    return {
      files: []
    };
  },
  mounted() {
    http()
      .get("/repos/benbenye/git-blog/contents")
      .then(res => {
        if (res.status <= 299) {
          this.files = res.data;
        }
      });
  },
  methods: {
    getFileContents: function(path) {
      return http().get(`/repos/benbenye/git-blog/contents/${path}`);
    },
    cut: function(file) {
      http().delete(
        `/repos/benbenye/git-blog/contents/${file.path}?message=delete&sha=${
          file.sha
        }`
      );
    }
  }
};
</script>

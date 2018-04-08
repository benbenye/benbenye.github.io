<template>
  <div class="home">
    <ul>
      <li v-for="(item, index) in files" v-if="item.type === 'file'" :key="index">
        <router-link :to="{name:'blog', params: {path: item.path}}">{{item.name}}</router-link>
        <template v-if="Data.token">
          <router-link :to="{name:'edit', params: {path: item.path}}">修改</router-link>
          <span class="delete" @click="cut(item)">删除</span>
        </template>
      </li>
    </ul>
    <router-link to="/new-blog" v-if="Data.token">新建博客</router-link>
  </div>
</template>

<script>
import Data from "../store/data";
import http from "../utils/client-axios";
import config from "../config";

export default {
  name: "home",
  components: {},
  data() {
    return {
      files: [],
      Data: Data
    };
  },
  mounted() {
    http()
      .get(`${config.repoPath}/contents`)
      .then(res => {
        if (res.status <= 299) {
          this.files = res.data;
        }
      });
  },
  methods: {
    getFileContents: function(path) {
      return http().get(`${config.repoPath}/contents/${path}`);
    },
    cut: function(file) {
      http().delete(
        `${config.repoPath}/contents/${file.path}?message=delete&sha=${
          file.sha
        }`
      );
    }
  }
};
</script>

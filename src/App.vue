<template>
  <div id="app">
    <template v-if="!Data.token">
      <input type="text" placeholder="请填写您的 github token，已确认您的身份" v-model="token">
      <div class="btn" @click="setToken">提交</div>
    </template>
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Data from "./store/data";
import http from "./utils/client-axios";
import config from "./config";

export default {
  name: "App",
  data() {
    return {
      token: Data.token,
      Data: Data
    };
  },
  mounted() {
    Data.token = this.token = localStorage.getItem("github-token");
  },
  methods: {
    setToken: function() {
      this.testToken().then(res => {
        if (res === "ok") {
          Data.token = this.token;
          localStorage.setItem("github-token", this.token);
          alert("token is ok");
        } else {
          alert("sorry, you haven't access to this blog");
        }
      });
    },
    testToken: function() {
      return http()
        .get(`${config.repoPath}/contents/test-token`)
        .then(res => {
          return http(this.token).put(
            `${config.repoPath}/contents/test-token`,
            {
              message: "test token",
              sha: res.data.sha,
              content: ""
            }
          );
        })
        .then(() => {
          return "ok";
        })
        .catch(() => {
          return false;
        });
    }
  }
};
</script>

<style lang="scss" type="text/scss">
@import "./common/scss/base";
</style>

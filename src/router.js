import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home.vue";
import Edit from "./views/edit.vue";
import NewBlog from "./views/new-blog.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/edit/:path",
      name: "edit",
      component: Edit
    },
    {
      path: "/new-blog",
      name: "new-blog",
      component: NewBlog
    }
  ]
});

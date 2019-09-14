import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index";
import Table from "./views/Table";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/index",
      name: "index",
      component: Index
    },
    {
      path: "/table",
      name: "table",
      component: Table
    }
  ]
});

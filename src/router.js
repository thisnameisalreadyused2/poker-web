import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index";
import Registration from "./views/Registration.vue";
import Poker from "./views/Poker";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Index
    },
    {
      path: "/registration",
      name: "registration",
      component: Registration
    },
    {
      path: "/poker",
      name: "poker",
      component: Poker
    }
  ]
});

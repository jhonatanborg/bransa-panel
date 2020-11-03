import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Main,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next();
      } else {
        next({ name: "session" });
      }
    },
    children: [
      {
        path: "/",
        name: "list-products",
        component: () => import("@/views/screens/ListProducts.vue"),
      },
    ],
  },
  {
    path: "/sessao",
    name: "session",
    component: () => import("@/views/screens/Session.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

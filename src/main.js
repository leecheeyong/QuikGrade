import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () => import("./views/Landing.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("./views/Login.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("./views/Dashboard.vue"),
  },
  {
    path: "/add-assignment",
    name: "AddAssignment",
    component: () => import("./views/AddAssignment.vue"),
  },
  {
    path: "/assignment/:id",
    name: "AssignmentDetails",
    component: () => import("./views/AssignmentDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");

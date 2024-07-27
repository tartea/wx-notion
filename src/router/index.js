import Home from "@/components/options/Home";
import BookHome from "@/components/options/book_home";
import Setting from "@/components/settting";
import BookDetail from "@/components/book_detail";
import Login from "@/components/login";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/bookHome",
        name: "BookHome",
        component: BookHome,
      },
      {
        path: "/setting",
        name: "Setting",
        component: Setting,
      },
      {
        path: "/bookDetail/:bookId",
        name: "BookDetail",
        component: BookDetail,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

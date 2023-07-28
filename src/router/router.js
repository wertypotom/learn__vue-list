import { createRouter, createWebHistory } from "vue-router";
import MainPage from "./../pages/Main";
import PostsPage from "./../pages/Posts";
import PostsStore from "./../pages/PostsStore";
import PostsCompositionAPI from "./../pages/PostsCompositionAPI";
import AboutPage from "./../pages/About";
import SinglePost from "./../pages/SinglePost";

const routes = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/posts",
    component: PostsCompositionAPI,
  },
  {
    path: "/posts/:id",
    component: SinglePost,
  },
  {
    path: "/about",
    component: AboutPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;

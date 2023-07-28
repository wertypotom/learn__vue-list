import { createStore } from "vuex";
import postModule from "./postModule";
import likesModule from "./likesModule";

export default createStore({
  modules: {
    posts: postModule,
    likes: likesModule,
  },
});

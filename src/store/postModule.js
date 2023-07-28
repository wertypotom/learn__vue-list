import axios from "axios";

export default {
  state: {
    searchValue: "",
    showDialog: false,
    posts: [],
    isPostsLoading: false,
    selectValue: "",
    selectOptions: [
      {
        name: "By name",
        value: "title",
      },
      {
        name: "By description",
        value: "body",
      },
    ],
    postLimit: 10,
    currentPage: 1,
    totalPages: 0,
  },
  getters: {
    searchedPosts(state) {
      return [...state.posts].filter((post) =>
        post.title.includes(state.searchValue.toLowerCase())
      );
    },
    selectedPosts(state) {
      state.posts.sort((a, b) =>
        a[state.selectValue].localeCompare(b[state.selectValue])
      );
    },
  },
  mutations: {
    setSelectValue(state, option) {
      state.selectValue = option;
    },
    setSearchValue(state, searchString) {
      state.searchValue = searchString;
    },
    setShowDialog(state) {
      state.showDialog = !state.showDialog;
    },
    selectPage(state, page) {
      state.currentPage = page;
    },
    submitPost(state, newPost) {
      state.posts.push(newPost);
      state.showDialog = false;
    },
    removePost(state, id) {
      state.posts = state.posts.filter((post) => post.id !== id);
    },
  },
  actions: {
    fetchPosts({ commit, state }) {
      try {
        state.isPostsLoading = true;
        setTimeout(async () => {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _limit: state.postLimit,
                _page: state.currentPage,
              },
            }
          );
          state.posts = response.data;
          state.isPostsLoading = false;
          state.totalPages = Math.ceil(
            response.headers["x-total-count"] / state.postLimit
          );
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    },
  },
  namespaced: true,
};

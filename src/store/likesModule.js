export default {
  state: {
    likes: 2,
  },
  getters: {
    getComputedLikes(state) {
      return (state.likes *= 2);
    },
  },
  mutations: {
    increaseLikes(state) {
      state.likes += 1;
    },
  },
};

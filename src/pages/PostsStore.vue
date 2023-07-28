<template>
  <div class="app">
    <div>
      <p>likes: {{ $store.state.likes.likes }}</p>
      <p>computed likes: {{ $store.getters.getComputedLikes }}</p>

      <my-button @click="$store.commit('increaseLikes')"
        >Increase likes</my-button
      >
    </div>
    <div class="header__btns">
      <my-button @click="setShowDialog">Create post</my-button>
      <my-select
        :options="selectOptions"
        :modelValue="selectValue"
        @update:modelValue="setSelectValue"
      />
    </div>
    <my-input
      v-focus
      placeholder="Search posts..."
      :modelValue="searchValue"
      @update:modelValue="setSearchValue"
    />
    <my-modal :show="showDialog" @update:show="setShowDialog">
      <post-form @submitPost="submitPost" />
    </my-modal>

    <post-list
      v-if="!isPostsLoading"
      :posts="searchedPosts"
      @removePost="removePost"
    />
    <h2 v-else>Loading...</h2>

    <pagination
      :pages="totalPages"
      @selectPage="selectPage"
      :activePage="currentPage"
    />
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import Pagination from "@/components/Pagination.vue";
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";

export default {
  components: {
    PostForm,
    PostList,
    Pagination,
  },
  name: "PostsPageStore",
  watch: {
    currentPage() {
      this.fetchPosts();
    },
  },
  computed: {
    ...mapState({
      searchValue: (state) => state.posts.searchValue,
      showDialog: (state) => state.posts.showDialog,
      posts: (state) => state.posts.posts,
      isPostsLoading: (state) => state.posts.isPostsLoading,
      selectValue: (state) => state.posts.selectValue,
      selectOptions: (state) => state.posts.selectOptions,
      postLimit: (state) => state.posts.postLimit,
      currentPage: (state) => state.posts.currentPage,
      totalPages: (state) => state.posts.totalPages,
    }),
    ...mapGetters({
      searchedPosts: "posts/searchedPosts",
      selectedPosts: "posts/selectedPosts",
    }),
  },
  methods: {
    ...mapMutations({
      selectPage: "posts/selectPage",
      submitPost: "posts/submitPost",
      removePost: "posts/removePost",
      setSelectValue: "posts/setSelectValue",
      setSearchValue: "posts/setSearchValue",
      setShowDialog: "posts/setShowDialog",
    }),
    ...mapActions({
      fetchPosts: "posts/fetchPosts",
    }),
  },
  beforeCreate() {
    console.log("before create parent");
  },
  created() {
    console.log("created parent");
  },
  beforeMount() {
    console.log("beforeMount parent");
  },
  mounted() {
    this.fetchPosts();
    console.log("mounted parent");
  },
  beforeUpdate() {
    console.log("beforeUpdate parent");
  },
  updated() {
    console.log("updated parent");
  },
  beforeUnmount() {
    console.log("beforeUnmount parent");
  },
  unmounted() {
    console.log("unmounted parent");
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.header__btns {
  display: flex;
  justify-content: space-between;
}

.app {
  padding: 20px;
}
</style>

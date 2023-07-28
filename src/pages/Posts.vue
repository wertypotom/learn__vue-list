<template>
  <div class="app">
    <div class="header__btns">
      <my-button @click="showDialog = true">Create post</my-button>
      <my-select :options="selectOptions" v-model="selectValue" />
    </div>
    <my-input placeholder="Search posts..." v-model="searchValue" />
    <my-modal v-model:show="showDialog">
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
import axios from "axios";

export default {
  components: {
    PostForm,
    PostList,
    Pagination,
  },
  name: "App",
  data() {
    return {
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
    };
  },
  watch: {
    selectValue(newV, prevV) {
      this.posts.sort((a, b) => a[newV].localeCompare(b[newV]));
    },
    currentPage() {
      this.fetchPosts();
    },
  },
  computed: {
    searchedPosts() {
      return [...this.posts].filter((post) =>
        post.title.includes(this.searchValue.toLowerCase())
      );
    },
  },
  methods: {
    selectPage(page) {
      this.currentPage = page;
    },
    submitPost(newPost) {
      this.posts.push(newPost);
      this.showDialog = false;
    },
    removePost(id) {
      this.posts = this.posts.filter((post) => post.id !== id);
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        setTimeout(async () => {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _limit: this.postLimit,
                _page: this.currentPage,
              },
            }
          );
          this.posts = response.data;
          this.isPostsLoading = false;
          this.totalPages = Math.ceil(
            response.headers["x-total-count"] / this.postLimit
          );
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    },
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

<template>
  <div class="app">
    <h1>hello</h1>
    <div class="header__btns">
      <my-button @click="showDialog = true">Create post</my-button>
      <my-select :options="select.options" v-model="select.value" />
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
      :activePage="page"
    />
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import Pagination from "@/components/Pagination.vue";
import axios from "axios";
import { reactive, ref, computed, watch } from "vue";
import usePosts from "./../hooks/usePosts";

export default {
  components: {
    PostForm,
    PostList,
    Pagination,
  },
  name: "App",
  setup() {
    const searchValue = ref("");
    const showDialog = ref(false);
    const page = ref(1);

    const select = reactive({
      value: "",
      options: [
        {
          name: "By name",
          value: "title",
        },
        {
          name: "By description",
          value: "body",
        },
      ],
    });

    const { isPostsLoading, postLimit, posts, totalPages } = usePosts(page);

    console.log(isPostsLoading, postLimit, posts, totalPages);

    // const posts = reactive({
    //   posts: [],
    //   loading: false,
    //   limit: 10,
    //   page: 1,
    //   totalPages: 0,
    // });

    const searchedPosts = computed(() => {
      return [...posts].filter((post) =>
        post.title.includes(searchValue.value.toLowerCase())
      );
    });

    // function fetchPosts() {
    //   try {
    //     posts.loading = true;
    //     setTimeout(async () => {
    //       const response = await axios.get(
    //         "https://jsonplaceholder.typicode.com/posts",
    //         {
    //           params: {
    //             _limit: posts.limit,
    //             _page: posts.page,
    //           },
    //         }
    //       );
    //       posts.posts = response.data;
    //       posts.loading = false;
    //       posts.totalPages = Math.ceil(
    //         response.headers["x-total-count"] / posts.limit
    //       );
    //     }, 1000);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }

    // watch(
    //   () => posts.page,
    //   () => {
    //     fetchPosts();
    //   },
    //   {
    //     immediate: true,
    //   }
    // );

    watch(
      () => select.value,
      (newV, prevV) => {
        posts.posts.sort((a, b) => a[newV].localeCompare(b[newV]));
      }
    );

    return {
      page,
      isPostsLoading,
      postLimit,
      posts,
      totalPages,
      select,
      showDialog,
      searchValue,
      searchedPosts,
    };
  },

  methods: {
    selectPage(page) {
      this.posts.page = page;
    },
    submitPost(newPost) {
      this.posts.posts.push(newPost);
      this.showDialog = false;
    },
    removePost(id) {
      this.posts.posts = this.posts.posts.filter((post) => post.id !== id);
    },
  },

  mounted() {
    // this.fetchPosts();
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

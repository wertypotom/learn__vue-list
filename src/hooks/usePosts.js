import { reactive, ref, watch } from "vue";
import axios from "axios";

export default function usePosts(currentPage) {
  // const isPostsLoading = ref(false);
  // const postLimit = ref(10);
  // const posts = ref([]);
  // const totalPages = ref(0);
  const posts = reactive({
    posts: [],
    totalPages: 0,
    postLimit: 10,
    isPostsLoading: false,
  });

  function fetchPosts() {
    try {
      posts.isPostsLoading = true;
      setTimeout(async () => {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _limit: posts.postLimit,
              _page: currentPage,
            },
          }
        );

        posts.posts = response.data;
        posts.isPostsLoading = false;
        posts.totalPages = Math.ceil(
          response.headers["x-total-count"] / posts.postLimit
        );
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }
  // function fetchPosts() {
  //   try {
  //     isPostsLoading.value = true;
  //     setTimeout(async () => {
  //       const response = await axios.get(
  //         "https://jsonplaceholder.typicode.com/posts",
  //         {
  //           params: {
  //             _limit: postLimit.value,
  //             _page: currentPage,
  //           },
  //         }
  //       );

  //       posts.value = response.data;
  //       isPostsLoading.value = false;
  //       totalPages.value = Math.ceil(
  //         response.headers["x-total-count"] / postLimit.value
  //       );
  //     }, 1000);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  watch(currentPage, () => fetchPosts(), { immediate: true });

  return {
    isPostsLoading: posts.isPostsLoading,
    postLimit: posts.postLimit,
    posts: posts.posts,
    totalPages: posts.totalPages,
  };
  // return {
  //   isPostsLoading: isPostsLoading.value,
  //   postLimit: postLimit.value,
  //   posts: posts.value,
  //   totalPages: totalPages.value,
  // };
}

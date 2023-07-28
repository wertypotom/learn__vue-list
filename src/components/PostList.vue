<template>
  <div v-if="posts.length > 0">
    <h3>Posts list:</h3>
    <TransitionGroup name="list">
      <post-item
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @removePost="$emit('removePost', post.id)"
      />
    </TransitionGroup>
  </div>
  <h2 v-else>Empty list...</h2>
</template>

<script>
import PostItem from "./PostItem.vue";
export default {
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  emits: ["removePost"],
  beforeCreate() {
    console.log("before create child");
  },
  created() {
    console.log("created child");
  },
  beforeMount() {
    console.log("beforeMount child");
  },
  mounted() {
    console.log("mounted child");
  },

  beforeUpdate() {
    console.log("beforeUpdate child");
  },
  updated() {
    console.log("updated child");
  },
  beforeUnmount() {
    console.log("beforeUnmount child");
  },
  unmounted() {
    console.log("unmounted child");
  },
};
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>

<template>
  <div class="navbar">
    <h2 @click="$router.push('/')">Vue 3</h2>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Posts</my-button>
      <my-button @click="$router.push('/about')">About</my-button>
    </div>
  </div>
</template>

<script>
import MyButton from "./UI/MyButton.vue";
export default {
  components: { MyButton },
  name: "NavBar",
};
</script>

<style scoped>
h2 {
  cursor: pointer;
  color: teal;
}
.navbar {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: paleturquoise;
}
.navbar__btns {
  display: flex;
  gap: 10px;
}
</style>

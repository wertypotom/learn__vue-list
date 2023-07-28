<template>
  <div class="post">
    <div>
      <div><strong>Id:</strong> {{ post.id }}</div>
      <div><strong>Title:</strong> {{ post.title }}</div>
      <div>
        <strong>Description:</strong>
        {{ post.body }}
      </div>
    </div>

    <div class="post-btns">
      <my-button @click="$emit('removePost')">Remove post</my-button>
      <my-button @click="$router.push(`/posts/${post.id}`)"
        >Open post</my-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "PostItem",
  props: ["post"],
  emits: ["removePost"],
};
</script>

<style scoped>
.post-btns {
  display: flex;
  gap: 10px;
}
.post {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding: 15px;
  border: 2px solid teal;
}
</style>

<template>
  <form @submit.prevent="createPost">
    <h4>Create post</h4>
    <my-input v-focus placeholder="title" v-model.trim="title" />
    <my-input placeholder="body" v-model.trim="body" />

    <my-button
      @click="createPost"
      :style="{
        alignSelf: 'flex-end',
        marginTop: '10px',
      }"
      >Add post</my-button
    >
  </form>
</template>

<script>
export default {
  name: "PostForm",
  data() {
    return {
      title: "",
      body: "",
    };
  },
  methods: {
    createPost() {
      const newPost = {
        id: Date.now(),
        title: this.title,
        body: this.body,
      };

      this.title = "";
      this.body = "";

      this.$emit("submitPost", newPost);
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>

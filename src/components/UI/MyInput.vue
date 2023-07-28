<template>
  <input
    class="input"
    type="text"
    :value="modelValue"
    @input="updateInput"
  />
</template>

<script>
export default {
  name: "MyInput",
  props: ["modelValue"],
  methods: {
    updateInput(event) {
      this.$emit(
        "update:modelValue",
        event.target.value
      );
    },
  },
};
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid teal;
  padding: 15px;
  margin-top: 10px;
}
</style>

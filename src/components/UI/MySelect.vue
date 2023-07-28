<template>
  <select
    :value="modelValue"
    @change="changeValue"
  >
    <option disabled value="">
      Выберите один из вариантов
    </option>

    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "MySelect",
  props: ["modelValue", "options"],
  methods: {
    changeValue(event) {
      this.$emit(
        "update:modelValue",
        event.target.value
      );
    },
  },
};
</script>

<style scoped></style>

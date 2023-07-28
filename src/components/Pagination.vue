<template>
  <div class="pagination__wrapper">
    <div
      class="pagination__btn"
      :class="{ active: activePage === page }"
      v-for="page in pages"
      :key="page"
      @click="selectPage(page)"
    >
      {{ page }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["pages", "activePage"],
  methods: {
    selectPage(page) {
      this.$emit("selectPage", page);
    },
  },
};
</script>

<style scoped>
.pagination__wrapper {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}
.pagination__btn {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  padding: 10px;
  border: 1px solid teal;
}

.active {
  background: paleturquoise;
  font-weight: bold;
}
</style>

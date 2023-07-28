<template>
  <div
    class="dialog"
    v-if="show"
    @click="$emit('update:show', false)"
  >
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialog__content {
  padding: 20px;
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 50px;
  min-height: 100px;
}
</style>

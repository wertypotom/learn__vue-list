<template>
  <NavbarVue />
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import NavbarVue from "./components/Navbar.vue";

export default {
  components: {
    NavbarVue,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}
</style>

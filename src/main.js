import { createApp } from "vue";
import App from "./App.vue";
import components from "./components/UI/index";
import directives from "./directives";
import router from "./router/router";
import store from "./store/store";

const app = createApp(App);

directives.forEach((directive) => app.directive(directive.name, directive));

components.forEach((component) => app.component(component.name, component));

app.use(store).use(router).mount("#app");

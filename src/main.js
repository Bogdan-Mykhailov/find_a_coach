import {createApp, defineAsyncComponent} from 'vue';
import App from "@/App.vue";
import {store} from "@/store/store";
import {router} from "@/pages/router";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseBadge from "@/components/ui/BaseBadge.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";

const BaseDialog = defineAsyncComponent(() => import("@/components/ui/BaseDialog.vue"))

const app = createApp(App);

app
  .component('base-card', BaseCard)
  .component('base-button', BaseButton)
  .component('BaseBadge', BaseBadge)
  .component('BaseSpinner', BaseSpinner)
  .component('base-dialog', BaseDialog)

app.use(store);
app.use(router);

app.mount('#app');

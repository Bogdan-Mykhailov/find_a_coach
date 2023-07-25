import { createStore } from "vuex";
import { coachesModule } from "@/store/coaches";
import { requestsModule } from "@/store/requests";
import { authModule } from "@/store/auth";

export const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
    auth: authModule,
  },
})

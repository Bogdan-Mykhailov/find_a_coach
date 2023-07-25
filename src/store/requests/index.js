import {mutations} from "@/store/requests/mutations";
import {actions} from "@/store/requests/actions";
import {getters} from "@/store/requests/getters";

export const requestsModule = {
  namespaced: true,
  state() {
    return {
      requests: [

      ],
    };
  },
  mutations,
  actions,
  getters,
}

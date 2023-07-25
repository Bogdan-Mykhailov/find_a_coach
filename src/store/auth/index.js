import {actions} from "@/store/auth/actions";
import {getters} from "@/store/auth/getters";
import {mutations} from "@/store/auth/mutations";

export const authModule = {
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: false,
    };
  },
  mutations,
  actions,
  getters,
}

export const mutations = {
  addRequest(state, payload) {
    state.requests.push(payload);
  },

  setRequests(state, payload) {
    state.requests = payload;
  },
};

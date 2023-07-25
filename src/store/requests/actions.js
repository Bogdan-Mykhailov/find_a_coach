import {REQUESTS} from "@/constants";

export const actions = {
  async contactCoach(context, payload) {
    const newRequest = {
      coachId: payload.coachId,
      userEmail: payload.email,
      userMessage: payload.message,
    };

    const response = await fetch(`${REQUESTS}${payload.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest)
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to send request!');
    }

    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId

    context.commit('addRequest', newRequest);
  },

  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const response = await fetch(`${REQUESTS}${coachId}.json?auth=${token}`);

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch request!');
    }

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        userMessage: responseData[key].userMessage,
      }

      requests.push(request);
    }

    context.commit('setRequests', requests)
  }
};

import {COACHES} from "@/constants";

export const actions = {
  async addCoach(context, data) {
    const userId = context.rootGetters.userId;

    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    }

    const token = context.rootGetters.token;

    const response = await fetch(`${COACHES}${userId}.json?auth=${token}`, {
      method: 'PUT',
      body: JSON.stringify(coachData),
    });

    // const responseData = await response.json();
    //
    if (!response.ok) {
      // throw new Error(responseData.message || 'Failed to send request!');
    }

    context.commit('addCoach', {
      id: userId,
      ...coachData,
    });
  },

  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(`${COACHES}.json`);

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch!');
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      }

      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp')
  }
};

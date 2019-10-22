import Services from '@/services/services';
import moment from 'moment';

export const thisSundayModule = {
  namespaced: true,
  state: {
    services: [],
    loading: true,
  },
  mutations: {
    setServices (state, payload) {
      state.services = payload.services.map(service => {
        service.dateTitle = moment(service.date, 'YYYY-MM-DD').format('dddd, MMMM Do');
        return service;
      });
    },
    setLoading (state, loading) {
      state.loading = loading;
    }
  },
  actions: {
    async getServices ({ state, commit }) {
      commit('setLoading', true);
      const getServicesRes = await Services.getServices();
      commit('setServices', {services: getServicesRes.data.services});
      commit('setLoading', false);
    }
  }
}
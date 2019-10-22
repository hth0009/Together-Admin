import Services from '@/services/services';
import moment from 'moment';

export const thisSundayModule = {
  namespaced: true,
  state: {
    services: [],
    loading: true,
    creatingNewItem: false,
    newService: {},
  },
  mutations: {
    setServices (state, payload) {
      state.services = payload.services.map(service => {
        service.dateTitle = moment(service.date, 'YYYY-MM-DD').format('dddd, MMMM Do');
        return service;
      });
    },
    setLoading (state, loading) { state.loading = loading; },
    setCreatingNewItem (state, creatingNewItem) { state.creatingNewItem = creatingNewItem; },
    setNewService (state, newService) { state.newService = newService; },
    addTimeToNewService(state) {
      state.newService.serviceTimes.push({ time: "12:00:00" });
    },
    deleteTimeFromNewService(state, index) {
      state.newService.serviceTimes.splice(index, 1);
    },
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
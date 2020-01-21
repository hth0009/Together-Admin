import People from '@/services/people';

export const PeopleModule = {
  namespaced: true,
  state: {
    people: [],
    person: {},
    loading: true
  },
  mutations: {
    setPeople (state, payload) { state.people = payload.people; },
    setPerson (state, person) { state.person = {...person}; },
    setLoading (state, loading) { state.loading = loading; },
  },
  actions: {
    async getPeople ({state, commit}, getCurrentStateIfAlreadyThere=false) {
      if(getCurrentStateIfAlreadyThere && state.people.length !== 0) { return state.people; }
      commit('setLoading', true);
      const getPeopleRes = await People.getPeople();
      commit('setPeople', { people: getPeopleRes.data.people });
      commit('setLoading', false);
    },
    async getPerson ({commit}, personID) {
      const getPersonRes = await People.getPerson(personID);
      commit('setPerson', { people: getPersonRes.data.people[0] });
    }
  }
}
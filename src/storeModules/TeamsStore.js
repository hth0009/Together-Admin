import Teams from '@/services/teams';

export const TeamsModule = {
  namespaced: true,
  state: {
    teams: [],
    loading: true,
    creatingNewItem: false,
  },
  mutations: {
    setTeams (state, payload) { 
      state.teams = payload.teams; 
    },
    setLoading (state, loading) { state.loading = loading; },
    setCreatingNewItem (state, creatingNewItem) { state.creatingNewItem = creatingNewItem; },
    removeNewTeamPlaceholderInCardList (state) { state.teams.pop(); }
  },
  actions: {
    async getTeams ({ state, commit }) {
      commit('setLoading', true);
      const getTeamsByChurchRes = await Teams.getTeamsByChurch();
      commit('setTeams', { teams: getTeamsByChurchRes.data.teams });
      commit('setLoading', false);
    }
  }
}
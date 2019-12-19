export const GivingModule = {
  namespaced: true,
  state: {
    loading: true,
    showManualEntry: false,
    showCreateFund: false,
  },
  mutations: {
    setLoading (state, loading) { state.loading = loading; },
    setShowManualEntry (state, showManualEntry) { 
      state.showManualEntry = showManualEntry; 
      state.showCreateFund = false;
    },
    setShowCreateFund (state, showCreateFund) { 
      state.showCreateFund = showCreateFund; 
      state.showManualEntry = false; 
    },
  },
  actions: {
  },
}
export const GivingModule = {
  namespaced: true,
  state: {
    loading: true,
    showCollapsedTableView: false,
    showManualEntry: false,
    showCreateFund: false,
  },
  mutations: {
    setLoading (state, loading) { state.loading = loading; },
    setShowManualEntry (state, showManualEntry) { 
      state.showCollapsedTableView = showManualEntry;
      state.showManualEntry = showManualEntry; 
      state.showCreateFund = false;
    },
    setShowCreateFund (state, showCreateFund) { 
      state.showCollapsedTableView = showCreateFund;
      state.showCreateFund = showCreateFund; 
      state.showManualEntry = false; 
    },
  },
  actions: {
  },
}
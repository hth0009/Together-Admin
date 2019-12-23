export const GivingModule = {
  namespaced: true,
  state: {
    loading: true,
    showCollapsedTableView: false,
    showManualEntry: false,
    showCreateFund: false,
    showCreateReport: false,
  },
  mutations: {
    setLoading (state, loading) { state.loading = loading; },
    setShowManualEntry (state, showManualEntry) { 
      state.showCollapsedTableView = showManualEntry;
      state.showManualEntry = showManualEntry; 
      state.showCreateFund = false;
      state.showCreateReport = false;
    },
    setShowCreateFund (state, showCreateFund) { 
      state.showCollapsedTableView = showCreateFund;
      state.showCreateFund = showCreateFund; 
      state.showManualEntry = false; 
      state.showCreateReport = false; 
    },
    setShowCreateReport (state, showCreateReport) { 
      state.showCollapsedTableView = showCreateReport;
      state.showCreateReport = showCreateReport; 
      state.showManualEntry = false; 
      state.showCreateFund = false;
    },
  },
  actions: {
  },
}
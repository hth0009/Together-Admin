export const GivingModule = {
  namespaced: true,
  state: {
    loading: true,
    showCollapsedTableView: false,
    showManualEntry: false,
    showCreateFund: false,
    showCreateReport: false,
    showPersonSummary: false,
    selectedPerson: {},
  },
  mutations: {
    setLoading (state, loading) { state.loading = loading; },
    setShowManualEntry (state, showManualEntry) { 
      state.showCollapsedTableView = showManualEntry;
      state.showManualEntry = showManualEntry; 
      state.showCreateFund = false;
      state.showCreateReport = false;
      state.showPersonSummary = false;
    },
    setShowCreateFund (state, showCreateFund) { 
      state.showCollapsedTableView = showCreateFund;
      state.showCreateFund = showCreateFund; 
      state.showManualEntry = false; 
      state.showCreateReport = false; 
      state.showPersonSummary = false;
    },
    setShowCreateReport (state, showCreateReport) { 
      state.showCollapsedTableView = showCreateReport;
      state.showCreateReport = showCreateReport; 
      state.showManualEntry = false; 
      state.showCreateFund = false;
      state.showPersonSummary = false;
    },
    setShowPersonSummary (state, showPersonSummary) {
      state.showCollapsedTableView = showPersonSummary;
      state.showPersonSummary = showPersonSummary
      state.showCreateFund = false;
      state.showManualEntry = false; 
      state.showCreateReport = false; 
    },
    showFullTableView (state) {
      state.showCollapsedTableView = false; 
      state.showManualEntry = false; 
      state.showCreateFund = false;
      state.showCreateReport = false; 
      state.showPersonSummary = false;
    },
    setSelectedPerson (state, selectedPerson) {
      state.selectedPerson = selectedPerson;
    }
  },
  actions: {
  },
}
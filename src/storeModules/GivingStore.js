export const GivingModule = {
  namespaced: true,
  state: {
    loading: true,
    showCollapsedTableView: false,
  },
  mutations: {
    setLoading (state, loading) { state.loading = loading; },
    setShowCollapsedTableView (state, showCollapsedTableView) { state.showCollapsedTableView = showCollapsedTableView; },
  },
  actions: {
  },
}
import Messages from '@/services/messages';
import Threads from '@/services/threads';

export const MessagesModule = {
  namespaced: true,
  state: {
    threads: [],
    selectedThread: {},
    loading: true,
    threadLoading: false,
    creatingNewItem: false,
  },
  mutations: {
    setThreads (state, payload) { 
      state.threads = payload.threads; 
    },
    setThread (state, payload) { 
      state.selectedThread = payload.thread; 
    },
    setSelectedThread (state, payload) { 
      state.thread = payload.thread; 
    },
    setLoading (state, loading) { state.loading = loading; },
    setThreadLoading (state, loading) { state.threadLoading = loading; },
    setCreatingNewItem (state, creatingNewItem) { state.creatingNewItem = creatingNewItem; },
  },
  actions: {
    async getThreads ({ state, commit }) {
      commit('setLoading', true);
      const getThreadsByPersonRes = await Threads.getThreads();
      commit('setThreads', { threads: getThreadsByPersonRes.data.messagethreads });
      commit('setLoading', false);
    },
    async getSelectedThread ({ state, commit },{ threadID }) {
      commit('setThreadLoading', true);
      const getThreadRes = await Threads.getThreadByID(threadID);
      commit('setThread', { thread: getThreadRes.data.messagethreads[0] });
      commit('setThreadLoading', false);
    }
  }
}
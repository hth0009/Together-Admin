import Messages from '@/services/messages';
import Threads from '@/services/threads';
import Amplify, { Auth, PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';

export const MessagesModule = {
  namespaced: true,
  state: {
    threads: [],
    selectedThread: {},
    loading: true,
    threadLoading: false,
    creatingNewItem: false,
    currentSubscription: undefined,
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
    setCurrentSubscription (state, payload) { 
      state.currentSubscription = payload; 
    },
    appendSelectedThread (state, payload) { 
      state.selectedThread.messages.unshift(payload); 
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

      const topics = state.threads.map(x => {
        return `message_threads/${x.id}`
      });

      console.log(topics)

      if (state.currentSubscription != undefined) {
        state.currentSubscription.unsubscribe()
      }

      
      // Subscribe to mqtt topic
      const sub = PubSub.subscribe(topics).subscribe({
        next: data => {
          if (data.value.message.threadID == state.selectedThread.id) {
            commit('appendSelectedThread', data.value.message)
          }
        },
        error: error => console.error(error),
        close: () => console.log('Done')
      });
      
      commit('setCurrentSubscription', sub)
    },
    async getSelectedThread ({ state, commit },{ threadID }) {
      commit('setThreadLoading', true);
      const getThreadRes = await Threads.getThreadByID(threadID);
      commit('setThread', { thread: getThreadRes.data.messagethreads[0] });
      commit('setThreadLoading', false);
    }
  }
}
import Api from './api'
// import store from '../store'

export default {
  getPeople () {
    return Api().get('people',
      {
        params: {
          inChurch: 'NPCChurch3',
          pagesize: 50,
          page: 0,
          relateTo: -1
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      console.error(e)
    })
  },
  getPerson (id) {
    return Api().get('people',
      {
        params: {
          id: `${id}`,
          relateTo: -1
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      console.error(e)
    })
  }
}

import Api from './api'
import store from '../store'

export default {
  getChurch (churchUsername = store.state.churchUsername) {
    return Api().get('churches', {
      params: {
        username: `${churchUsername}`,
      }
    })
  },
  patchChurch (churchInfo) {
    return Api().patch('churches', churchInfo)
  },
  postChurch (name, username, nickname, statementOfFaith, description, vision, churchImageURL, churchImageThumbnailURL) {
    return Api().post('churches', {
      name: `${name}`,
      username: `${username}`,
      nickname: `${nickname}`,
      statementOfFaith: `${statementOfFaith}`,
      description: `${description}`,
      vision: `${vision}`,
      churchImageURL: `${churchImageURL}`,
      churchImageThumbnailURL: `${churchImageThumbnailURL}`
    })
  }
}

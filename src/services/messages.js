import API from './api'

export default async function getMessages(threadID) {
  return await API().get('messages', {
    params: {
      threadID: `${threadID}`
    }
  })
}
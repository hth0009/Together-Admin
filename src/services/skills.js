import Api from './api'

export default {
  patchSkill (skillID, isConfirmed) {
    return Api().patch('peopleskills', {
      "identifier": {
          "id": `${skillID}`
      },
      "values": {
          "confirmed": isConfirmed
      }
    })
  }
}

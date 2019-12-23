import Api from './api'

export default {
  getAccountsChurch (accountID) {
    return Api().get('accountschurches',
      {
        params: {
          accountID: `${accountID}`,
        }
      })
  },
  patchAccountChurch (serviceID, values) {
    return Api().patch('services', {
      identifier: { id: serviceID },
      values: values
    });
  },
}

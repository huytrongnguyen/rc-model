import Xhr from './../ajax/xhr'

export const MutationType = {
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
};

class Store {
  constructor() {
    this.BASE_URL = ''
  }

  fetch(endpoint, params) {
    return Xhr.ajax(this.getRelativeUrl(endpoint), 'get', params)
  }

  mutate(endpoint, method, params) {
    return Xhr.ajax(this.getRelativeUrl(endpoint), method, params)
  }

  getRelativeUrl(endpoint) {
    return this.BASE_URL === '' ? endpoint : `${this.BASE_URL}/${endpoint}`
  }
}

export default new Store
import String from './../core/string'

export const MutationType = {
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
};

class Xhr {
  constructor() {
    this.BASE_URL = null
    this.xhr = new XMLHttpRequest()
    this.ajaxBefore = () => { /* to be implemented */ }
    this.ajaxError = (error) => { /* to be implemented */ }
    this.ajaxComplete = () => { /* to be implemented */ }
  }

  async ajax({ url, method = 'GET', record, next, error, complete }) {
    try {
      this.ajaxBefore()
      const response = await this.promise({ url, method, record })
      next && next(response)
    } catch (e) {
      this.ajaxError(e)
      error && error(e)
    } finally {
      this.ajaxComplete()
      complete && complete()
    }
  }

  promise(settings) {
    return new Promise((resolve, reject) => {
      this.request(settings, (err, res) => {
        if (err) {
          reject(err)
          return
        }
        resolve(res)
      })
    })
  }

  request({ url, method, record }, done) {
    if (this.BASE_URL) {
      url = `${this.BASE_URL}/${url}`
    }
    if (method === 'get' && record !== null) {
      url = `${url}?${String.toQueryString(record)}`
    }
    const xhr = this.xhr
    xhr.open(method, url, true)
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
    xhr.onreadystatechange = () => {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          done(null, JSON.parse(xhr.responseText))
        } else {
          try {
            done(JSON.parse(xhr.responseText))
          } catch (e) {
            done(xhr.responseText)
          }
        }
      }
    }
    xhr.send(record !== null ? JSON.stringify(record) : null)
  }
}

export default new Xhr
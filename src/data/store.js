import React, { Component } from 'react'
import Xhr from './../ajax/xhr'
import Map from './map'

const store = (config) => (WrappedComponent) => class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      store: {
        data: null
      }
    }
  }

  componentWillMount() {
    const { store } = this.props
    Map.of(config.mutations).each((name, mutator) => {
      relay[name] = options => this.commitUpdate(mutator, options)
    })
  }

  async componentDidMount() {
    let { endpoint } = config
    if (!endpoint) {
      return
    }
    const params = endpoint.initialVariables ? endpoint.initialVariables() : null
    endpoint = endpoint.name || endpoint
    const response = await Xhr.ajax(this.getRelativeUrl(endpoint), 'GET', params)
    const { done, fail } = config
    if (response) {

      store.data = done ? done(response) : response
      this.setState(() => ({ store }))
    } else if (fail) {
      fail()
    }
  }

  async commitUpdate(mutator, options) {
    const endpoint = options.path || mutator.path
    const response = await Xhr.ajax(endpoint, mutator.type, options.record)
    const { done, fail } = options
    if (response && done) {
      done(response)
    } else if (fail) {
      fail()
    }
  }

  render() {
    const { data } = this.state;
    return <WrappedComponent {...this.props} store={store} />
  }
}

export default store
import React, { Component } from 'react'
import Store from './../data/store'

export default class LazyContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.createQuerySet()
  }

  componentDidMount() {
    this.fetchData()
  }

  createQuerySet() {
    this.props.lazy = {}
    const { mutations, lazy } = this.props
    if (mutations) {
      for (let mutationName in mutations) {
        lazy[mutationName] = options => this.commitUpdate(mutations[mutationName], options)
      }
    }
  }

  async commitUpdate(mutator, options) {
    const endpoint = options.path || mutator.path
    const response = await Store.mutate(endpoint, mutator.type, options.record)
    if (response && options.success) {
      options.success(response)
    } else if (options.failure) {
      options.failure()
    }
  }

  async fetchData() {
    if (!this.props.endpoint) {
      return;
    }
    let endpoint = this.props.endpoint
    const params = endpoint.initialVariables ? endpoint.initialVariables() : null
    endpoint = endpoint.name || endpoint
    let response = await Store.fetch(endpoint, params)
    if (this.props.resolve) {
      response = this.props.resolve(response)
    }
    this.setState(() => (response))
  }
}
import React, { Component } from 'react';
import Map from './../core/map';
import Xhr from './../ajax/xhr';

const store = (config) => (WrappedComponent) => class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: {
        data: null
      }
    };
  }

  componentWillMount() {
    const { store } = this.state;
    Map.of(config.mutations).each((name, mutator) => {
      store[name] = options => this.commitUpdate(mutator, options);
    });
  }

  componentDidMount() {
    let { endpoint } = config;
    if (!endpoint) {
      return;
    }
    const record = endpoint.initialVariables ? endpoint.initialVariables() : null;
    endpoint = endpoint.name || endpoint;
    Xhr.ajax({
      url: endpoint,
      record,
      next: response => {
        const { next } = config,
            { store } = this.state;
        store.data = next ? next(response) : response;
        this.setState(() => ({ store }));
      }
    });
  }

  commitUpdate(mutator, options) {
    const endpoint = options.path || mutator.path;
    Xhr.ajax({
      url: endpoint,
      method: mutator.type,
      record: options.record,
      next: options.next,
      error: options.error,
      complete: options.complete
    })
  }

  render() {
    const { store } = this.state;
    return <WrappedComponent {...this.props} store={store} />;
  }
}

export default store;
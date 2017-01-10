import Store from './../data/store'

const dataContainer = (config) => {
  return (target) => {
    target.prototype.componentWillMount = function() {
      this.props.lazy = {}
      const { mutations } = config
      if (mutations) {
        const { lazy } = this.props
        for (const mutationName in mutations) {
          lazy[mutationName] = options => this.commitUpdate(mutations[mutationName], options)
        }
      }
    }

    target.prototype.componentDidMount = async function() {
      let { endpoint } = config
      if (!endpoint) {
        return;
      }
      const params = endpoint.initialVariables ? endpoint.initialVariables() : null
      endpoint = endpoint.name || endpoint
      let response = await Store.fetch(endpoint, params)
      const { resolve } = config
      if (resolve) {
        response = resolve(response)
      }
      this.setState(() => (response))
    }

    target.prototype.commitUpdate = async (mutator, options) => {
      const endpoint = options.path || mutator.path
      const response = await Store.mutate(endpoint, mutator.type, options.record)
      if (response && options.success) {
        options.success(response)
      } else if (options.failure) {
        options.failure()
      }
    }
  }
}

export default dataContainer
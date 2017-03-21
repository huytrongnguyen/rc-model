# React Model

[![npm version](http://img.shields.io/npm/v/rc-model.svg?style=flat-square)](http://npmjs.org/package/rc-model)
[![Travis build status](https://travis-ci.org/huytrongnguyen/rc-model.svg)](https://travis-ci.org/huytrongnguyen/rc-model)
[![npm download](https://img.shields.io/npm/dm/rc-model.svg?style=flat-square)](https://npmjs.org/package/rc-model)
[![npm license](https://img.shields.io/npm/l/rc-model.svg)](https://npmjs.org/package/rc-model)

A JAVASCRIPT LIBRARY FOR BUILDING DATA-DRIVEN REACT APPLICATIONS

As we know, React has no networking/AJAX features. And you can see in this article: [http://andrewhfarmer.com/react-ajax-best-practices/](http://andrewhfarmer.com/react-ajax-best-practices/), we have many approach to make an AJAX request in React app.

I like Relay, especially [Higher-Order Components](https://facebook.github.io/react/docs/higher-order-components.html) pattern but it only works with GraphQL. Then I make a small library based on Relay concept and it works with RESTful backends.

## Installation

You'll need both React and React Model:

[![rc-lazy](https://nodei.co/npm/rc-model.png?downloadRank=true&downloads=true)](https://npmjs.org/package/rc-model)

## Containers

Create a React component with store decorator:

```javascript
import React, { Component } from 'react'
import { Xhr, MutationType, store } from 'rc-model'

Xhr.BASE_URL = '/api'

@store({
  endpoint: 'system'
})
class MyComponent extends Component {
  render() {
    const { TestData } = this.props.store.data
    return <div>
      <p>{JSON.stringify(TestData)}</p>
    </div>;
  }
}

export default MyComponent
```

You can setup network layer throught Xhr.BASE_URL. In this case, when you setup ```Xhr.BASE_URL = '/api'```, every AJAX requests will call to ```http://<IP Server>:<Port>/api/```

You need to setup the endpoint to make an AJAX request to ```http://<IP Server>:<Port>/api/<endpoint>``` throught ```store``` decorator:

```javascript
@store({
  endpoint: 'system'
})
```

The response data will be pushed to ```this.props.store.data```.

In case you want to add some query params, just change the endpoint fragment:

```javascript
@store({
  endpoint: {
    name: 'system',
    initialVariables: () => {
      return {
        page: 1,
        size: 20
      }
    }
  }
})
```

If you want to do something with the response data before it's pushed to props, just add the ```done``` function like below:

```javascript
@store({
  endpoint: 'system',
  done: response => {
    // Do something with response before return
    return response
  }
})
```

## Mutations

Add mutations fragment into dataContainer decorator, type can be MutationType.POST, MutationType.PUT, MutationType.DELETE.

```javascript
@store({
  endpoint: 'system',
  mutations: {
    login: {
      type: MutationType.POST,
      path: 'security/login'
    }
  }
})
```

As you can see from above, we add ```login``` to mutations fragment as a POST request and it will call to ```http://<IP Server>:<Port>/api/security/login```
Then you can call ```login``` as a function and add the ```record```, ```done``` and ```fail``` function like this:
Here's an example of this mutation in use:

```javascript
  handleLogin() {
    this.props.store.login({
      record: {
        Id: "my_id",
        Password: "my_password"
      },
      done: response => {
        console.log(response)
      },
      fail: () => {
        console.error('Error!!!')
      }
    })
  }
```

We pass an object as a parameter into login function with the format:

```javascript
{
  record:  { ... }, // data to be sent to the server
  done: response => { ... }, // a function to be called if the request succeeds.
  fail: response => { ... } // a function to be called if the request fails.
}
```

## Handle when Ajax complete

You can register a handler to be called when Ajax requests complete (with an error):

```javascript
import { Xhr } from 'rc-model'

Xhr.ajaxComplete = () => {
  console.log('Ajax Complete')
}

Xhr.ajaxError = (error) => {
  console.log('Ajax Error!!!')
}
```

## License

rc-model is released under the MIT license.
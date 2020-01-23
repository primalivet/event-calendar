// https://github.com/zeit/next.js/blob/master/examples/with-apollo/

import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import unfetch from 'isomorphic-unfetch'

let apolloClient = null

function create (initialState) {
  const isBrowser = typeof window !== 'undefined'
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: new HttpLink({
      uri: 'http://localhost:4000/',
      credentials: 'same-origin',
      fetch: !isBrowser && unfetch
    }),
    cache: new InMemoryCache().restore(initialState || {})
  })
}

export default function initApollo (initialState) {
  if (typeof window === 'undefined') {
    return create(initialState)
  }

  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}

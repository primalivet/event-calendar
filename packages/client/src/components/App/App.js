import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import { Events } from '../'

const client = new ApolloClient({ uri: 'http://localhost:4000' })

function App() {
  return (
    <ApolloProvider client={client}>
      <Events />
    </ApolloProvider>
  );
}

export default App;

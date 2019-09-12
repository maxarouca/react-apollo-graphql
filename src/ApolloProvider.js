import React from 'react'
import AppRouter from './routes';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

// import ApolloClient from 'apollo-client'
// import {InMemoryCache} from 'apollo-cache-inmemory'
// import { createHttpLink } from 'apollo-link-http'


const client = new ApolloClient({
  uri: 'https://bahnql.herokuapp.com/graphql',
});


// const httpLink = createHttpLink({
//   url: 'https://bahnql.herokuapp.com/graphql'
// })

// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache()
// })

export default (
  <ApolloProvider client={client}>
    <AppRouter />
  </ApolloProvider>
)
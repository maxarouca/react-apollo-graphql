import React from 'react';
import { render } from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppRouter from './routes';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://cors-anywhere.herokuapp.com/https://bahnql.herokuapp.com/graphql',
});

const App = () => (
  <ApolloProvider client={client}>
    <CssBaseline />
    <AppRouter />
  </ApolloProvider>
);

render(<App />, document.getElementById('root'));

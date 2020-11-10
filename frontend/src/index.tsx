import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import App from './App';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://127.0.0.1:8000/graphql'
  })
});

window.addEventListener('storage', e => console.log('e'));

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// graphiql.graphcms.com/simple/v1/swapi
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from './App';
import * as serviceWorker from './serviceWorker';
import jwt from "jsonwebtoken";
import { gql } from '@apollo/client';

const CURRENT_USER = gql`{
  currentUser {
    id,
    username,
    email
  }
}`;

const link = new HttpLink({
  uri: 'http://127.0.0.1:8000/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('auth_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
  connectToDevTools: true
});

window.addEventListener('storage', e => {
  if (e.key === 'auth_token') {
    if (e.newValue) {
      jwt.verify(e.newValue, "myTestKey!noiceone", (err: any, decoded: any) => {
        if (err) {
          console.log(err);
        } else {
          client.writeQuery({
            query: CURRENT_USER,
            data: {currentUser: [{id: decoded.id, username: decoded.username, email: decoded.email}]}
          });
        }
      });
    } else {
      client.writeQuery({
        query: CURRENT_USER,
        data: {currentUser: null}
      });
    }

  }
});

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
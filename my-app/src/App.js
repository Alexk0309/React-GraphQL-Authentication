import React from 'react';
import './App.css';
import Form from './Components/Form'
import Login from './Components/Login'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; // Switch -> Routes
import User from './Components/User'
import PrivateRoute  from './Components/PrivateRoute.js';
import Auth from './Components/Auth';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client"; 

import {onError} from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError}) => {
  if(graphQLErrors) {
    Auth.setAuth(false)
    return
  }
  else {
    Auth.setAuth(true)
    return
  }
  
});

const link = from ([
  errorLink,
  new HttpLink({ uri: "https://graph-api-test.webby.asia/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
})

const isAuth = () => {
  return Auth.isAuthenticated()
}

function App () {
    
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Routes>
            <Route element={<PrivateRoute isAuth={isAuth}/>}>
              <Route element={<User/>} path='/user' />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Form/>} />
          </Routes>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;

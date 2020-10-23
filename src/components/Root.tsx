import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '../assets/styles/main.scss';

import Home from './Home';
import Joke from './Jokes/Joke';
import NewJoke from './Jokes/NewJoke';
import Layout from './Layout';

const Root = () => (
  <Layout title='Joke Reader'>
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/jokes/add' component={NewJoke} />
        <Route path='/jokes/:id/edit' component={NewJoke} />
        <Route path='/jokes/:id/play' component={Joke} />
        <Route path='/jokes/:id' component={Joke} />
      </Switch>
    </Router>
  </Layout>
);

export default Root;

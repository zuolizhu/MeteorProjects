import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';

import Signup from '../ui/Signup';
import Login from '../ui/Login';
import NotFound from '../ui/NotFound';

import Dashboard from '../ui/Dashboard';

const onEnterNotePage = (nextState) => {
  Session.set('selectedNoteId', nextState.params.id);
};

const onLeaveNotePage = () => {
  Session.set('selectedNoteId', undefined);
};

export const onAuthChange = (isAutheticated, currentPagePrivacy) => {
  // true if currentPagePrivacy's privacy is 'unauth'
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
  // true if currentPagePrivacy's privacy is 'auth'
  const isAuthenticatedPage = currentPagePrivacy === 'auth';

  // If on unauthenticated page and logged in, redirect to /links
  if(isUnauthenticatedPage && isAutheticated) {
    browserHistory.replace('/dashboard');
  }
  // If on authenticated page and not logged in, redirect to /
  else if(isAuthenticatedPage && !isAutheticated) {
    browserHistory.replace('/');
  }
};

export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};
export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
};


export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route exact path="/" component={Login} privacy="unauth"/>
      <Route exact path="/login" component={Login} privacy="unauth"/>
      <Route exact path="/signup" component={Signup} privacy="unauth"/>
      <Route exact path="/dashboard" component={Dashboard} privacy="auth"/>
      <Route exact path="/dashboard/:id" component={Dashboard} privacy="auth" onEnter={onEnterNotePage} onLeave={onLeaveNotePage}/>
      <Route exact path="*" component={NotFound}/>
    </Route>
  </Router>
);

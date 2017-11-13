import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from '../ui/Signup';
import Login from '../ui/Login';
import NotFound from '../ui/NotFound';

import Dashboard from '../ui/Dashboard';

const unauthenticatedPages = ['/', '/signup'];
const autheticatedPages = ['/dashboard'];

// if user logged in, user wont be able to back to login page use browser back
const onEnterPulicPage = () => {
  if(Meteor.userId()) {
    browserHistory.replace('/dashboard');
  }
};
// if user is not logged in
const onEnterPrivatePage = () => {
  if(!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

export const onAuthChange = (isAutheticated) => {
  //Track user's page
  const pathname = browserHistory.getCurrentLocation().pathname;
  // true if pathname is in unauthenticatedPages array
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  // true if pathname is in autheticatedPages array
  const isAuthenticatedPage = autheticatedPages.includes(pathname);

  // If on unauthenticated page and logged in, redirect to /links
  if(isUnauthenticatedPage && isAutheticated) {
    browserHistory.replace('/dashboard');
  }
  // If on authenticated page and not logged in, redirect to /
  else if(isAuthenticatedPage && !isAutheticated) {
    browserHistory.replace('/');
  }
};

export const routes = (
  <Router history={browserHistory}>
    <Route exact path="/" component={Login} onEnter={onEnterPulicPage}/>
    <Route exact path="/login" component={Login} onEnter={onEnterPulicPage}/>
    <Route exact path="/signup" component={Signup} onEnter={onEnterPulicPage}/>
    <Route exact path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>

    <Route exact path="*" component={NotFound}/>
  </Router>
);

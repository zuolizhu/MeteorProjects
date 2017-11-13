import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';


import {routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simpl-schema-configuration.js';


Tracker.autorun(() => {
  // if Meteor.userId is null, !!null will be false
  const isAutheticated = !!Meteor.userId();
  // call Authetication function from routes component
  onAuthChange(isAutheticated);
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});

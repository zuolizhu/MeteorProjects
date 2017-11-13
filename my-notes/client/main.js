import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { browserHistory } from 'react-router';


import {routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simpl-schema-configuration.js';


Tracker.autorun(() => {
  // if Meteor.userId is null, !!null will be false
  const isAutheticated = !!Meteor.userId();
  // fetch session value
  const currentPagePrivacy = Session.get('currentPagePrivacy');
  // call Authetication function from routes component
  onAuthChange(isAutheticated, currentPagePrivacy);
});

// When selectedId changes, update the url
Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  Session.set('isNavOpen', false);

  if(selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`)
  }
});


Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen');
  document.body.classList.toggle('is-nav-open', isNavOpen);
});


Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  Session.set('isNavOpen', false);
  ReactDOM.render(routes, document.getElementById('app'));
});

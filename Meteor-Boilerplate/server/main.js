import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
//execute the users.js file in api folder
import '../imports/api/users';
//Customized Error message that is Thrown
import '../imports/startup/simpl-schema-configuration.js';

Meteor.startup(() => {

});

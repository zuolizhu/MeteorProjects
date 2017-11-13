import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
//execute the users.js file in api folder
import '../imports/api/users';

import { Links } from '../imports/api/link';

//Customized Error message that is Thrown
import '../imports/startup/simpl-schema-configuration.js';

Meteor.startup(() => {
  //use middleware to redirecting user
  WebApp.connectHandlers.use((req, res, next) => {
    //take the url and cutout the link from user request in browser tab
    const _id = req.url.slice(1);
    //Then search link with the corresponding id in the db
    //return false if nothing found
    const link = Links.findOne({ _id });

    if(link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
  });
});

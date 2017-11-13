import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

//create a collection for notes
export const Notes = new Mongo.Collection('notes');

if (Meteor.isServer) {
  Meteor.publish('notesPublishFunction', function() {
    return Notes.find({ userId: this.userId });
  });
}

Meteor.methods({
  'notes.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Notes.insert({
      title: '',
      body: '',
      userId: this.userId,
      updatedAt: moment().valueOf()
    });
  },
  'notes.remove'(_id) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });
    //check userId to prevent other user delete data
    Notes.remove({ _id, userId: this.userId });
  },
  'notes.update'(_id, updates) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      title: {
        type: String,
        optional: true
      },
      body: {
        type: String,
        optional: true
      }
    }).validate({
      _id,
      ...updates
    });
    Notes.update({
      _id,
      userId: this.userId
    }, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    });
  }
});

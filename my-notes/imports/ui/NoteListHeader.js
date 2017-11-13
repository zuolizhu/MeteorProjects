import React from 'react';
import PropTypes from 'prop-types';
import { Notes } from '../api/notes';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export const NoteListHeader = (props) => {

  return (
    <div className="item-list__header">
      <button className="button" onClick={() => {
        props.meteorCall('notes.insert', (err, res) => {
          if (res) {
            props.Session.set('selectedNoteId', res);
          }
        });


      }}>Add new note</button>
    </div>
  );
};



NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired
};




export default createContainer(() => {
  return {
    meteorCall: Meteor.call,
    Session
  };
}, NoteListHeader);

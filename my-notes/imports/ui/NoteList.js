import React from 'react';
import PropTypes from 'prop-types';
import { Notes } from '../api/notes';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';

import NoteListEmptyItem from './NoteListEmptyItem';


export const NoteList = (props) => {

  return (
    <div className="item-list">
      <NoteListHeader/>

      { props.notes.length === 0 ? <NoteListEmptyItem/> : undefined }

      {props.notes.map((note) => {
        return <NoteListItem key={ note._id } note= {note} />
      })}
    </div>
  );
};



NoteList.propTypes = {
  notes: PropTypes.array.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  Meteor.subscribe('notesPublishFunction');

  //fecthing data from db
  //Take notes add selected property to object
  //Set to true if match
  //sort notes by date
  return{
    notes: Notes.find({}, {
      sort: {
        updatedAt: -1
      }
    }).fetch().map((note) => {
      return {
        ...note,
        selected: note._id === selectedNoteId
      };
    })
  };

}, NoteList);

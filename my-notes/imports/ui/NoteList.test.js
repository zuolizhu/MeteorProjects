import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';
import expect from 'expect';
import React from 'react';

import { NoteList } from './NoteList';

//import test data
import { notes } from '../fixtures/fixtures';


if(Meteor.isClient) {
  describe('NoteList Test Block', function () {
    it('render NoteListItem for each note', function () {
      const wrapper = mount(<NoteList notes={notes}/>);
      //find react component
      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
    });

    it('render NoteListEmptyItem if zero notes', function () {
      //check to see whats happen if there is no notes
      const wrapper = mount(<NoteList notes={[]}/>);
      //find react component
      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
    });

  });
}

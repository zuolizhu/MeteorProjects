import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

//import test data
import { notes } from '../fixtures/fixtures';

import { NoteListItem } from './NoteListItem';



if(Meteor.isClient) {
  describe('NoteListItem Test Block', function() {
    let Session;
    beforeEach(() => {
      Session = {
        set: expect.createSpy()
      };
    });

    it('render title and timestamp', function() {
      const wrapper = mount( <NoteListItem note={notes[0]} Session={Session}/> );

      expect(wrapper.find('h5').text()).toBe(notes[0].title);
      expect(wrapper.find('p').text()).toBe('7/08/17');
    });

    it('set default title if no title set', function () {
      const wrapper = mount( <NoteListItem note={notes[1]} Session={Session}/> );
      //h5 should be "untitle note" inteade of emptyTitle
      expect(wrapper.find('h5').text()).toBe('Untitle note');
    });

    it('call set on click', function () {
      //render NoteListItem using
      const wrapper = mount( <NoteListItem note={notes[0]} Session={Session}/> );
      //find div and simulate the click
      wrapper.find('div').simulate('click');
      //Expect Session.set to have been called with some arguments.
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
    });


  });
}

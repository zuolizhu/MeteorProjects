import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import { NoteListHeader } from './NoteListHeader';
import { notes } from '../fixtures/fixtures';

if(Meteor.isClient) {
  describe('NoteListHeader Test Block', function() {
    let meteorCall;
    let Session;

    beforeEach(function () {
      meteorCall = expect.createSpy();
      Session ={
        set: expect.createSpy()
      }
    });

    it('call meteorCall on click', function() {
      //Render component with spy
      const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>);
      //Simulate button click
      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1](undefined, notes[0]._id);
      //Assert spy was called correctly
      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
    });

    it('wont set Session for failed insert', function() {
      //Render component with spy
      const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>);
      //Simulate button click
      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1]({}, undefined);
      //Assert spy was called correctly
      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
      expect(Session.set).toNotHaveBeenCalled('selectedNoteId', notes[0]._id);
    });




  });
}

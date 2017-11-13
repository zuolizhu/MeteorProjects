import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Editor } from './Editor';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
  describe('Editor Block Test', function () {

    //two spy set up
    let browserHistory;
    let call;

    beforeEach(function () {
      call = expect.createSpy();
      browserHistory = {
        push: expect.createSpy()
      };
    });

    it('render pick note message', function () {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call}/>);
      expect(wrapper.find('p').text()).toBe('Pick or create a note to get started.');
    });

    it('render not found note message', function () {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id}/>);
      expect(wrapper.find('p').text()).toBe('Note not found.');
    });

    it('remove note test', function() {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]}/>);
      //simulate button click
      wrapper.find('button').simulate('click');
      //asserts for call spy and for push spy
      expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);

    });

    it('update the note body on textarea change', function() {
      const newNody = 'This is a new test body text';
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]}/>);
      wrapper.find('textarea').simulate('change', {
        target: {
          value: newNody
        }
      });

      expect(wrapper.state('body')).toBe(newNody);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {body: newNody});
    });

    it('update the note title on input change', function() {
      const newTitle = 'This is a new test title text';
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]}/>);
      wrapper.find('input').simulate('change', {
        target: {
          value: newTitle
        }
      });

      expect(wrapper.state('title')).toBe(newTitle);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {title: newTitle});
    });

    it('set state for new note', function() {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call}/>);

      wrapper.setProps({
        selectedNoteId: notes[0]._id,
        note: notes[0]
      });

      expect(wrapper.state('title')).toBe(notes[0].title);
      expect(wrapper.state('body')).toBe(notes[0].body);
    });

    it('not set state if note prop not provided', function() {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call}/>);

      wrapper.setProps({
        selectedNoteId: notes[0]._id
      });

      expect(wrapper.state('title')).toBe('');
      expect(wrapper.state('body')).toBe('');
    });


  });
}

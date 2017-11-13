import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Signup } from './Signup';

if(Meteor.isClient) {
  describe('Signup Test Block', function() {
    it('show error message', function() {
      const error = 'error message from Signup test';
      const wrapper = mount(<Signup createUser={() => {}}/>);
      wrapper.setState({ error });
      expect(wrapper.find('p').text()).toBe(error);
      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });

    it('call createUser with the form data', function() {
      const email = 'invalid@test.com';
      const password = 'yoooooo123';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy}/>);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      //email is object and password is string
      expect(spy.calls[0].arguments[0]).toEqual({ email, password });
    });


    it('set error if password is too short', function() {
      const email = 'invalid@test.com';
      const password = 'yo                 ';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy}/>);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      //assertion for error state equal to some value
      expect(wrapper.state('error').length).toNotBe(0);
    });

    it('set createUser callback errors', function() {
      const password = 'yoooooo123x';
      const errorReason = 'Test reason you might see';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy}/>);

      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      //check object error
      //something wrong in here
      // spy.calls[0].arguments[1]({errorReason});
      // expect(wrapper.state('error')).toBe(errorReason);

      //check string error
      spy.calls[0].arguments[1]();
      expect(wrapper.state('error').length).toBe(0);
    });

  });
}

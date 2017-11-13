import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Login } from './Login';

if(Meteor.isClient) {
  describe('Login Test Block', function() {
    it('show error message', function() {
      const error = 'error message from login test';
      const wrapper = mount(<Login loginWithPssword={() => {}}/>);
      wrapper.setState({ error });
      // const pValue = wrapper.find('p').text();
      //more compact way to write
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);

    });

    it('call loginWithPassword with the form data', function() {
      const email = 'invalid@test.com';
      const password = 'yoooooo123';
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy}/>);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      //email is object and password is string
      expect(spy.calls[0].arguments[0]).toEqual({ email });
      expect(spy.calls[0].arguments[1]).toBe(password);


    });

    it('set loginWithPssword callback errors', function() {
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy}/>);

      wrapper.find('form').simulate('submit');

      //check object error
      spy.calls[0].arguments[2]({});
      expect(wrapper.state('error')).toBe();

      //check string error
      spy.calls[0].arguments[2]();
      expect(wrapper.state('error').length).toBe(0);
    });
  });
}

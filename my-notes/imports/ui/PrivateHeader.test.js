import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { PrivateHeader } from './PrivateHeader';

if(Meteor.isClient) {
  describe('PrivateHeader', function() {
    it('set button text to logout', function() {
      const wrapper = mount( <PrivateHeader title="Test title" handleLogout={() => {}}/> );

      //find() takes tag class etc parameter
      const buttonText = wrapper.find('.button').text();

      expect(buttonText).toBe('Logout');
    });

    it('use title prop as h1 text', function() {
      const title = 'test title here';
      const  wrapper = mount( <PrivateHeader title= {title} handleLogout={() => {}}/> );
      const h1Value = wrapper.find('h1').text();
      expect(h1Value).toBe(title);
    });

    // it('call the function', function() {
    //   const spy = expect.createSpy();
    //   spy(3,4,5,6,7);
    //   spy('ZuoliZhu');
    //   expect(spy).toHaveBeenCalledWith('ZuoliZhu');
    // });


    it('call handleLogout on click', function() {
      const spy = expect.createSpy();
      const wrapper = mount( <PrivateHeader title="Title" handleLogout={spy}/>);
      wrapper.find('button').simulate('click');
      expect(spy).toHaveBeenCalled();
    });



  });
}

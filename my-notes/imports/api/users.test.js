import expect from 'expect';
import { Meteor } from 'meteor/meteor';

import { validateNewUser } from './users';


if(Meteor.isServer) {
  describe('users', function() {
    it('allow valid email address', function() {
      const testUser = {
        emails: [
          {
            address: 'test@biubiu.com'
          }
        ]
      };
      const res = validateNewUser(testUser);
      expect(res).toBe(true);
    });

    it('reject invalid email', function() {
      //an invalid email test
      const testUser = {
        emails: [
          {
            address: 'aBadEmailAddress'
          }
        ]
      };
      expect(() => {
        validateNewUser(testUser);
      }).toThrow();
    });
  });
}



//
// const add = (a, b) => {
//   if(typeof b !== 'number') {
//     return a + a;
//   }
//   return a + b;
// };
//
// const square = (a) => a * a;
//
// //describe block for group of functions
// describe('add block', function() {
//   it('add fucntion test', function() {
//     const res = add(6, 9);
//     expect(res).toBe(15);
//   });
//   it('should double a single number', function() {
//     const res = add(123);
//     expect(res).toBe(246);
//   });
// })
//
// describe('square block', function() {
//   it('square function test', function() {
//     const res = square(6);
//     expect(res).toBe(36);
//   })
// })

import expect from 'expect';
import {Meteor} from 'meteor/meteor';
import {validateNewUser} from './users';

if (Meteor.isServer){
describe('Users', function () {

    it('Should allow valid email', function () {
        const testUser = {
            emails: [
                {
                    address:'a@a.com'
                }
            ]
        };
        const res=validateNewUser(testUser);
        expect(res).toBe(true);
    });

    it('Should disallow valid email', function () {
        const testUser = {
            emails: [
                {
                    address:'acom'
                }
            ]
        };
        expect(()=>{
           validateNewUser(testUser);
       }).toThrow();
    });
});
}
/**
 * Created by surajvangoori1 on 6/29/17.
 */
import React from 'react';
import {Meteor} from 'meteor/meteor';
import expect from 'expect';
import {mount} from 'enzyme';
import {Login} from "./Login";

if (Meteor.isClient){

    describe('Login', function () {

        it('should show error messages', function(){
            const error='Error Message';
            const wrapper = mount(<Login loginWithPassword={()=>{}}/>);
            wrapper.setState({error:error});
            expect(wrapper.find('p').text()).toBe(error);
            wrapper.setState({error:''});
            expect(wrapper.find('p').length).toBe(0);
        });

        it('should call loginwithpassword with the form data', function () {
            const email="test@example.com";
            const password="test12345";
            const spy = expect.createSpy();
            const wrapper= mount(<Login loginWithPassword={spy}/>);

            wrapper.ref('email').node.value=email; //This line converts the
            //element into a regular DOM HTMLInputElement(Look at MDN for docs)
            wrapper.ref('password').node.value=password;
            wrapper.find('form').simulate('submit');
            //Didn't use toHaveBeenCalled because we would have needed
            //to supply the function err prop as well. Instead using
            //the spy.calls array to strip out the individual arguments and
            //asserting on those.
            expect(spy.calls[0].arguments[0]).toEqual({email:email});
            expect(spy.calls[0].arguments[1]).toBe(password);

        });

        it('should set loginwithpassword callback errors', function () {
            const spy = expect.createSpy();
            const wrapper= mount(<Login loginWithPassword={spy}/>);

            wrapper.find('form').simulate('submit');

            spy.calls[0].arguments[2]({});
            expect(wrapper.state('error').length).toNotBe(0);

            spy.calls[0].arguments[2]();
            expect(wrapper.state('error').length).toBe(0);
        });

    });
}
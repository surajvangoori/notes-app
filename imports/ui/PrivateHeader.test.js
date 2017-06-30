/**
 * Created by surajvangoori1 on 6/29/17.
 */
import React from 'react';
import {Meteor} from 'meteor/meteor';
import expect from 'expect';
import {mount} from 'enzyme';

import {PrivateHeader} from './PrivateHeader';

if (Meteor.isClient)
{
    describe('PrivateHeader',function () {

        it ('should set button text to logout', function () {
            //Mounting the React Component which returns a wrapper object
           const wrapper = mount(<PrivateHeader title="Test Title" handleLogout={()=>{}}/>);
           const buttonText = wrapper.find('button').text();
           expect(buttonText).toBe('Logout');
        });

        it ('should use title prop as h1 text', function () {
           const title = 'Test title here';
           const wrapper = mount(<PrivateHeader title={title} handleLogout={()=>{}}/>);
           const titleText = wrapper.find('h1').text();
           expect(titleText).toBe(title);
        });

        it ('should call handleLogout function on click', function () {
           const spy = expect.createSpy();
           const wrapper = mount(<PrivateHeader title="Test Title" handleLogout={spy}/>)
           wrapper.find('button').simulate('click');
           expect(spy).toHaveBeenCalled();
        });
    });

}
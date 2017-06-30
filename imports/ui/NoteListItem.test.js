/**
 * Created by surajvangoori1 on 6/30/17.
 */
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import NoteListItem from './NoteListItem';
import {Meteor} from 'meteor/meteor';

if(Meteor.isClient){

    describe('NoteListItem',function () {

      it ('should render title and timestamp', function () {
         const title = 'Note Title';
         const updatedAt = 1498823761283;
         const wrapper = mount(<NoteListItem note={{title,updatedAt}}/>)

         expect(wrapper.find('h5').text()).toBe(title);
         expect(wrapper.find('p').text()).toBe('6/30/17');
      });

      it ('should set default title if no title passed', function () {
          const title = '';
          const updatedAt = 1498823761283;
          const wrapper = mount(<NoteListItem note={{title,updatedAt}}/>)

          expect(wrapper.find('h5').text()).toBe('Untitled Note');
      });
    });
}
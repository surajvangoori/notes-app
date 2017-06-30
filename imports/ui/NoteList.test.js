/**
 * Created by surajvangoori1 on 6/30/17.
 */
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import {NoteList} from './NoteList';
const notes=[
    {
      _id:'Note1',
      title: 'Note 1 title',
      body:'Note 1 body',
      updatedAt: 0,
      userId:'userId1'
    },
    {
      _id:'Note2',
      title: 'Note 2 title',
      body:'Note 2 body',
      updatedAt: 0,
      userId:'userId2'
    }
];
if (Meteor.isClient){
    describe('NoteList', function () {

     it ('should render note list item for each note', function () {
        const wrapper= mount(<NoteList notes={notes}/>)

        expect(wrapper.find('NoteListItem').length).toBe(2);
        expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
     });

     it ('should render note empty list item', function () {
        const wrapper = mount(<NoteList notes={[]}/>)

        expect(wrapper.find('NoteListItem').length).toBe(0);
        expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
     });

    });
}
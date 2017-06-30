/**
 * Created by surajvangoori1 on 6/30/17.
 */
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import {NoteList} from './NoteList';
import {notes} from '../fixtures/fixtures';

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
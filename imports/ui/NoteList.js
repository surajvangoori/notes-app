/**
 * Created by surajvangoori1 on 6/29/17.
 */
import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Notes} from '../api/notes';
import {PropTypes} from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';


import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export const NoteList = (props)=>{

    return(
        <div>
            <NoteListHeader/>
            {props.notes.length===0 ? <NoteListEmptyItem/>:undefined}
            {
                props.notes.map((note)=>{
                return <NoteListItem key={note._id} note={note}/>
                }
                )
            }
            <p>NoteList: {props.notes.length}</p>
        </div>
    )
};

NoteList.propTypes ={
    notes:PropTypes.array.isRequired
}

export default createContainer(()=>{
    const selectedNoteId=Session.get('selectedNoteId');

    Meteor.subscribe('notes');

    return{
        notes: Notes.find({},{sort:{updatedAt:-1}}).fetch().map((note)=>{
          //This is how you return additional data added to an existing array
            return {
              ...note, //using ES6 spread operator
              selected:note._id===selectedNoteId
            };
        })
    }

},NoteList);
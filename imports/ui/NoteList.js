/**
 * Created by surajvangoori1 on 6/29/17.
 */
import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Notes} from '../api/notes';
import {PropTypes} from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';
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
    // if(props.notes.length !==0 )
    // {
    //     return (
    //         <div>
    //             <NoteListHeader/>
    //             <p>NoteList: {props.notes.length}</p>
    //             {
    //                 props.notes.map((note)=>{
    //                     return <NoteListItem key={note._id} note={note}/>
    //                     }
    //
    //                 )
    //             }
    //         </div>
    //     )
    // }
    // else{
    //     return (
    //         <div>
    //             <NoteListHeader/>
    //             <NoteListEmptyItem/>
    //         </div>
    //     )
    // }

};

NoteList.propTypes ={
    notes:PropTypes.array.isRequired
}

export default createContainer(()=>{
    Meteor.subscribe('notes');

    return{
        notes: Notes.find().fetch()
    }

},NoteList);
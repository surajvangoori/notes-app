/**
 * Created by surajvangoori1 on 6/30/17.
 */
import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import {Notes} from '../api/notes';
import {PropTypes} from 'prop-types';
import {Meteor} from 'meteor/meteor';

export const Editor = (props)=>{

    function handleBodyChange(e)
    {
        props.call('notes.update',props.note._id, {body:e.target.value});
    };

    function handleTitleChange(e) {
        props.call('notes.update',props.note._id,{title:e.target.value});
    };

    if(props.note){
      //Note Exists
      return(
           <div>
               <input value={props.note.title}
                      placeholder="Enter a title"
                      onChange={handleTitleChange.bind(this)}/>

               <textarea value={props.note.body}
                         placeholder="Enter a note"
                         onChange={handleBodyChange.bind(this)}></textarea>
               <button>Delete Note</button>
           </div>
      )
    }else{
      return(
        <div>
            {props.selectedNoteId ? 'Note not found':'Pick or create a Note'}
        </div>
      )
    }
};

Editor.propTypes ={
    note:PropTypes.object,
    seletedNoteId:PropTypes.string
}

export default createContainer(()=>{
    const selectedNoteId = Session.get('selectedNoteId');

    return{
       selectedNoteId:selectedNoteId,
       note: Notes.findOne(selectedNoteId),
       call: Meteor.call
    };
},Editor)
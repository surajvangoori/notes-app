/**
 * Created by surajvangoori1 on 6/29/17.
 */
import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {PropTypes} from 'prop-types';
import {Session} from 'meteor/session';

//Note List Header
export const NoteListHeader = (props)=>{

    return(
        <div>
            <button onClick={()=>{
                props.meteorCall('notes.insert', (err,res)=>{
                    if(res){
                      props.Session.set('selectedNoteId',res) ;
                    }
                });
            }}>Create Note</button>
        </div>
    );
};

NoteListHeader.propTypes={
    meteorCall:PropTypes.func.isRequired,
    Session: PropTypes.object.isRequired
};

export default createContainer(()=>{
    return{
      meteorCall: Meteor.call,
      Session
    };
}, NoteListHeader);
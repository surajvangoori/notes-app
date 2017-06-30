/**
 * Created by surajvangoori1 on 6/29/17.
 */
import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {PropTypes} from 'prop-types';

//Note List Header
export const NoteListHeader = (props)=>{

    return(
        <div>
            <button onClick={()=>{
                props.meteorCall('notes.insert');
            }}>Create Note</button>
        </div>
    );
};

NoteListHeader.propTypes={
    meteorCall:PropTypes.func.isRequired
};

export default createContainer(()=>{
    return{
      meteorCall: Meteor.call
    };
}, NoteListHeader);
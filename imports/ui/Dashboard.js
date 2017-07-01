/**
 * Created by surajvangoori1 on 6/23/17.
 */
import React from 'react';
import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';

export default ()=> {
    return(
        <div>
            <PrivateHeader  title="Dashboard"/>
            <div className="page-content">
                <NoteList/>
                <Editor/>
            </div>
        </div>
    )
};

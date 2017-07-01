/**
 * Created by surajvangoori1 on 6/30/17.
 */
import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import {Notes} from '../api/notes';
import {PropTypes} from 'prop-types';
import {Meteor} from 'meteor/meteor';
import {browserHistory} from 'react-router';

export class Editor extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            body:''
        }
    }

    handleBodyChange(e)
    {
        const body=e.target.value;
        this.setState({body:body})
        this.props.call('notes.update',this.props.note._id, {body:body});
    };

    handleTitleChange(e) {
        const title = e.target.value;
        this.setState({title:title});
        this.props.call('notes.update',this.props.note._id,{title:title});
    };

    handleRemoval(){
        this.props.call('notes.remove',this.props.note._id);
        this.props.browserHistory.push('/dashboard');
    }

    componentDidUpdate(prevProps, prevState) {
        const currentNoteId = this.props.note ? this.props.note._id : undefined;
        const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

        if (currentNoteId && currentNoteId!== prevNoteId){
            this.setState({
                title: this.props.note.title,
                body: this.props.note.body
            });
        }
    }
    render() {
        if (this.props.note) {
            //Note Exists
            return (
                <div>
                    <input value={this.state.title}
                           placeholder="Enter a title"
                           onChange={this.handleTitleChange.bind(this)}/>

                    <textarea value={this.state.body}
                              placeholder="Enter a note"
                              onChange={this.handleBodyChange.bind(this)}></textarea>
                    <button onClick={this.handleRemoval.bind(this)}>Delete Note</button>
                </div>
            )
        } else {
            return (
                <div>
                    {this.props.selectedNoteId ? 'Note not found' : 'Pick or create a Note'}
                </div>
            )
        }
    }
};

Editor.propTypes ={
    note:PropTypes.object,
    seletedNoteId:PropTypes.string,
    call:PropTypes.func.isRequired,
    browserHistory:PropTypes.object.isRequired
}

export default createContainer(()=>{
    const selectedNoteId = Session.get('selectedNoteId');
    return{
       selectedNoteId:selectedNoteId,
       note: Notes.findOne(selectedNoteId),
       call: Meteor.call,
       browserHistory
    };
},Editor)
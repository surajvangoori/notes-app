/**
 * Created by surajvangoori1 on 6/28/17.
 */
import {Meteor} from 'meteor/meteor';
import expect from 'expect';
import {Notes} from './notes';
if (Meteor.isServer){
    describe('Notes', function () {
        const noteOne=
        {
            _id: 'testNoteId1',
            title: 'My Title',
            body: 'My body for note',
            updatedAt: 0,
            userId: 'testUserId1'
        };

        const noteTwo=
            {
                _id: 'testNoteId2',
                title: 'My Title 2',
                body: 'My body for note 2',
                updatedAt: 0,
                userId: 'testUserId2'
            };

        beforeEach(function () {
            Notes.remove({});
            Notes.insert(noteOne);
            Notes.insert({noteTwo});
        });

       //Insert Note Tests
       it('should insert new note', function () {
           const userId='testid';
           const _id = Meteor.server.method_handlers['notes.insert'].apply({userId});

           expect(Notes.findOne({_id,userId})).toExist();

       });

       it ('should not insert note if not authenticated', function () {
          expect(()=>{
              Meteor.server.method_handlers['notes.insert']()}
              ).toThrow();
       });

       //Remove Note Tests
       it ('should remove note',function () {
          Meteor.server.method_handlers['notes.remove'].apply({userId:noteOne.userId},[noteOne._id]);
          expect(Notes.findOne({_id:noteOne._id})).toNotExist();
       });

       it ('should not remove note if not authenticated', function(){
           expect(()=>{
            Meteor.server.method_handlers['notes.remove'].apply({},[noteOne._id]);
           }).toThrow();
       });

        it ('should not remove note if invalid Id', function(){
            expect(()=>{
                Meteor.server.method_handlers['notes.remove'].apply({userId:noteOne.userId});
            }).toThrow();
        });

        //Update Note Tests
        it ('should update note', function () {
          const title='My Updated Note';

          Meteor.server.method_handlers['notes.update'].apply({
              userId:noteOne.userId
          }, [
              noteOne._id,
              { title}
          ]);

          const note=Notes.findOne(noteOne._id); //Fetching note after update

          expect(note.updatedAt).toBeGreaterThan(0);
          expect(note).toInclude({
              title,
              body:noteOne.body
          });

        });

        it('should throw error if extra updates', function () {

          expect(()=>{
              Meteor.server.method_handlers['notes.update'].apply({
                  userId:noteOne.userId
              }, [
                  noteOne._id,
                  {title:'title', name:'rasta'}
              ]);
          }).toThrow();
        });

        it ('should not update note if not authenticated', function(){
            expect(()=>{
                Meteor.server.method_handlers['notes.update'].apply(
                [
                    noteOne._id,
                    {title:'title', name:'rasta'}
                ]);
            }).toThrow();
        });

        it ('should not update note if invalid Id', function(){
            expect(()=>{
                Meteor.server.method_handlers['notes.update'].apply({
                    userId:noteOne.userId
                },
                [
                   {title:'title', name:'rasta'}
                ]);
            }).toThrow();
        });

        it ('should not update note if user was not creator', function () {
            const title='My Updated Note 1';

            Meteor.server.method_handlers['notes.update'].apply({
                userId:'testid'
            }, [
                noteOne._id,
                { title}
            ]);

            const note=Notes.findOne(noteOne._id); //Fetching note after update


            expect(note).toInclude(noteOne);
        });

        it ('should return a users notes', function () {
            const res = Meteor.server.publish_handlers.notes.apply({userId:noteOne.userId});
            const notes = res.fetch();

            expect(notes.length).toBe(1);
            expect(notes[0]).toEqual(noteOne);
        });

        it ('should return zero notes for user that has none', function () {
            const res = Meteor.server.publish_handlers.notes.apply({userId:'testuser'});
            const notes = res.fetch();

            expect(notes.length).toBe(0);
        })
    });
}
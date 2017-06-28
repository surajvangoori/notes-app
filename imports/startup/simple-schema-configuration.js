/**
 * Created by surajvangoori1 on 6/25/17.
 */
import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

SimpleSchema.defineValidationErrorTransform(e => {
   return new Meteor.Error(400,e.message);
});
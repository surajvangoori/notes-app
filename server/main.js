import { Meteor } from 'meteor/meteor';
import {WebApp} from 'meteor/webapp';
import '../imports/api/users' //No need the FROM keyword because it
// is going to get executed when the file runs
import '../imports/startup/simple-schema-configuration';
import '../imports/api/notes';

Meteor.startup(() => {


});

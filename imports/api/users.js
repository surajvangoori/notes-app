/**
 * Created by surajvangoori1 on 6/24/17.
 */

import SimpleSchema from 'simpl-schema';
import {Accounts} from 'meteor/accounts-base';

Accounts.validateNewUser((user)=>{
    console.log('this is the user',user);
    const email = user.emails[0].address //Pulling email off the user object and emails array

    //Creating a new schema for email and validating it
    new SimpleSchema({
        email: {
            type: String,
            regEx: SimpleSchema.RegEx.Email
        }
    }).validate({ email });

    return true;

});


/**
 * Created by surajvangoori1 on 6/26/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import {Accounts} from 'meteor/accounts-base';

//Had to declare a variable because using the propTypes below
export const PrivateHeader = (props)=>{
    return(
            <div className="header">
              <div className="header__content">
                <h1 className="header__title">{props.title}</h1>
                <button className="button button--link-text" onClick={()=> props.handleLogout()}>Logout</button>
              </div>
            </div>
         );
}

PrivateHeader.propTypes={
    title:PropTypes.string.isRequired,
    handleLogout:PropTypes.func.isRequired
};

export default createContainer(()=>{
    return{
        handleLogout:()=>{
            Accounts.logout();
        }
    }
}, PrivateHeader);
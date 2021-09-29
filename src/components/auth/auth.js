import React ,{useContext}from 'react';
import {When} from 'react-if';

import { LoginContext } from '../../context/login';

export default function Auth(props) {

const  context = useContext(LoginContext)

    const isLoggedIn = context.loggedIn;
    const canDo = props.capability ? context.can(props.capability) : true;
    const okToRender = isLoggedIn && canDo;
   

    return (
      <When condition={okToRender}>
        {props.children}
      </When>
    );
    
} 


   
  

  
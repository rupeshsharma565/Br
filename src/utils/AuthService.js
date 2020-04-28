//import { browserHistory } from 'react-router';


export const ID_TOKEN_KEY = 'jwt';
//const ID_USERKEY_KEY = 'username';


export function isLoggedIn() {

  const idToken = getIdToken();
  return idToken && !isTokenExpired(idToken); 

}

export function getIdToken() {

  //return localStorage.getItem(ID_TOKEN_KEY);
 return sessionStorage.getItem(ID_TOKEN_KEY);

}

function isTokenExpired(token) {

  //const expirationDate = getTokenExpirationDate(token);

  return  false;      //  expirationDate < new Date();

}

export function sessionClear() {
      
    sessionStorage.clear(); 

}

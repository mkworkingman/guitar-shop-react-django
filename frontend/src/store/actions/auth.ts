import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token: any) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token
  }
}

export const authFail = (error: any) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const authLogin = (username: any, password: any) => {
  // return dispatch => {
  //   dispatch(authStart());
    
  // }
  
}
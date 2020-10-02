import * as ActionTypes from '../Utils/Types';
import {createAction} from '../Utils/reduxUtils/index'
/**user login actions */
export const userLoginRequest = (requestBody) => 
createAction(ActionTypes.USER_LOGIN_REQUEST,{ requestBody });
export const userLoginStarted = () => 
createAction(ActionTypes.USER_LOGIN_STARTED);
export const userLoginSuccess = (response) => 
createAction(ActionTypes.USER_LOGIN_SUCCESS, { response });
export const userLogiinFailure = (response) => 
createAction(ActionTypes.USER_LOGIN_FAILURE, { response });

/***video actions */
export const videoFetchRequest = () => createAction(ActionTypes.VIDEO_FETCH_REQUEST);
export const videoFetchStarted = () => createAction(ActionTypes.VIDEO_FETCH_STARTED);
export const videoFetchSuccess = (response) => createAction(ActionTypes.VIDEO_FETCH_SUCCESS, { response });
export const videoFetchFailure = (response) => createAction(ActionTypes.VIDEO_FETCH_FAILURE, { response });

/***strips actions */
export const stripsFetchRequest = () => createAction(ActionTypes.STRIPS_FETCH_REQUEST);
export const stripsFetchStarted = () => createAction(ActionTypes.STRIPS_FETCH_STARTED);
export const stripsFetchSuccess = (response) => createAction(ActionTypes.STRIPS_FETCH_SUCCESS, { response });
export const stripsFetchFailure = (response) => createAction(ActionTypes.STRIPS_FETCH_FAILURE, { response });

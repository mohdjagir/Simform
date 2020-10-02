import { createReducer } from '../Utils/reduxUtils';
import * as ActionTypes from '../Utils/Types';
import Immutable from 'seamless-immutable';
export const initialState = Immutable.from({
    userLogin: {
        loading: false,
        userData: null
    },
    fetchVideo: {
        loading: false,
        videoData: null
    },
    fetchChemical: {
        loading: false,
        fetchChemicalData: null
    }
});

/***user login reducer */
const userLoginStarted = (state) => state.merge({
    userLogin: state.userLogin.merge({
        userData: initialState.userData,
        loading: true
    })
})
const userLoginSuccess = (state, response) => state.merge({
    userLogin: state.userLogin.merge({
        userData: response,
        loading: false
    })
})
const userLoginFailure = (state) => state.merge({
    userLogin: state.userLogin.merge({
        userData: initialState.userData,
        loading: false
    })
})

/***video fetch reducers */
const videoFetchStarted = (state) => state.merge({
    fetchVideo: state.fetchVideo.merge({
        videoData: initialState.videoData,
        loading: true
    })
})
const videoFetchSuccess = (state, response) => state.merge({
    fetchVideo: state.fetchVideo.merge({
        videoData: response,
        loading: false
    })
})
const videoFetchFailure = (state) => state.merge({
    fetchVideo: state.fetchVideo.merge({
        userData: initialState.videoData,
        loading: false
    })
})
/***strips reducers */
const stripsFetchStarted = (state) => state.merge({
    fetchChemical: state.fetchChemical.merge({
        fetchChemicalData: initialState.fetchChemicalData,
        loading: true
    })
})
const stripsFetchSuccess = (state, response) => state.merge({
    fetchChemical: state.fetchChemical.merge({
        fetchChemicalData: response,
        loading: false
    })
})
const stripsFetchFailure = (state) => state.merge({
    fetchChemical: state.fetchChemical.merge({
        fetchChemicalData: initialState.fetchChemicalData,
        loading: false
    })
})

const appReducer = createReducer(initialState, {
    [ActionTypes.USER_LOGIN_STARTED]: userLoginStarted,
    [ActionTypes.USER_LOGIN_SUCCESS]: userLoginSuccess,
    [ActionTypes.USER_LOGIN_FAILURE]: userLoginFailure,
    [ActionTypes.VIDEO_FETCH_STARTED]: videoFetchStarted,
    [ActionTypes.VIDEO_FETCH_SUCCESS]: videoFetchSuccess,
    [ActionTypes.VIDEO_FETCH_FAILURE]: videoFetchFailure,
    [ActionTypes.STRIPS_FETCH_STARTED]: stripsFetchStarted,
    [ActionTypes.STRIPS_FETCH_SUCCESS]: stripsFetchSuccess,
    [ActionTypes.STRIPS_FETCH_FAILURE]: stripsFetchFailure,

})

export default appReducer;
import { put, takeLatest, all } from 'redux-saga/effects';
import * as ActionTypes from '../Utils/Types';
import * as Actions from '../Actions/index';
import { showMessage } from '../Utils/Alert';
import VideoModel from '../Models/Video';
import StripsModel from '../Models/Strips';

export function* userLoginFunc() {
    yield put(Actions.userLoginRequest());
    const userSuccess = {
        statusCode: 200,
        message: "You are successfully login"
    }
    if (userSuccess) {
        yield put(Actions.userLogiinSuccess(userSuccess));
    } else {
        showMessage(true, "There is some error !")
        yield put(Actions.userLogiinFailure())
    }

}
export function* fetchVideoFunc() {
    yield put(Actions.videoFetchRequest());
    const videoFetchResponse = VideoModel.getVideoList();
    if (videoFetchResponse.statusCode === 200 || videoFetchResponse.statusCode === 201) {
        yield put(Actions.videoFetchSuccess(videoFetchResponse));
    } else {
        if (videoFetchResponse.data && videoFetchResponse.data.message) {
            showMessage(true, videoFetchResponse.data.message)
        } else {
            showMessage(true, "There is some error !")
        }
        yield put(Actions.videoFetchFailure())
    }

}
export function* fetchStipsFunc() {
    yield put(Actions.stripsFetchRequest());
    const stripsFetchResponse = StripsModel.getStripsList();
    if (stripsFetchResponse.statusCode === 200 || stripsFetchResponse.statusCode === 201) {
        yield put(Actions.stripsFetchSuccess(stripsFetchResponse));
    } else {
        if (stripsFetchResponse.data && stripsFetchResponse.data.message) {
            showMessage(true, stripsFetchResponse.data.message)
        } else {
            showMessage(true, "There is some error !")
        }
        yield put(Actions.stripsFetchFailure())
    }

}

export function* actionWatcher() {
    yield takeLatest(ActionTypes.USER_LOGIN_REQUEST, userLoginFunc)
    yield takeLatest(ActionTypes.VIDEO_FETCH_REQUEST, fetchVideoFunc)
    yield takeLatest(ActionTypes.STRIPS_FETCH_REQUEST, fetchStipsFunc)
}
export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}

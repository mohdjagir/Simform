import { put, takeLatest, all } from 'redux-saga/effects';
import * as ActionTypes from '../Utils/Types';
import * as Actions from '../Actions/index';
import { showMessage } from '../Utils/Alert';
import VideoModel from '../Models/Video';
import ChemicalModel from '../Models/Strips';
import userLoginModel from '../Models/Login';

export function* userLoginFun(action) {
    yield put(Actions.userLoginStarted());
    const responseObj = yield userLoginModel.userLoginRequest(action.requestBody);
    if (responseObj.statusCode === 200 || responseObj.statusCode === 201) {
        yield put(Actions.userLoginSuccess(responseObj.data));
    } else {
        showMessage(true, "There is some error !")
        if (responseObj.data && responseObj.data.message) {
            showMessage(true, responseObj.data.message)
        } else {
            showMessage(true, "There is some error !")
        }
        yield put(Actions.videoFetchFailure())
    }

}
export function* fetchVideoFunc() {
    yield put(Actions.videoFetchStarted());
    const responseObj = yield VideoModel.getVideoList();
    if (responseObj.statusCode === 200 || responseObj.statusCode == 201) {
        yield put(Actions.videoFetchSuccess(responseObj.data));
    } else {
        if (responseObj.data && responseObj.data.message) {
            showMessage(true, responseObj.data.message)
        } else {
            showMessage(true, "There is some error !")
        }
        yield put(Actions.videoFetchFailure())
    }

}

export function* fetchChemicalFunc() {
    yield put(Actions.stripsFetchStarted());
    const responseObj = yield ChemicalModel.getChemicalList();
    if (responseObj.statusCode === 200 || responseObj.statusCode == 201) {
        yield put(Actions.stripsFetchSuccess(responseObj.data));
    } else {
        if (responseObj.data && responseObj.data.message) {
            showMessage(true, responseObj.data.message)
        } else {
            showMessage(true, "There is some error !")
        }
        yield put(Actions.stripsFetchFailure())
    }

}

export function* actionWatcher() {
    yield takeLatest(ActionTypes.USER_LOGIN_REQUEST, userLoginFun)
    yield takeLatest(ActionTypes.VIDEO_FETCH_REQUEST, fetchVideoFunc)
    yield takeLatest(ActionTypes.STRIPS_FETCH_REQUEST, fetchChemicalFunc)
}
export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}

import { takeLatest, put, call } from "redux-saga/effects";

import { GET_POSTS, GET_POST_DETAILS, GET_ABOUT } from "./actionTypes";

import {
  getPostsSuccess,
  getPostsFail,
  getPostDetailsSuccess,
  getPostDetailsFail,
  getAboutSuccess,
  getAboutFail,
} from "./actions";

import { getPosts, getPostDetails, getAbout } from "../../helpers/backend_helper";

function* onGetPosts() {
  try {
    const response = yield call(getPosts);
    console.log("yield posts", response)
    yield put(getPostsSuccess(response));
  } catch (error) {
    yield put(getPostsFail(error.response));
  }
}

function* onGetPostDetails({ payload: id }) {
  try {
    const response = yield call(getPostDetails, id);
    console.log("yield",response)
    yield put(getPostDetailsSuccess(response));
  } catch (error) {
    yield put(getPostDetailsFail(error.response));
  }
}

function* CartSaga() {
  yield takeLatest(GET_POSTS, onGetPosts);
  yield takeLatest(GET_POST_DETAILS, onGetPostDetails);
  yield takeLatest(GET_ABOUT, onGetAbout);
}

function* onGetAbout() {
  try {
    const response = yield call(getAbout);
    yield put(getAboutSuccess(response));
  } catch (error) {
    yield put(getAboutFail(error.response));
  }
}

export default CartSaga;

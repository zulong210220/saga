import {
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POST_DETAILS,
  GET_POST_DETAILS_SUCCESS,
  GET_POST_DETAILS_FAIL,
  GET_ABOUT,
  GET_ABOUT_SUCCESS,
  GET_ABOUT_FAIL,
} from "./actionTypes";

const initialState = {
  posts: [],
  post: {},
  loadingPosts: false,
  loadingPostDetails: false,
  about: {},
  loadingAbout: false,
  error: {
    message: "",
  },
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      state = { ...state, loadingPosts: true };
      break;
    case GET_POSTS_SUCCESS:
      state = { ...state, posts: action.payload, loadingPosts: false };
      break;
    case GET_POSTS_FAIL:
      state = {
        ...state,
        error: {
          message: "Error",
        },
        loadingPosts: false,
      };
      break;

    case GET_POST_DETAILS:
      state = { ...state, loadingPostDetails: true };
      break;
    case GET_POST_DETAILS_SUCCESS:
      state = { ...state, post: action.payload[0], loadingPostDetails: false };
      break;
    case GET_POST_DETAILS_FAIL:
      state = {
        ...state,
        error: {
          message: "Error",
        },
        loadingPostDetails: false,
      };
      break;

    case GET_ABOUT:
      state = { ...state, loadingAbout: true };
      break;
    case GET_ABOUT_SUCCESS:
      state = { ...state, about: action.payload, loadingAbout: false };
      break;
    case GET_ABOUT_FAIL:
      state = {
        ...state,
        error: {
          message: "Error",
        },
        loadingAbout: false,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default PostReducer;

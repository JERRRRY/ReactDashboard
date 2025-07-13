import {
    FETCH_RAMEN_REQUEST,
    FETCH_RAMEN_SUCCESS,
    FETCH_RAMEN_FAILURE,
  } from '../actions/ramen';
  
  const initialState = {
    data: [],
    isLoading: false,
    error: null,
  };
  
  export default function ramenReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_RAMEN_REQUEST:
        return { ...state, isLoading: true, error: null };
      case FETCH_RAMEN_SUCCESS:
        return { ...state, isLoading: false, data: action.payload };
      case FETCH_RAMEN_FAILURE:
        return { ...state, isLoading: false, error: action.error };
      default:
        return state;
    }
  }
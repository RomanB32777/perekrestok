import { SET_LOADING } from "../../types/Loading";

const initialState = false;

const LoadingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOADING:
      return action.payload;

    default:
      return state;
  }
};

export default LoadingReducer;

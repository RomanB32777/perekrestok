import { ICityAction } from "../../../types";
import { ICity, ICityStore } from "../../../types/city";
import { SET_CITIES, SET_SELECTED_CITY } from "../../types/Cities";

const initialState: ICityStore = { selected_city: "", cities: [] };

const CitiesReducer = (state = initialState, action: ICityAction) => {
  switch (action.type) {
    case SET_CITIES:
      return { ...state, cities: action.payload as ICity[] };

    case SET_SELECTED_CITY:
      return { ...state, selected_city: action.payload as string };

    default:
      return state;
  }
};

export default CitiesReducer;

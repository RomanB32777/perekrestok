export const GET_CITIES = "GET_CITIES";
export const SET_CITIES = "SET_CITIES";
export const SET_SELECTED_CITY = "SET_SELECTED_CITY";

export const getCities = () => ({
  type: GET_CITIES
});

export const setCities = (payload: any) => {
  return { type: SET_CITIES, payload };
};

export const getSelectedCity = () => localStorage.getItem("city");

export const setSelectedCity = (payload: string) => {
  localStorage.setItem("city", payload);
  return { type: SET_SELECTED_CITY, payload };
};

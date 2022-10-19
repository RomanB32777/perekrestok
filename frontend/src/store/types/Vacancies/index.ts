export const GET_VACANCIES = "GET_VACANCIES";
export const SET_VACANCIES = "SET_VACANCIES";

export const getVacancies = (payload?: string) => ({
  type: GET_VACANCIES, payload
});

export const setVacancies = (payload: any) => {
  return { type: SET_VACANCIES, payload };
};

// localStorage.setItem("main_wallet", JSON.stringify(payload));

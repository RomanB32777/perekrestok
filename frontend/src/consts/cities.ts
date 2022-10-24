import { ICityData } from "../types";

export const initCityData: ICityData = {
  city_name: {
    type: "string",
    value: "",
    placeholder: "Введите название города",
  },
  prev_city_name: {
    type: "hidden",
    value: "",
  },
};

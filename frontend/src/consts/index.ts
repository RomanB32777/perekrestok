import { initCityData } from './cities';
import { landingConts } from "./landing";
const url = "/images/";

const authToken = "JDIUdnd3MKRtnuaX/8Fr/8M70G2IGrMSjz8omjQyF/4=";

const countries = [
  "Российская Федерация",
  "Беларусь",
  "Кыгрызстан",
  "Украина",
  "Узбекистан",
  "Таджикистан",
  "Другое",
];

const adminLogin = {
  login: "admin",
  password: "12345",
};

const filterVacancy = process.env.REACT_APP_FILTER_VACANCY !== "false";

export { url, authToken, countries, adminLogin, landingConts, filterVacancy, initCityData };

import { addNotification } from "./notifications";

export const getRandomStr = (length: number) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const shortStr = (str: string, length: number) => {
  return str.length > 30
    ? str.slice(0, 6) + "..." + str.slice(str.length - length)
    : str;
};

export const copyStr = (str: string) => {
  try {
    navigator.clipboard.writeText(str);
    addNotification({
      type: "success",
      title: "Ссылка скопирована успешно",
    });
  } catch (error) {
    addNotification({
      type: "warning",
      title: "An error occurred while copying the link",
    });
  }
};

export const scrollToPosition = (top = 0, smooth = true) => {
  try {
    window.scroll({
      top: top,
      left: 0,
      behavior: smooth ? "smooth" : "auto",
    });
  } catch (_) {
    window.scrollTo(0, top);
  }
};

export const scrollToElement = (hash: string) => {
  const id = hash.replace("#", "");
  const element = document.getElementById(id);
  element && element.scrollIntoView({ behavior: "smooth" }); // block: "center",
};

export const getQueryParams = (searchParams: URLSearchParams) => {
  const params: string[] = [];
  searchParams.forEach((value, key) => {
    params.push(`${key}=${value}`);
  });
  if (params.length) return `?${params.join("&")}`;
  return "";
};

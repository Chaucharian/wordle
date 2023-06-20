export enum STORAGE {
  LOCAL_SESSION = "LOCAL_SESSION",
  IS_FIRST_TIME = "IS_FIRST_TIME",
}

const showError = (error: unknown) => console.log(`Storage error: ${error}`);

export const removeData = async (items: string[] | string) => {
  try {
    if (Array.isArray(items)) {
      items.forEach((item) => window.localStorage.removeItem(item));
    } else {
      window.localStorage.removeItem(items);
    }
  } catch (e) {
    showError(e);
    // saving error
  }
};

export const storeStringData = (key: string, value: any) => {
  window.localStorage.setItem(key, value);
};

export const storeJsonData = (key: string, value: any) => {
  const jsonValue = JSON.stringify(value);
  window.localStorage.setItem(key, jsonValue);
};

export const getStringData = (key: string) => {
  const value = window.localStorage.getItem(key);
  return value;
};

export const getJsonData = (key: string) => {
  const jsonValue = window.localStorage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

import ReeValidate from "ree-validate-18";
import { options, ToastNotification } from "./toastConfig";

// handle errors response
export const handleErrorResponse = (err) => {
  if (
    err &&
    err.response &&
    err.response.data &&
    err.response.data &&
    err.response.data.errors
  ) {
    const message = [];
    for (const key in err.response.data.errors) {
      message.push(err.response.data.errors[key][0]);
    }

    return message.join(" ");
  }

  return (
    (err && err.response && err.response.data && err.response.data.message) ||
    err.message
  );
};

// validate fields
export const Validator = (fields) => {
  const validator = new ReeValidate.Validator(fields);

  const formatFieldName = (field) => {
    // Replace camelCase with spaces
    field = field.replace(/([a-z])([A-Z])/g, "$1 $2");
    // Replace underscores with spaces and capitalize the first letter
    return field
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const dictionary = {
    en: {
      messages: {
        required: (field) => `${formatFieldName(field)} is required!`,
        email: (field) =>
          `${formatFieldName(field)} must be a valid email address!`,
        number: (field) => `${formatFieldName(field)} must be a number!`,
        regex: (field) => `${formatFieldName(field)} format is invalid!`,
        length: (field) => `${formatFieldName(field)} length must be 11`,
      },
    },
  };

  validator.localize(dictionary);

  return validator;
};

// validate state values
export const handleValidate = async (state, validator, set) => {
  try {
    validator.validateAll({ ...state }).then((success) => {
      if (success) {
        return true;
      } else {
        set((prev) => ({
          ...prev,
          errors: validator.errors,
        }));
        return false;
      }
    });
  } catch (error) {
    ToastNotification("error", error, options);
    return false;
  }
};

// check if user is authenticated
export const isAuth = () => {
  return !!localStorage.getItem("accessToken");
};

// check if empty
export const isEmpty = (value) => {
  if (typeof value === "string") {
    return !value.trim();
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (value && typeof value === "object") {
    return Object.keys(value).length === 0;
  }
  return !value;
};

//optimizing fetch
export const debounce = (func) => {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, 500);
  };
};

// IP Address regex
export const ipv4Regex = () => {
  return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
};

// test if IP Address is valid
export const validateIPAddress = (link) => {
  const regex = ipv4Regex();
  return regex.test(link);
};

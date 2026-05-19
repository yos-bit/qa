import { error } from "node:console";
import { ERROR_MESSAGES } from "./errorMessages";

export const VALID_PASSWORD = "secret_sauce";
export const LOCKED_OUT_USER = "locked_out_user";
export const INVALID_USER = "invalid_user";
export const INVALID_PASSWORD = "invalid_password";

export const VALID_USERS = [
  "standard_user",
  "problem_user",
  "performance_glitch_user",
  "error_user",
  "visual_user",
];
export const INVALID_USERS = [
  {
    username: "locked_out_user",
    password: VALID_PASSWORD,
    errorMessage: ERROR_MESSAGES.LOCKED_OUT_USER,
  },
  {
    username: "standard_user",
    password: INVALID_PASSWORD,
    errorMessage: ERROR_MESSAGES.INVALID_CREDENTIALS,
  },
  {
    username: INVALID_USER,
    password: VALID_PASSWORD,
    errorMessage: ERROR_MESSAGES.INVALID_CREDENTIALS,
  },
  {
    username: INVALID_USER,
    password: INVALID_PASSWORD,
    errorMessage: ERROR_MESSAGES.INVALID_CREDENTIALS,
  },
  {
    username: "",
    password: VALID_PASSWORD,
    errorMessage: ERROR_MESSAGES.MISSING_USERNAME,
  },
  {
    username: "standard_user",
    password: "",
    errorMessage: ERROR_MESSAGES.MISSING_PASSWORD,
  },
  {
    username: "",
    password: "",
    errorMessage: ERROR_MESSAGES.MISSING_USERNAME,
  },
];

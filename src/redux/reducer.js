import { combineReducers } from "redux";
import { register } from "reducer/register.reducer.js";
import { login } from "reducer/login.reducer.js";

export default combineReducers ({
  register,
  login
});
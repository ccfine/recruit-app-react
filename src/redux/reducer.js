import { combineReducers } from "redux";
import { register } from "./reducer/register.reducer.js";
import { login } from "./reducer/login.reducer.js";
import { improveInfo } from "./reducer/improveInfo.reducer.js";
import { users } from "./reducer/users.reducer.js";
import { chat } from "./reducer/chat.reducer.js";

export default combineReducers ({
  register,
  login,
  improveInfo,
  users,
  chat
});
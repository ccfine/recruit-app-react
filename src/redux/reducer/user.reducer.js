import { REGISTER_SUCCESS, ERROR_MSG } from "action/user.action.js";

const initState = {
  isAuth: false,
  msg: "",
  user: "",
  pwd: "",
  type: ""
};

export const user = (state=initState, action) => {
  switch (action.type)
};
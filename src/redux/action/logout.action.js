export const LOGOUT = "LOGOUT";

export const logout = msg => {
  return { type: LOGOUT, msg: msg };
};
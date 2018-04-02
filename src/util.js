export const getRedirectPath = ({type, photo}) => {
  let url = (type === "boss")? "/boss": "/worker";
  if (!photo) {
    url += "info";
  }
  return url;
};
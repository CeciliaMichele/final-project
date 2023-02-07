export const BASE_URL = "https://final-project-m2dbj6puqa-lz.a.run.app"

export const API_URL = (slug) => `${BASE_URL}/${slug}`

export const getInitialState = () => {
  const state = localStorage.getItem("userReduxState");
  if (state) {
    const stateJson = JSON.parse(state);
    return stateJson;
  }
  return {
    error: null,
    username: null,
    id: null,
    accessToken: null,
    presentation: "",
    age: null,
    email: "",
    instagram: "",
    facebook: "",
    name: null,
  };
};
import axios from "axios";
import Cookies from "js-cookie";

let authTokenRequest;

//let domain = window.location.hostname;
let domain = window.location.hostname;
console.log(domain);
//let port = '8015'
let uri = "/api/";
let protocol = window.location.protocol;
//
//let url = 'https://' + domain + uri;

//prod
//let url = protocol + "//" + domain + uri;
//development
let url = 'http://' + domain  + uri;
let axiosInstance;
axiosInstance = axios.create({

  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    "X-CSRFTOKEN": Cookies.get("csrftoken"),
  },
  withCredentials: true,
  credentials: "include",
  xsrfHeaderName: "X-CSRFTOKEN", //"X-CSRFTOKEN",
  xsrfCookieName: "csrftoken",
});

export function getAuthToken() {
  if (!authTokenRequest) {
    authTokenRequest = axiosInstance.post("authentication/token/refresh/");
    authTokenRequest.then(resetAuthTokenRequest, resetAuthTokenRequest);
  }

  return authTokenRequest;
}

function resetAuthTokenRequest() {
  authTokenRequest = null;
}

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  function (error) {
    const originalRequest = error;

    // Check if refresh_token has expired;

    if (
      error.response.status === 401 &&
      originalRequest.config.url === "authentication/token/refresh/"
    ) {
      window.alert("Votre session a expiré. Vous serez redirigé vers la page de connexion.");
      localStorage.setItem("currentUser", null);
      //localStorage.setItem('currentUserGroups', null);
      //localStorage.setItem('currentUserEntity', null);
      //window.location = '/login';
      window.location.href = "/";
    }

    if (
      error.response.status === 401 &&
      !originalRequest.config._retry &&
      error.response.data.detail !== "No active account found with the given credentials"
    ) {
      return getAuthToken().then(() => {
        originalRequest.config._retry = true;
        return axiosInstance(originalRequest.config);
      });
    }

    return Promise.reject(error); // Note from Cristi: Do not think about deleting this line! Trust me ! I know from experience!
  }
);

export default axiosInstance;

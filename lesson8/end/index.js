const API_URL = "http://localhost:8888";

let ACCESS_TOKEN = undefined;
let webAuth = new auth0.WebAuth({
  domain: 'joel-1.auth0.com',
  clientID: '8vXPduLlATyDg69DF13J7JY4xN2vveOG',
  responseType: 'token',
  audience: 'secure-spa-auth0',
  scope: '',
  redirectUri: window.location.href
});

const headlineBtn = document.querySelector("#headline");
const secretBtn = document.querySelector("#secret");
const loginBtn = document.querySelector("#loginBtn");
const logoutBtn = document.querySelector("#logoutBtn");

headlineBtn.addEventListener("click", () => {
	fetch(`${API_URL}/resource`).then(resp => {
		return resp.text() ;
	}).then(data => {
		UIUpdate.alertBox(data);
	});
});

secretBtn.addEventListener("click", (event) => {
	let headers = {};
	if (ACCESS_TOKEN) {
		headers = {
			"Authorization": `Bearer ${ACCESS_TOKEN}`
		};
	}
	fetch(`${API_URL}/resource/secret`, { headers }).then(resp => {
		UIUpdate.updateCat(resp.status);
		return resp.text();
	}).then(data => {
		UIUpdate.alertBox(data);
	});
});

logoutBtn.addEventListener("click", (event) => {
	ACCESS_TOKEN = undefined;
	UIUpdate.loggedOut();
});

loginBtn.addEventListener("click", (event) => {
	webAuth.authorize();
});

parseHash = () => {
  // let hash = window.location.hash.substr(0,1) == "#" ? window.location.hash.substr(1) : window.location.hash;
  // let queryParams = {};
  // hash.split("&").map(param => {
  //   param = param.split("=");
  //   queryParams[param[0]] = param[1];
  // });
  // if (queryParams.access_token && queryParams.expires_in) {
  //   ACCESS_TOKEN = queryParams.access_token;
  //   UIUpdate.loggedIn();
  // }
  // window.location.hash = "";
  webAuth.parseHash(function(err, authResult) {
    if (authResult && authResult.accessToken) {
      window.location.hash = '';
      ACCESS_TOKEN = authResult.accessToken;
      UIUpdate.loggedIn();
    }
  });
};

window.addEventListener("DOMContentLoaded", parseHash);


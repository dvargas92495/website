const axios = require("axios");
const crypto = require("crypto");
const OAuth = require("oauth-1.0a");

const oauth = OAuth({
  consumer: {
    key: process.env.INSTAPAPER_CLIENT_ID,
    secret: process.env.INSTAPAPER_CLIENT_SECRET,
  },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return crypto.createHmac("sha1", key).update(base_string).digest("base64");
  },
});

const tokenRequestData = {
  url: "https://instapaper.com/api/1/oauth/access_token",
  method: "POST",
  data: {
    x_auth_username: process.env.INSTAPAPER_USERNAME,
    x_auth_password: process.env.INSTAPAPER_PASSWORD,
    x_auth_mode: "client_auth",
  },
};

axios({
  ...tokenRequestData,
  form: oauth.authorize(tokenRequestData),
})
  .then(res => console.log(`TOKEN: ${res.data}`))
  .catch(e => console.error(JSON.stringify(e.message)));

/*
const requestData = {
  url: "https://instapaper.com/api/1/bookmarks/list",
  method: "POST",
  data: {},
};

axios({
  ...requestData,
  headers: oauth.toHeader(oauth.authorize(requestData, {})),
})
  .then(res => console.log(res.data))
  .catch(e => console.error(JSON.stringify(e.message)));
*/
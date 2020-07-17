const axios = require("axios");
var ClientOAuth2 = require('client-oauth2')

// https://www.npmjs.com/package/oauth-1.0a
var instapaperOauth = new ClientOAuth2({
  clientId: process.env.INSTAPAPER_CLIENT_ID,
  clientSecret: process.env.INSTAPAPER_CLIENT_SECRET,
  accessTokenUri: 'https://instapaper.com/api/1/oauth/access_token',
  authorizationUri: 'https://instapaper.com/api/1/account/verify_credentials',
  redirectUri: 'http://example.com/auth/github/callback',
  scopes: ['notifications', 'gist']
})

axios
  .post("https://instapaper.com/api/1/bookmarks/list")
  .then(res => console.log(res.data));

console.log();

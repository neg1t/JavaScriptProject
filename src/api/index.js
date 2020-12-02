import Unsplash from 'unsplash-js';

export const unsplash = new Unsplash({ 
  accessKey: "[YOUR ACCESS_KEY HERE]",
  secret: '[YOUR SECRET HERE]',
  callbackUrl: "[YOUR CALLBACK_URL HERE]",
});
  
export const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "write_likes"
]);


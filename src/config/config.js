import { config } from 'dotenv';
config();

export default {
  PORT: process.env.PORT || 8080,
  URLMONGO: process.env.URLMONGO,
  SECRET: process.env.SECRET,
  /* Dialogflow */
  GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
  DF_LANGUAGE_CODE: process.env.DF_LANGUAGE_CODE,
  GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
  TWILIOACCOUNTSID: process.env.TWILIOACCOUNTSID,
  TWILIOAUTHTOKEN: process.env.TWILIOAUTHTOKEN,
  TWILIOPHONEFROM: process.env.TWILIOPHONEFROM,
  OPENWEATHERKEY: process.env.OPENWEATHERKEY,
};

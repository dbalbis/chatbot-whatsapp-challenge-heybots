import twilio from 'twilio';
import config from '../config/config.js';

const client = twilio(config.TWILIOACCOUNTSID, config.TWILIOAUTHTOKEN);

async function sendMessage(sender, message) {
  try {
    const twilioResponse = await client.messages.create({
      body: ` ${message}`,
      from: `whatsapp:${config.TWILIOPHONEFROM}`,
      to: `whatsapp:+${sender}`,
    });

    return twilioResponse;
  } catch (error) {
    console.log('Hubo un error enviando el mensaje a Twilio', error);
    throw error;
  }
}

export default sendMessage;

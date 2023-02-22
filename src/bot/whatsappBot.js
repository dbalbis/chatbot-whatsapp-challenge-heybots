import express from 'express';
import { WebhookClient } from 'dialogflow-fulfillment';
import { getWeather } from './weather.js';
import twilioSendMessage from '../config/twilio.js';
import sendToDialogFlow from '../config/dialogflow.js';
import generateSessionId from '../utils/generateSessionId.js';
import userModel from '../models/userModel.js';

('use strict');
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
const router = express.Router();

let sessionId = generateSessionId();

let firstTime = true;

// Endpoint para Twilio
router.post('/', async (req, res) => {
  let phone = req.body.WaId;
  /* Para poder acceder al valor de phone desde el otro endpoint */
  process.env.PHONE = phone;
  const isUser = await userModel.find(phone);

  if (isUser) {
    if (firstTime) {
      await twilioSendMessage(
        phone,
        `¡Hola ${isUser[0].firstname}, soy climaBOT 🤖!\n \n🌎 Escribe el nombre de una ciudad para saber su clima. \nEj: _Montevideo._\n \n_O si no lo deseas simplemente escribe Salir._`
      );

      firstTime = false;
    } else {
      let receivedMessage = req.body.Body;
      // Llama al endpoint de Dialogflow para manejar el mensaje recibido
      const dialogflowResponse = await sendToDialogFlow(
        receivedMessage,
        sessionId
      );

      // Procesa la respuesta de Dialogflow y envía la respuesta a través de Twilio
      let responses = dialogflowResponse.fulfillmentMessages;
      for (const response of responses) {
        await twilioSendMessage(phone, response.text.text[0]);
      }
    }
  } else {
    let receivedMessage = req.body.Body;
    console.log('Phone:', phone);

    // Llama al endpoint de Dialogflow para manejar el mensaje recibido
    const dialogflowResponse = await sendToDialogFlow(
      receivedMessage,
      sessionId
    );

    // Procesa la respuesta de Dialogflow y envía la respuesta a través de Twilio
    let responses = dialogflowResponse.fulfillmentMessages;
    for (const response of responses) {
      await twilioSendMessage(phone, response.text.text[0]);
    }
  }

  res.status(200).end();
});

// Endpoint para Dialogflow
router.post('/dialogflow', (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  /* Salir Intent */
  async function handleWelcomeIntent(agent) {
    try {
      const phone = process.env.PHONE;
      const isUser = await userModel.find(phone);
      if (isUser) {
        agent.add(
          `¡Hola ${isUser[0].firstname}, soy climaBOT 🤖!\n \n🌎 Escribe el nombre de una ciudad para saber su clima. \nEj: _Montevideo._\n \n_O si no lo deseas simplemente escribe Salir._`
        );
      } else {
        agent.add(
          `¡Hola soy climaBOT 🤖!\n \nPara poder darte informacion, necesito que te registres. \n\n📲 Escribe *REGISTRAR* para continuar.\n \n_O si no lo deseas simplemente escribe Salir._`
        );
      }
    } catch (error) {
      console.log('Hubo un error en el intent Salir');
    }
  }

  /* Clima Intent */

  async function handleWeatherIntent(agent) {
    try {
      const phone = process.env.PHONE;
      const isUser = await userModel.find(phone);
      if (isUser) {
        const parameters = agent.parameters;
        const city = parameters.city;
        const weatherData = await getWeather(city);
        await agent.add(weatherData);
        await agent.add('¿Quiéres consultar alguna otra ciudad? 🚀');
        await agent.add('_Si quieres terminar la conversacion escribe SALIR_');
      } else {
        await agent.add(
          '¡Hola Soy un climaBOT 🤖!\nPara poder darte informacion, necesito que te registres. \n \n📲 Escribe REGISTRAR para continuar. \n \nO si no lo deseas simplemente escribe Salir.'
        );
      }
    } catch (error) {
      console.log('Error in handleWeatherIntent:', error);
    }
  }

  /* Register Intent */
  async function handleRegisterIntent(agent) {
    try {
      const parameters = agent.parameters;
      const phone = process.env.PHONE;
      const firstname = parameters.firstname;
      const lastname = parameters.lastname;
      const email = parameters.email;

      // Hacer algo con los parámetros recibidos
      const newUser = {
        firstname,
        lastname,
        email,
        phone,
      };

      await userModel.add(newUser);

      agent.add(`¡Bienvenido ${firstname}! Gracias por registrarte. 👋🏻 `);
      agent.add(
        `¡Hola ${firstname}, soy climaBOT 🤖!\n \n🌎 Escribe el nombre de una ciudad para saber su clima. \nEj: _Montevideo._\n \n_O si no lo deseas simplemente escribe Salir._`
      );
    } catch (error) {
      console.log('Hubo un error manejando la funcion con dialogflow', error);
    }
  }

  /* Salir Intent */
  async function handleSalirIntent(agent) {
    try {
      const phone = process.env.PHONE;
      const isUser = await userModel.find(phone);
      if (isUser) {
        agent.add(
          `¡Hasta luego ${isUser[0].firstname}, si me necesitas solo escribeme! 🚀\nEj: _*Hola*._`
        );
      } else {
        agent.add(
          '¡Hasta luego, si me necesitas solo escribeme! 🚀\nEj: _*Hola*._'
        );
      }
    } catch (error) {
      console.log('Hubo un error en el intent Salir');
    }
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', handleWelcomeIntent);
  intentMap.set('Register', handleRegisterIntent);
  intentMap.set('Clima', handleWeatherIntent);
  intentMap.set('Salir', handleSalirIntent);

  agent.handleRequest(intentMap);
});

export default router;

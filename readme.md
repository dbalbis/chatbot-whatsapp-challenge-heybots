# Clima Chatbot con API. Challenge HeyNow
## Node, Twilio, DialogFlow, MongoDB & OpenWeather!
ENV TEMPLATE
```
PORT=
URLMONGO=
SECRET=
**DIALOGFLOW**
GOOGLE_PROJECT_ID=
DF_LANGUAGE_CODE=
GOOGLE_CLIENT_EMAIL=
GOOGLE_PRIVATE_KEY=
**TWILIO**
TWILIOACCOUNTSID=
TWILIOAUTHTOKEN=
TWILIOPHONEFROM=
**OPENWEATHER**
OPENWEATHERKEY=
**PHONE**
PHONE=<valor_de_phone> (DEJAR ASI)
```

## Descripcion:
El Chatbot consta de dos endpoints:

 -   `/`: Este endpoint maneja los mensajes enviados por los usuarios a través de Twilio. Cuando un usuario envía un mensaje a través de Twilio, el mensaje se envía al endpoint Dialogflow utilizando la función `sendToDialogFlow`. Si Dialogflow devuelve una respuesta, se envía a través de Twilio. Si no hay respuesta, se envía un mensaje de error al usuario.
 -   `/dialogflow`: Este endpoint maneja las solicitudes entrantes de Dialogflow. Hay cuatro intenciones configuradas en Dialogflow: bienvenida, clima, registro y salir. Cuando Dialogflow detecta la intención de un usuario, llama a la función correspondiente en el código. Si el usuario ya está registrado, el bot devuelve la información del clima para la ciudad solicitada. Si el usuario no está registrado, se le pide que se registre antes de poder obtener información sobre el clima.
## Dependencias utilizadas
 - Axios 
 - DialogFlow
 - DialogFlow-Fullfillment
 - dotENV
 - Express
 - Mongoose
 - Twilio
## Resumen
El servidor de la aplicación es el componente principal. Utiliza el servicio de Dialogflow para procesar las solicitudes del usuario y proporcionar respuestas adecuadas. 

Además, utiliza el paquete de Mongoose para acceder y gestionar la base de datos que almacena información del usuario.

Para enviar y recibir mensajes de texto, la aplicación utiliza el servicio de Twilio. Y para hacer solicitudes HTTP a la API de OpenWeatherMap, utiliza el paquete Axios.

El componente final es el servicio de pronóstico del tiempo, que es la API de OpenWeatherMap. Este servicio proporciona información sobre el clima actual.






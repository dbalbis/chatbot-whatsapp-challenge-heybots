import express from 'express';
const app = express();
import config from './config/config.js';
import routes from './routes/index.js';
import databaseConfig from './config/database.js';

// Conectando con la base de datos de MongoDB
databaseConfig.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Server */

app.listen(config.PORT, (err) => {
  if (err) {
    console.log(`Se produjo un error al iniciar el servidor: ${err}`);
  } else {
    console.log(`Servidor escuchando puerto: ${config.PORT}`);
  }
});

/* Rutas */

app.use('/', routes);

/* Not Found 404 */
app.use((req, res, next) => {
  const err = new Error('Not found!');
  console.log(err);
  err.status = 404;
  next(err);
});

import mongoose from "mongoose";
import config from "./config.js";

const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(config.URLMONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Conexión exitosa a la base de datos MongoDB");
    })
    .catch((error) => {
      console.error("Error al conectarse a la base de datos MongoDB", error);
    });
};

export default { connect };

import mongoose from 'mongoose';

export class mongoContainer {
  constructor(collectionName, schema) {
    this.collection = collectionName;
    this.model = mongoose.model(collectionName, mongoose.Schema(schema));
  }
  /* Generales */

  async add(data) {
    try {
      data.timestamp = Date.now();
      const res = await this.model.create(data);
      return res;
    } catch (error) {
      console.log(`error agregando ${this.collection}: ${error}`);
    }
  }

  async find(phone) {
    try {
      const data = await this.model.find({ phone: phone });
      if (data.length > 0) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      logger.error('Error buscando los mensajes', error);
    }
  }
}

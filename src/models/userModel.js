import { mongoContainer } from "../controllers/mongoController.js";

class UsersModel extends mongoContainer {
  constructor() {
    super("whatsappBOT", {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      phone: { type: Number, required: true },
      email: { type: String, required: true, unique: true },
    });
  }
}

export default new UsersModel();

const { v4: uuidv4 } = require("uuid");
const database = require("../database/db.js");

class UsersRepository {
  listContacts() {
    return database.get("users").value();
  }

  getById(id) {
    return database.get("users").find({ id }).value();
  }

  addContact(body) {
    const id = uuidv4();
    const newUser = {
      id,
      ...body,
    };
    database.get("users").push(newUser).write();
    return newUser;
  }

  update(id, body) {
    const updatedUser = database.get("users").find({ id }).assign(body).value();
    database.write();
    return updatedUser.id ? updatedUser : null;
  }

  removeContact(id) {
    const [record] = database.get("users").remove({ id }).write();
    return record;
  }
}

module.exports = UsersRepository;

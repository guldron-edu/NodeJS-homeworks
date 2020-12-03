const { UsersRepository } = require("../repo");

class UsersService {
  constructor() {
    this.repositories = {
      users: new UsersRepository(),
    };
  }
  listContacts() {
    const data = this.repositories.users.listContacts();
    return data;
  }
  getById({ contactId }) {
    const data = this.repositories.users.getById(contactId);
    return data;
  }
  addContact(body) {
    const data = this.repositories.users.addContact(body);
    return data;
  }
  update({ contactId }, body) {
    const data = this.repositories.users.update(contactId, body);
    return data;
  }
  removeContact(contactId) {
    const data = this.repositories.users.removeContact(contactId);
    return data;
  }
}

module.exports = UsersService;

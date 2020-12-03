const { ContactsRepository } = require("../repo");

class ContactsService {
  constructor() {
    this.repositories = {
      contacts: new ContactsRepository(),
    };
  }
  listContacts(query, userId) {
    const data = this.repositories.contacts.listContacts(query, userId);
    return data;
  }
  getById({ contactId }, userId) {
    const data = this.repositories.contacts.getById(contactId, userId);
    return data;
  }
  addContact(body, userId) {
    const data = this.repositories.contacts.addContact(body, userId);
    return data;
  }
  update({ contactId }, body, userId) {
    const data = this.repositories.contacts.update(contactId, body, userId);
    return data;
  }
  removeContact(contactId, userId) {
    const data = this.repositories.contacts.removeContact(contactId, userId);
    return data;
  }
}

module.exports = ContactsService;

const ContactsRepository = require("../repo");

class ContactsService {
  constructor() {
    this.repositories = {
      contacts: new ContactsRepository(),
    };
  }
  listContacts() {
    const data = this.repositories.contacts.listContacts();
    return data;
  }
  getById({ contactId }) {
    const data = this.repositories.contacts.getById(contactId);
    return data;
  }
  addContact(body) {
    const data = this.repositories.contacts.addContact(body);
    return data;
  }
  update({ contactId }, body) {
    const data = this.repositories.contacts.update(contactId, body);
    return data;
  }
  removeContact(contactId) {
    const data = this.repositories.contacts.removeContact(contactId);
    return data;
  }
}

module.exports = ContactsService;

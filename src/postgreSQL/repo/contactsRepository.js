const sequelize = require("../database/db.js");

class ContactsRepository {
  constructor() {
    this.database = sequelize;
  }
  async listContacts() {
    const contactList = await this.database.models.Contact.findAll({});
    return contactList;
  }

  async getById(id) {
    const contact = await this.database.models.Contact.findByPk(id);
    return contact;
  }

  async addContact(body) {
    const newContact = await this.database.models.Contact.create(body);
    return newContact;
  }

  async update(id, body) {
    const contact = await this.database.models.Contact.findByPk(id);
    return contact ? contact.update(body) : null;
  }

  async removeContact(id) {
    const contact = await this.database.models.Contact.findByPk(id);
    contact ? contact.destroy() : null;
    return contact;
  }
}

module.exports = ContactsRepository;

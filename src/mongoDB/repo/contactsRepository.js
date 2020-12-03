const Contact = require("../schema/contactsSchema.js");

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }
  async listContacts() {
    const contactList = await this.model.find({});
    return contactList;
  }

  async getById(id) {
    const contact = await this.model.find({ _id: id });
    return contact;
  }

  async addContact(body) {
    const newContact = await this.model.create(body);
    return newContact;
  }

  async update(id, body) {
    console.log("body", body);
    const Contact = await this.model.findByIdAndUpdate(
      { _id: id },
      { ...body },
      { new: true }
    );
    return Contact;
  }

  async removeContact(id) {
    const contact = await this.model.findByIdAndDelete({ _id: id });
    return contact;
  }
}

module.exports = ContactsRepository;

const Contact = require("../schema/contactsSchema.js");

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }

  async listContacts({ limit = 5, filter, page = 1, sub }, userId) {
    // if (sub) {
    //   const contacts = await this.model.find({
    //     subscruption: sub,
    //     owner: userId,
    //   });
    //   return contacts;
    // }
    const query = sub
      ? { owner: userId, subscription: sub }
      : { owner: userId };

    const {
      docs: contacts,
      totalDocs: totalContacts,
      totalPages,
    } = await this.model.paginate(query, {
      limit,
      page: Number(page),
      select: filter,
    });

    return {
      contacts,
      totalContacts,
      limit,
      page,
      totalPages,
    };
  }

  async getById(id, userId) {
    const contact = await this.model.find({ _id: id, owner: userId }).populate({
      path: "owner",
      select: "name email phone -_id",
    });
    return contact;
  }

  async addContact(body, userId) {
    const newContact = await this.model.create({ ...body, owner: userId });

    return newContact;
  }

  async update(id, body, userId) {
    const Contact = await this.model.findByIdAndUpdate(
      { _id: id, owner: userId },
      { ...body },
      { new: true }
    );
    return Contact;
  }

  async removeContact(id, userId) {
    const contact = await this.model.findByIdAndDelete({
      _id: id,
      owner: userId,
    });
    return contact;
  }
}

module.exports = ContactsRepository;

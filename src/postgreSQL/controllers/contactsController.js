const HttpCode = require("../helpers/constants.js");
const ContactsService = require("../services/");

const contactsService = new ContactsService();

const listContacts = async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts();
    res.status(HttpCode.OK).json({
      status: HttpCode.OK,
      data: {
        contacts,
      },
    });
  } catch (e) {
    next(e);
  }
};
const getById = async (req, res, next) => {
  try {
    const contact = await contactsService.getById(req.params);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
};
const addContact = async (req, res, next) => {
  // const { name, email, phone } = req.body;
  try {
    // if (!req.body.name || !req.body.email || !req.body.phone) { }
    const contact = await contactsService.addContact(req.body);
    return res.status(HttpCode.CREATED).json({
      status: HttpCode.CREATED,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
};
const update = async (req, res, next) => {
  try {
    if (!req.body) {
      return next({
        status: HttpCode.BAD_REQUEST,
        message: "missing fields",
      });
    } else {
      const contact = await contactsService.update(req.params, req.body);
      if (contact) {
        return res.status(HttpCode.OK).json({
          status: HttpCode.OK,
          data: {
            contact,
          },
        });
      } else {
        return next({
          status: HttpCode.NOT_FOUND,
          message: "Not found",
        });
      }
    }
  } catch (e) {
    next(e);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const contact = await contactsService.removeContact(req.params.contactId);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: HttpCode.OK,
        message: "contact deleted",
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { listContacts, getById, addContact, update, removeContact };

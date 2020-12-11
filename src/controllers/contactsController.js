const { HttpCode } = require("../helpers/constants.js");
const { ContactsService } = require("../services/");

const contactsService = new ContactsService();

const listContacts = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const contacts = await contactsService.listContacts(req.query, userId);

    return res.status(HttpCode.OK).json({
      status: HttpCode.OK,
      data: {
        ...contacts,
      },
    });
  } catch (e) {
    return next(e);
  }
};
const getById = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const contact = await contactsService.getById(req.params, userId);
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
  const userId = req.user._id;
  const { name, email, phone, subscription, password, token } = req.body;

  try {
    const contact = await contactsService.addContact(
      { name, email, phone, subscription, password, token },
      userId
    );

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
    const userId = req.user._id;

    if (!req.body) {
      return next({
        status: HttpCode.BAD_REQUEST,
        message: "missing fields",
      });
    } else {
      const contact = await contactsService.update(
        req.params,
        req.body,
        userId
      );
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
    const userId = req.user._id;

    const contact = await contactsService.removeContact(
      req.params.contactId,
      userId
    );
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

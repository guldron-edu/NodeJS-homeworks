const HttpCode = require("../helpers/constants.js");
const UsersService = require("../services/userService.js");

const usersService = new UsersService();

const listContacts = (req, res, next) => {
  try {
    const users = usersService.listContacts();
    res.status(HttpCode.OK).json({
      status: HttpCode.OK,
      data: {
        users,
      },
    });
  } catch (e) {
    next(e);
  }
};
const getById = (req, res, next) => {
  try {
    const user = usersService.getById(req.params);
    if (user) {
      return res.status(HttpCode.OK).json({
        status: HttpCode.OK,
        data: {
          user,
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
const addContact = (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    // if (!req.body.name || !req.body.email || !req.body.phone) { }
    const user = usersService.addContact(req.body);
    return res.status(HttpCode.CREATED).json({
      status: HttpCode.CREATED,
      data: {
        user,
      },
    });
  } catch (e) {
    next(e);
  }
};
const update = (req, res, next) => {
  try {
    if (!req.body) {
      return next({
        status: HttpCode.BAD_REQUEST,
        message: "missing fields",
      });
    } else {
      const user = usersService.update(req.params, req.body);
      if (user) {
        return res.status(HttpCode.OK).json({
          status: HttpCode.OK,
          data: {
            user,
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

const removeContact = (req, res, next) => {
  try {
    const user = usersService.removeContact(req.params.contactId);
    if (user) {
      return res.status(HttpCode.OK).json({
        status: HttpCode.OK,
        message: "contact deleted",
        data: {
          user,
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

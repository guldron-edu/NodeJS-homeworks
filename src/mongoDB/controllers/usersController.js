const { HttpCode } = require("../helpers/constants.js");
const { UsersService } = require("../services/");

const usersService = new UsersService();

const getCurrent = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const currentUser = await usersService.getById(userId);
    if (currentUser) {
      return res.status(HttpCode.OK).json({
        status: HttpCode.OK,
        data: {
          user: {
            email: currentUser.email,
            subscription: currentUser.subscription,
          },
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateSub = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const userSub = req.body.subscription;
    const updatedUser = await usersService.updateSub(userSub, userId);

    if (updatedUser) {
      return res.status(HttpCode.OK).json({
        status: HttpCode.OK,
        data: {
          user: {
            email: updatedUser.email,
            subscription: updatedUser.subscription,
          },
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

module.exports = { getCurrent, updateSub };

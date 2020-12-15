const { HttpCode } = require("../helpers/constants.js");
const { authService, usersService } = require("../services/");

const reg = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;
    const searchedUser = await usersService.getByEmail(email);

    if (searchedUser) {
      return next({
        status: HttpCode.CONFLICT,
        message: "Email in use",
      });
    }

    const newUser = await usersService.addUser({
      email,
      password,
      subscription,
    });
    return res.status(HttpCode.CREATED).json({
      status: HttpCode.CREATED,
      data: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatar: newUser.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const response = await authService.login(email, password);

    if (response) {
      const { user, token } = response;
      return res.status(HttpCode.OK).json({
        status: HttpCode.OK,
        data: {
          token,
          user: {
            email: user.email,
            subscription: user.subscription,
          },
        },
      });
    }
    return res.status(HttpCode.UNAUTORIZED).json({
      status: HttpCode.UNAUTORIZED,
      message: "Email or password is wrong",
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await authService.logout(userId);
    return res.status(HttpCode.NO_CONTENT).json({
      status: HttpCode.NO_CONTENT,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { reg, login, logout };

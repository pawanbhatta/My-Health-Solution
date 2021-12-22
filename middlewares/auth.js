const User = require("../models/User");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const jwt = require("jsonwebtoken");

module.exports = isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) return next(CustomErrorHandler.unAuthenticated());

    const token = authHeader.split(" ")[1];

    const user = await jwt.verify(token, "myjwtsecret");

    if (!user) throw CustomErrorHandler.unAuthenticated("Token is invalid");

    const getUser = await User.findOne({ _id: user.id }).select(
      "-_v -password"
    );
    req.user = getUser;
    return next();
  } catch (error) {
    res.status(500).json(CustomErrorHandler.serverError());
  }
};

// module.exports = isAuthorized = async (req, res, next) => {
//   try {
//     console.log("is authorized");
//     console.log(req.user);
//     if (req.user.isExpert) return next();
//     throw CustomErrorHandler.unAuthorized();
//   } catch (error) {
//     res.status(500).json(CustomErrorHandler.serverError());
//   }
// };

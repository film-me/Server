module.exports = function (app) {
  const user = require("./userController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");

  // 회원가입 API
  app.post("/filme/user", user.postUsers);

  // 로그인 API
  app.post("/filme/user/login", user.login);

  // 아이디 중복 확인 API
  app.get("/filme/user/id-check", user.idCheck);
};

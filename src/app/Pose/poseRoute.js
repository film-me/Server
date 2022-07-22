module.exports = function (app) {
  const pose = require("./poseController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");
  // 포즈자랑 삭제 api
  app.patch("/filme/pose/:poseId", pose.deletePose);
  // 포즈 좋아요
  app.post("/filme/like/:poseId", pose.likePose);
};

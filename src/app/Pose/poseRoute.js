module.exports = function (app) {
  const pose = require("./poseController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");
  const imageUploader = require("./imageUploader");

  // 포즈자랑 삭제 api
  app.patch("/filme/pose/:poseId", pose.deletePose);
  // 포즈 좋아요
  app.post("/filme/like/:poseId", pose.likePose);

  // 3. 포즈 전체 조회 API
  app.get("/filme/pose", pose.getPoses);

  // 4. 특정 포즈 조회 API
  app.get("/filme/pose/:poseIdx", pose.getOnePose);

  // 5. 포즈 등록 API
  app.post("/filme/pose", imageUploader.single("image"), pose.insertPose);
};

const schedule = require("node-schedule");
const pose = require("./poseController");
const { checkCache, getPosesCache } = require("../../../config/redis");
module.exports = function (app) {
  const pose = require("./poseController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");
  const imageUploader = require("./imageUploader");

  // 이벤트
  const schedule = require("node-schedule");
  const test = schedule.scheduleJob("0 0 0 * * *", pose.initViews);

  // 포즈자랑 삭제 api
  app.patch("/filme/pose/:poseId", jwtMiddleware, pose.deletePose);

  // 포즈 좋아요
  app.post("/filme/like/:poseId", jwtMiddleware, pose.likePose);

  // 3. 포즈 전체 조회 API
  app.get("/filme/pose", getPosesCache, jwtMiddleware, pose.getPoses);

  // 4. 특정 포즈 조회 API
  app.get("/filme/pose/:poseId", jwtMiddleware, pose.getOnePose);

  // 5. 포즈 등록 API(갤러리)
  app.post(
    "/filme/poseGallery",
    jwtMiddleware,
    imageUploader.single("image"),
    pose.insertPoseFromGallery
  );

  // 6. 포즈 등록 API(스토리)
  app.post("/filme/poseStory", jwtMiddleware, pose.insertPoseFromStory);
};

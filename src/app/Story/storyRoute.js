module.exports = function (app) {
  const story = require("./storyController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");
  const imageUploader = require("../Pose/imageUploader");

  // 포토스토리 조회 api
  app.get("/filme/story", jwtMiddleware, story.getStory);

  // 프레임 조회 api
  app.get("/filme/frame", story.getFrame);

  // 특정 포토스토리 조회
  app.get("/filme/story/:storyIdx", story.getOneStory);

  // 포토스토리 등록
  app.post(
    "/filme/story",
    jwtMiddleware,
    imageUploader.single("image"),
    story.postStory
  );

  // 포토스토리 수정
  app.put("/filme/story/:storyIdx", story.editStory);

  // 포토스토리 삭제
  app.patch("/filme/story/:storyIdx", story.deleteStory);
};

module.exports = function (app) {
  const story = require("./storyController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");
  // 포토스토리 조회 api
  app.get("/filme/story", story.getStory);
};

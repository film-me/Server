const storyService = require("./storyService");
const storyProvider = require("./storyProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

// 스토리 조회 api
exports.getStory = async function (req, res) {
  //   const userIdFromJWT = req.verifiedToken.userId;
  const userIdFromJWT = 1;
  const getStoryResponse = await storyProvider.getStory(userIdFromJWT);
  return res.send(getStoryResponse);
};

// 프레임 조회 api
exports.getFrame = async function (req, res) {
  //   const userIdFromJWT = req.verifiedToken.userId;
  const userIdFromJWT = 1;
  const getFrameResponse = await storyProvider.getFrame();
  return res.send(getFrameResponse);
};

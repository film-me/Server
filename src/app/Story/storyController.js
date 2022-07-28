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
  const userIdFromJWT = 1;
  const getFrameResponse = await storyProvider.getFrame();
  return res.send(getFrameResponse);
};

//특정 스토리 조회 
exports.getOneStory= async function(req, res) {
  
   const storyIdx = req.params.storyIdx;

  if (!storyIdx)
      return res.send(response( baseResponse.STORY_ID_EMPTY));
 
  const getOneStoryResponse = await storyProvider.getOneStory(
     storyIdx
  );
  if (getOneStoryResponse == 0 )
      return res.send(response( baseResponse.STORY_NOT_EXIST));
  else 
      return res.send( getOneStoryResponse);

};
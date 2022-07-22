const poseService = require("./poseService");
const poseProvider = require("./poseProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

// 포즈자랑 삭제 api
exports.deletePose = async function (req, res) {
  let poseId = req.params.poseId;
  if (!poseId) return res.send(errResponse(baseResponse.POSE_ID_EMPTY));
  //   const userIdFromJWT = req.verifiedToken.userId;
  const userIdFromJWT = 1;
  const userId = poseProvider.getUserFromPose(poseId);
  if (userIdFromJWT != userId)
    return res.send(errResponse(baseResponse.NO_RIGHT));

  const deletePoseResponse = await poseService.deletePose(poseId);
  return res.send(deletePoseResponse);
};

// 포즈 좋아요 api
exports.likePose = async function (req, res) {
  let poseId = req.params.poseId;
  //   const userIdFromJWT = req.verifiedToken.userId;
  const userIdFromJWT = 1;
  if (!poseId) return res.send(errResponse(baseResponse.POSE_ID_EMPTY));
  const likePoseResponse = await poseService.likePose(poseId, userIdFromJWT);
  return res.send(likePoseResponse);
};

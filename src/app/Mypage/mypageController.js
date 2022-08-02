const jwtMiddleware = require("../../../config/jwtMiddleware");
const mypageProvider = require("../../app/Mypage/mypageProvider");
const mypageService = require("../../app/Mypage/mypageService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

/**
 * API No.
 * API Name : 내 포즈자랑 조회
 * [GET] /filme/mypage/pose
 */
exports.getMyPoseList = async function (req, res) {
  const userIdFromJWT = req.verifiedToken.userInfo;
  if (!userIdFromJWT) return res.send(response(baseResponse.TOKEN_EMPTY));

  const getMyPoseResponse = await mypageProvider.getMyPoseList(userIdFromJWT);

  return res.send(getMyPoseResponse);
};

exports.getLikePoseList = async function (req, res) {
  const userIdFromJWT = req.verifiedToken.userInfo;
  if (!userIdFromJWT) return res.send(response(baseResponse.TOKEN_EMPTY));

  const getLikePoseResponse = await mypageProvider.getLikePoseList(
    userIdFromJWT
  );

  return res.send(getLikePoseResponse);
};

/**
 *
 * API No.
 * API Name : 내 정보 조회
 * [GET] /filme/mypage/myinfo
 */
exports.getMyInfo = async function (req, res) {
  const userIdFromJWT = req.verifiedToken.userInfo;
  if (!userIdFromJWT) return res.send(response(baseResponse.TOKEN_EMPTY));

  const getMyInfoResponse = await mypageProvider.getMyInfo(userIdFromJWT);

  return res.send(getMyInfoResponse);
};

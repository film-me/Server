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

//프로필 사진 수정
exports.editProfileImg = async function (req, res) {
  const userIdFromJWT = req.verifiedToken.userInfo;
  const imageURL = req.file.location;

  if (!userIdFromJWT) return res.send(response(baseResponse.TOKEN_EMPTY));
  if (!imageURL)
    return res.json({
      isSuccess: false,
      code: 210,
      message: "변경할 사진을 선택하세요.",
    });

  const editProfileImgResult = await mypageService.editProfileImg(
    userIdFromJWT,
    imageURL
  );
  return res.send(editProfileImgResult);
};

//닉네임 수정
exports.editNickname = async function (req, res) {
  const userIdFromJWT = req.verifiedToken.userInfo;
  const { nickname } = req.body;

  if (!userIdFromJWT) return res.send(response(baseResponse.TOKEN_EMPTY));
  if (!nickname)
    return res.json({
      isSuccess: false,
      code: 105,
      message: "닉네임을 입력 해주세요.",
    });

  const editNickname = await mypageService.editNickname(
    userIdFromJWT,
    nickname
  );
  return res.send(editNickname);
};

exports.getTodayInfo = async function (req, res) {
  const memberIdx = req.verifiedToken.userInfo;

  const getTodayInfoResult = await mypageProvider.getTodayInfo(memberIdx);
  return res.send(getTodayInfoResult);
};

// 다른 사람 정보 조회
exports.getOtherInfo = async function (req, res) {
  const memberIdx = req.params.memberIdx;
  console.log(memberIdx);

  const getOtherInfoResult = await mypageProvider.getOtherInfo(memberIdx);
  return res.send(getOtherInfoResult);
};

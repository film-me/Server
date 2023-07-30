const jwtMiddleware = require("../../../config/jwtMiddleware");
const poseService = require("./poseService");
const poseProvider = require("./poseProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { CF } = require("nodeml");
const { setCache } = require("../../../config/redis");

// 오늘의 조회수 초기화
exports.initViews = async function () {
  console.log("실행");
  await poseProvider.initViews();
};

// 포즈자랑 삭제 api
exports.deletePose = async function (req, res) {
  let poseId = req.params.poseId;
  if (!poseId) return res.send(errResponse(baseResponse.POSE_ID_EMPTY));

  const userIdFromJWT = req.verifiedToken.userInfo;
  if (!userIdFromJWT) return res.send(response(baseResponse.TOKEN_EMPTY));
  const userId = await poseProvider.getUserFromPose(poseId);
  if (userIdFromJWT != userId.memberIdx)
    return res.send(errResponse(baseResponse.NO_RIGHT));

  const deletePoseResponse = await poseService.deletePose(poseId);
  return res.send(deletePoseResponse);
};

// 포즈 좋아요 api
exports.likePose = async function (req, res) {
  let poseId = req.params.poseId;
  const userIdFromJWT = req.verifiedToken.userInfo;
  if (!userIdFromJWT) return res.send(response(baseResponse.TOKEN_EMPTY));
  if (!poseId) return res.send(errResponse(baseResponse.POSE_ID_EMPTY));
  const likePoseResponse = await poseService.likePose(poseId, userIdFromJWT);
  return res.send(likePoseResponse);
};

/**
 * API No. 3
 * API Name : 포즈 전체 조회
 * [GET] filme/pose?filter=?
 */
exports.getPoses = async function (req, res) {
  const filter = req.query.filter; // 1. 최신 순, 2. 좋아요 순, 3. 추천 순(수정 필요)
  const userIdx = req.verifiedToken.userInfo;
  if (!userIdx) return res.send(response(baseResponse.TOKEN_EMPTY));
  if (filter == 3) {
    let likeInfoResult = await poseProvider.getLikeInfo();
    likeInfoResult = Object.values(JSON.parse(JSON.stringify(likeInfoResult)));
    const cf = new CF();

    cf.maxRelatedItem = 30;
    cf.maxRelatedUser = 30;

    cf.train(likeInfoResult, "memberIdx", "poseIdx", "rate");
    let getRecommendResult = cf.recommendToUser(userIdx, 30); // userIdx에게 count개의 pose추천
    let poseList = [];
    for (let i = 0; i < getRecommendResult.length; i++) {
      poseList.push(parseInt(getRecommendResult[i].itemId));
    }

    let getPosesResult = await poseProvider.getRecommendPoses(poseList);
    setCache("pose/" + filter, getPosesResult);
    return res.send(getPosesResult);
  }

  const getPosesResult = await poseProvider.getPoses(filter);
  setCache("pose/" + filter, getPosesResult);
  return res.send(getPosesResult);
};

/**
 * API No. 4
 * API Name : 특정 포즈 조회
 * [GET] filme/pose/:poseId
 */
exports.getOnePose = async function (req, res) {
  const poseId = req.params.poseId;
  const userId = req.verifiedToken.userInfo;
  if (!userId) return res.send(response(baseResponse.TOKEN_EMPTY));
  const getOnePoseResponse = await poseProvider.getOnePose(userId, poseId);

  return res.send(getOnePoseResponse);
};

/**
 * API No. 5
 * API Name : 포즈 등록1(갤러리에서 가져오기)
 * [POST] /filme/poseGallery
 */
exports.insertPoseFromGallery = async function (req, res) {
  const memberIdx = req.verifiedToken.userInfo;

  if (!memberIdx) return res.send(response(baseResponse.TOKEN_EMPTY));
  console.log(req.file);
  const imageURL = req.file.location;

  const insertPoseGalleryResult = await poseService.insertPose(
    memberIdx,
    imageURL
  );
  return res.send(insertPoseGalleryResult);
};

/**
 * API No. 6
 * API Name : 포즈 등록2(포토스토리에서 가져오기)
 * [POST] /filme/poseStory
 */
exports.insertPoseFromStory = async function (req, res) {
  const memberIdx = req.verifiedToken.userInfo;
  const { storyIdx } = req.body;

  const imageURL = await poseProvider.getStoryImageURL(storyIdx);
  if (imageURL == 0) {
    return res.send("유효하지 않은 storyIdx 임요"); // 형식 맞춰서 수정 필요
  }
  const insertPoseStoryResult = await poseService.insertPose(
    memberIdx,
    imageURL
  );
  return res.send(insertPoseStoryResult);
};

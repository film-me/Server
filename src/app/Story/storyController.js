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
exports.getOneStory = async function (req, res) {
  const storyIdx = req.params.storyIdx;

  if (!storyIdx) return res.send(response(baseResponse.STORY_ID_EMPTY));

  const getOneStoryResponse = await storyProvider.getOneStory(storyIdx);
  if (getOneStoryResponse == 0)
    return res.send(response(baseResponse.STORY_NOT_EXIST));
  else return res.send(getOneStoryResponse);
};

// 스토리 등록
exports.postStory = async function (req, res) {
  // TODO: jwt 추가 후 memberIdx는 헤더로 받기
  const { memberIdx, imageURL, content, date } = req.body;

  if (!imageURL)
    return res.json({
      isSuccess: false,
      code: 105,
      message: "이미지 url을 입력해주세요.",
    });

  if (!content)
    return res.json({
      isSuccess: false,
      code: 105,
      message: "메모를 입력해주세요.",
    });

  if (!date)
    return res.json({
      isSuccess: false,
      code: 105,
      message: "날짜를 입력해주세요.",
    });

  const postStoryResponse = await storyService.postStory(
    memberIdx,
    imageURL,
    content,
    date
  );

  return res.send(postStoryResponse);
};

// 스토리 수정
exports.editStory = async function (req, res) {
  const idx = req.params.storyIdx;
  const { imageURL, content, date } = req.body;

  if (!idx)
    return res.json({
      isSuccess: false,
      code: 105,
      message: "스토리 idx를 입력해주세요.",
    });

  if (!imageURL)
    return res.json({
      isSuccess: false,
      code: 105,
      message: "이미지 url을 입력해주세요.",
    });

  if (!content)
    return res.json({
      isSuccess: false,
      code: 105,
      message: "메모를 입력해주세요.",
    });

  if (!date)
    return res.json({
      isSuccess: false,
      code: 105,
      message: "날짜를 입력해주세요.",
    });

  // TODO: 본인이 작성한 스토리가 맞는 지 확인하기

  const editStoryResponse = await storyService.editStory(
    idx,
    imageURL,
    content,
    date
  );

  return res.send(editStoryResponse);
};

// 스토리 삭제
exports.deleteStory = async function (req, res) {
  const idx = req.params.storyIdx;
  if (!idx)
    return res.json({
      isSuccess: false,
      code: 105,
      message: "스토리 idx를 입력해주세요.",
    });
  const getOneStoryResponse = await storyProvider.getOneStory(idx);
  if (getOneStoryResponse == 0) {
    return res.send(response(baseResponse.STORY_NOT_EXIST));
  } else {
    const deleteStory = await storyService.deleteStory(idx);
    return res.send(deleteStory);
  }
};

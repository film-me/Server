module.exports = function (app) {
  const mypage = require("./mypageController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");

  // 내 포즈자랑 조회
  app.get("/filme/mypage/pose", jwtMiddleware, mypage.getMyPoseList);

  // 내가 좋아요 한 포즈 조회
  app.get("/filme/mypage/like-pose", jwtMiddleware, mypage.getLikePoseList);

  // 내 정보 조회
  app.get("/filme/mypage/myinfo", jwtMiddleware, mypage.getMyInfo);

  // 프로필 사진 수정
  app.post("/filme/mypage/edit-image",jwtMiddleware,mypage.editProfileImg);

  //닉네임 수정
  app.post("/filme/mypage/edit-nickname",jwtMiddleware,mypage.editNickname);

};

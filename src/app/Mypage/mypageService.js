const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const secret_config = require("../../../config/secret");
const mypageProvider = require("./mypageProvider");
const mypageDao = require("./mypageDao");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { connect } = require("http2");

// 프로필 사진 변경 
exports.editProfileImg = async function (
  userId, imageUrl
) {
  try {

    const connection = await pool.getConnection(async (conn) => conn);
    const editProfileImg = await mypageDao.updateUserProfileImg(connection,userId,imageUrl);
    connection.release();
    const editProfileImgResult = await mypageProvider.getUserImg(userId);
    return { isSuccess: true, code: 200, result: editProfileImgResult[0] };

 
  } catch (err) {
    logger.error(`App - editProfileImg Service error\n: ${err.message}`);
    return {
      isSuccess: false,
      code: 401,
      message: "App - editProfileImg Service error",
    };
  }
};


// 닉네임 변경
exports.editNickname = async function (
    userId, nickname
  ) {
    try {
      if (nickname.length > 20) 
        return {
          isSuccess: false,
          code: 109,
          message: "닉네임은 10자리 미만으로 입력해주세요.",
        };
      
      console.log(nickname) ;
      const connection = await pool.getConnection(async (conn) => conn);
      const editNickname = await mypageDao.updateUserNickname(connection,userId,nickname);
      connection.release();
      const editNicknameResult = await mypageProvider.getUserNickname(userId);
      return { isSuccess: true, code: 200, result: editNicknameResult[0] };
  
   
    } catch (err) {
      logger.error(`App - editNickname Service error\n: ${err.message}`);
      return {
        isSuccess: false,
        code: 401,
        message: "App - editNickname Service error",
      };
    }
  };
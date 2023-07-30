const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const secret_config = require("../../../config/secret");
const userProvider = require("./userProvider");
const userDao = require("./userDao");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { connect } = require("http2");

// 회원가입
exports.createUser = async function (
  identification,
  password,
  name,
  profileURL
) {
  try {
    // 이메일 중복 확인
    const idRows = await userProvider.idCheck(identification);
    if (idRows.length > 0) {
      return {
        isSuccess: false,
        code: 303,
        message: "존재하는 아이디입니다.",
      };
    }

    // 비밀번호 암호화
    const hashedPassword = await crypto
      .createHash("sha512")
      .update(password)
      .digest("hex");

    const insertUserParams = [identification, hashedPassword, name, profileURL];

    const connection = await pool.getConnection(async (conn) => conn);
    const userIdResult = await userDao.insertUser(connection, insertUserParams);
    console.log(`추가된 회원 : ${userIdResult[0].insertId}`);
    connection.release();
    return { isSuccess: true, code: 200, message: "회원가입 성공" };
  } catch (err) {
    logger.error(`App - createUser Service error\n: ${err.message}`);
    return {
      isSuccess: false,
      code: 401,
      message: "App - postSignIn Service error",
    };
  }
};

// 로그인
exports.signIn = async function (identification, password) {
  try {
    // 회원 확인
    const idRows = await userProvider.idCheck(identification);
    if (idRows.length < 1) {
      return {
        isSuccess: false,
        code: 107,
        message: "이메일을 확인해주세요.",
      };
    }

    // 계정 상태 확인
    const userRow = await userProvider.accountCheck(identification);

    // userIdx 가져오기
    const userIdx = userRow[0].idx;

    // 탈퇴한 계정일 경우
    if (userRow[0].status === "DELETED") {
      return {
        isSuccess: false,
        code: 304,
        message: "탈퇴 된 계정입니다. 고객센터에 문의해주세요.",
      };
    }

    // 비밀번호 가져오기
    const userSecurityData = await userProvider.retrieveUserHashedPassword(
      userIdx
    );

    // 비밀번호 맞는지 확인
    const userHashedPassword = userSecurityData.hashedPassword;
    const hashedPassword = await crypto
      .createHash("sha512")
      .update(password)
      .digest("hex");
    if (userHashedPassword !== hashedPassword) {
      return {
        isSuccess: false,
        code: 306,
        message: "비밀번호를 확인해주세요.",
      };
    }

    //토큰 생성 Service
    let token = await jwt.sign(
      {
        userInfo: userIdx,
      }, // 토큰의 내용(payload)
      secret_config.jwtsecret, // 비밀 키
      {
        expiresIn: "365d",
        subject: "userInfo",
      } // 유효 시간은 365일
    );

    const loginObject = Object.assign({ token: token }, { userIdx: userIdx });
    return loginObject;
  } catch (err) {
    logger.error(
      `App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(
        err
      )}`
    );
    return {
      isSuccess: false,
      code: 401,
      message: "App - postSignIn Service error",
    };
  }
};

module.exports = {
  // Success
  SUCCESS: { isSuccess: true, code: 1000, message: "성공" },

  // Common
  TOKEN_EMPTY: {
    isSuccess: false,
    code: 2000,
    message: "JWT 토큰을 입력해주세요.",
  },
  TOKEN_VERIFICATION_FAILURE: {
    isSuccess: false,
    code: 20,
    message: "JWT 토큰 검증 실패",
  },
  TOKEN_VERIFICATION_SUCCESS: {
    isSuccess: true,
    code: 1001,
    message: "JWT 토큰 검증 성공",
  },

  //Request error
  SIGNUP_EMAIL_EMPTY: {
    isSuccess: false,
    code: 2001,
    message: "이메일을 입력해주세요",
  },
  SIGNUP_EMAIL_LENGTH: {
    isSuccess: false,
    code: 2002,
    message: "이메일은 30자리 미만으로 입력해주세요.",
  },
  SIGNUP_EMAIL_ERROR_TYPE: {
    isSuccess: false,
    code: 2003,
    message: "이메일 형식을 정확하게 입력해주세요.",
  },
  SIGNUP_PASSWORD_EMPTY: {
    isSuccess: false,
    code: 2004,
    message: "비밀번호를 입력 해주세요.",
  },
  SIGNUP_PASSWORD_LENGTH: {
    isSuccess: false,
    code: 2005,
    message: "비밀번호는 6~12자리로 입력해주세요.",
  },
  SIGNUP_PASSWORD_ERROR_TYPE: {
    isSuccess: false,
    code: 2006,
    message: "비밀번호에 영문, 숫자를 포함시켜주세요.",
  },
  USER_ID_EMPTY: {
    isSuccess: false,
    code: 2007,
    message: "유저 id가 입력되지 않았습니다.",
  },
  SIGNIN_TOKEN_EMPTY: {
    isSuccess: false,
    code: 2008,
    message: "로그인하고자 하는 토큰을 입력해주세요.",
  },
  POSE_ID_EMPTY: {
    isSuccess: false,
    code: 2009,
    message: "유저 id가 입력되지 않았습니다.",
  },
  NO_RIGHT: { isSuccess: false, code: 2010, message: "접근 권한이 없습니다." },
  // Response error
  SIGNUP_REDUNDANT_EMAIL: {
    isSuccess: false,
    code: 3001,
    message: "중복된 이메일입니다.",
  },

  STORY_ID_EMPTY: {
    isSuccess: false,
    code: 4001,
    message: "storyId가 입력되지 않았습니다.",
  },

  STORY_NOT_EXIST: {
    isSuccess: false,
    code: 4002,
    message: "해당 스토리가 존재하지 않습니다.",
  },

  //Connection, Transaction 등의 서버 오류
  DB_ERROR: { isSuccess: false, code: 4000, message: "데이터 베이스 에러" },
  SERVER_ERROR: { isSuccess: false, code: 4001, message: "서버 에러" },
};

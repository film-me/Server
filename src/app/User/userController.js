const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");

const regExpPassword = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,12}$/; // 비밀번호 조합 및 길이 체크 정규식(최소 6 ~ 12자, 영문, 숫자 포함)
const regExpId = /^[a-z]+[a-z0-9]{5,19}$/;
const { emit } = require("nodemon");

const Cache = require("memory-cache");
const CryptoJS = require("crypto-js");

/**
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
exports.postUsers = async function (req, res) {
  /**
   * Body: identification, password, name, profileURL
   */
  let { identification, password, name, profileURL } = req.body;

  // TODO: s3에 올린 이미지로 변경 예정
  if (!profileURL)
    profileURL =
      "https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_1280.png";

  if (!identification) {
    return res.json({
      isSuccess: false,
      code: 105,
      message: "아이디를 입력 해주세요.",
    });
  }

  if (!regExpId.test(identification)) {
    return res.json({
      isSuccess: false,
      code: 301,
      message: "아이디 형식을 정확하게 입력 해주세요.",
    });
  }

  if (!password) {
    return res.json({
      isSuccess: false,
      code: 105,
      message: "비밀번호를 입력 해주세요.",
    });
  }

  if (!regExpPassword.test(password)) {
    return res.json({
      isSuccess: false,
      code: 302,
      message: "비밀번호 형식을 정확하게 입력 해주세요.",
    });
  }

  if (!name) {
    return res.json({
      isSuccess: false,
      code: 105,
      message: "닉네임을 입력 해주세요.",
    });
  }

  if (name.length > 20) {
    return res.json({
      isSuccess: false,
      code: 109,
      message: "닉네임은 10자리 미만으로 입력해주세요.",
    });
  }

  const signUpResponse = await userService.createUser(
    identification,
    password,
    name,
    profileURL
  );

  return res.send(signUpResponse);
};

/**
 * API Name : 로그인 API
 * [POST] /app/users/login
 */
exports.login = async function (req, res) {
  const { identification, password } = req.body;

  // 이메일 체크
  if (!identification) {
    return res.json({
      isSuccess: false,
      code: 105,
      message: "아이디를 입력 해주세요.",
    });
  }

  if (!regExpId.test(identification)) {
    return res.json({
      isSuccess: false,
      code: 301,
      message: "아이디 형식을 정확하게 입력 해주세요.",
    });
  }

  if (!password) {
    return res.json({
      isSuccess: false,
      code: 105,
      message: "비밀번호를 입력 해주세요.",
    });
  }

  const signInComplete = await userService.signIn(identification, password);
  if (signInComplete.isSuccess == false) return res.json(signInComplete);

  return res.json({
    isSuccess: true,
    code: 200,
    message: "로그인 성공",
    result: signInComplete,
  });
};

/**
 * API Name : 아이디 중복 확인 API
 * [GET] /filme/user/id-check
 * query string: identification
 */
exports.idCheck = async function (req, res) {
  const identification = req.query.identification;

  if (!identification) {
    return res.json({
      isSuccess: false,
      code: 105,
      message: "아이디를 입력 해주세요.",
    });
  }

  if (!regExpId.test(identification)) {
    return res.json({
      isSuccess: false,
      code: 301,
      message: "아이디 형식을 정확하게 입력 해주세요.",
    });
  }

  // 닉네임 중복 확인
  const identificationRows = await userProvider.idCheck(identification);
  if (identificationRows.length > 0) {
    return res.json({
      isSuccess: false,
      code: 306,
      message: "이미 존재하는 아이디입니다.",
    });
  }
  return res.json({
    isSuccess: true,
    code: 1000,
    message: "사용 가능한 아이디입니다.",
  });
};

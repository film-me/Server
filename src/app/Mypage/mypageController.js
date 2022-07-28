const jwtMiddleware = require("../../../config/jwtMiddleware");
const mypageProvider = require("../../app/Mypage/mypageProvider");
const mypageService = require("../../app/Mypage/mypageService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regExpPassword = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,12}$/; // 비밀번호 조합 및 길이 체크 정규식(최소 6 ~ 12자, 영문, 숫자 포함)
const regexEmail = require("regex-email");
const {emit} = require("nodemon");

const Cache = require('memory-cache');
const CryptoJS = require('crypto-js');

/**
 * API No. 
 * API Name : 내 포즈자랑 조회
 * [GET] /app/users
 */
exports.getMyPoseList = async function (req, res) {

    /**
     * userId
     */
     //const userId = req.verifiedToken.userId;
     const userId = req.body.userId;

    if (!userId)
        return res.send(response(baseResponse.USER_ID_EMPTY));
   
    const getMyPoseResponse = await mypageProvider.getMyPoseList(
       userId
    );

    return res.send(getMyPoseResponse);
};

exports.getLikePoseList= async function(req, res) {
    /**
     * userId
     */
     //const userId = req.verifiedToken.userId;
     const userId = req.body.userId;

    if (!userId)
        return res.send(response(baseResponse.USER_ID_EMPTY));
   
    const getLikePoseResponse = await mypageProvider.getLikePoseList(
       userId
    );

    return res.send(getLikePoseResponse);

};



/**
 * 
 * API No. 
 * API Name : 내 정보 조회 
 * [GET] /filme/mypage/myinfo
 */
exports.getMyInfo= async function(req, res) {
    /**
     * userID
     */
     //const userId = req.verifiedToken.userId;
     const userId = req.body.userId;

    if (!userId)
        return res.send(response( baseResponse.USER_ID_EMPTY));
   
    const getMyInfoResponse = await mypageProvider.getMyInfo(
       userId
    );
    
        return res.send( getMyInfoResponse);

};
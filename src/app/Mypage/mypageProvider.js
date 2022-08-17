const baseResponseStatus = require("../../../config/baseResponseStatus");
const { pool } = require("../../../config/database");
const { errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const mypageDao = require("./mypageDao");

// Provider: Read 비즈니스 로직 처리

exports.getMyPoseList = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectMyPoseResult = await mypageDao.selectUserPoseList(connection,userId); 
  connection.release();

  return selectMyPoseResult;
};

exports.getLikePoseList = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const selectLikePoseResult = await mypageDao.selectUserLikePoseList(connection,userId); 
    connection.release();
  
    return selectLikePoseResult;
  };




exports.getMyInfo = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const selectUserInfoResult = await mypageDao.selectUserInfo(connection,userId); 
    connection.release();

    
      return selectUserInfoResult;
  };


  exports.getUserNickname = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const selectUserNicknameResult = await mypageDao.selectUserNickname(connection,userId); 
    connection.release();

    
      return selectUserNicknameResult;
  };

  exports.getUserImg = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const selectUserImgResult = await mypageDao.selectUserImg(connection,userId); 
    connection.release();

    
      return selectUserImgResult;
  };

exports.getTodayInfo = async function(memberIdx) {
    const connection = await pool.getConnection(async(conn) => conn);
    const getTodayInfoResult = await mypageDao.getTodayInfo(connection, memberIdx);
    connection.release();

    return getTodayInfoResult;
}

exports.getOtherInfo = async function(memberIdx) {
    const connection = await pool.getConnection(async(conn) => conn);
    const getOtherInfoResult = await mypageDao.getOtherInfo(connection, memberIdx);
    console.log(getOtherInfoResult);
    connection.release();

    return getOtherInfoResult;
}
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
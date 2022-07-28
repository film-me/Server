const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const storyProvider = require("./storyProvider");
const storyDao = require("./storyDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");

exports.postStory = async function (memberIdx, imageURL, content, date) {
  try {
    const insertStoryParams = [memberIdx, imageURL, content, date];
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      await connection.beginTransaction(); // START TRANSACTION
      const StoryIdResult = await storyDao.insertStory(
        connection,
        insertStoryParams
      );
      await connection.commit(); // COMMIT
      connection.release();
      return response(baseResponse.SUCCESS);
    } catch (err) {
      connection.rollback(); //ROLLBACK
      connection.release();
      logger.error(`App - postStory Transaction error\n: ${err.message}`);
      return errResponse(baseResponse.DB_ERROR);
    }
  } catch (err) {
    logger.error(`App - postStory Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

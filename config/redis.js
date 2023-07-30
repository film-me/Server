const redis = require("redis");
const bluebird = require("bluebird");
bluebird.promisifyAll(redis);
const redisClient = redis.createClient({
  host: `127.0.0.1`,
  port: 6379,
  legacyMode: true,
});
redisClient.on(`connect`, () => {
  console.info(`Redis connected!`);
});
redisClient.on(`error`, (err) => {
  console.error(`Redis Client Error`, err);
});
redisClient.connect().then();
const redisCli = redisClient.v4;

const setCache = async (key, value) => {
  await redisCli.set(key, JSON.stringify(value));
  await redisCli.expire(key, 300);
};

const deleteCache = async (key) => {
  await redisCli.delAsync(key);
};

const getPosesCache = async (req, res, next) => {
  let key = "pose/" + req.query.filter;
  try {
    const data = JSON.parse(await redisCli.get(key));
    if (data) {
      res.status(200).json({
        data: data,
      });
    } else next();
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: err,
    });
  }
};

module.exports = {
  setCache,
  getPosesCache,
  deleteCache,
};

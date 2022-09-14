const redis = require("redis");
const bluebird = require("bluebird");
bluebird.promisifyAll(redis);
const redisClient = redis.createClient({
  url: `redis-19304.c267.us-east-1-4.ec2.cloud.redislabs.com:19304`,
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
  await redisCli.expire(key, 3600);
};

const deleteCache = async (key) => {
  await redisClient.delAsync(key);
};

const getPosesCache = async (req, res, next) => {
  let key = "pose/" + req.query.filter;
  try {
    const data = JSON.parse(await redisCli.get(key));
    if (data) {
      if (redisCli.ttl(key) < 300) {
        await redisCli.setex(key, 3600, data);
      }
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

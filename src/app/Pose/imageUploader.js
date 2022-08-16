const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const awsKey = require("../../../config/aws");

AWS.config.update({
  region: "ap-northeast-2",
  accessKeyId: awsKey.accessKeyId,
  secretAccessKey: awsKey.secretAccessKey,
});

const s3 = new AWS.S3();

const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp"];
let contentType;

const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: awsKey.bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE, // 자동으로 콘텐츠 타입 세팅, 얘를 지정해줘야 octet-stream으로 들어가지 않음
    key: (req, file, callback) => {
      contentType = path.extname(file.originalname).replace(".", "");
      let extension = path.extname(file.originalname); // 확장자명 추출
      callback(null, "pose/" + Date.now().toString() + extension); // 버킷 내 pose 폴더에 'Date.now().toString()+확장자명'인 파일이름으로 저장
    },
    acl: "public-read-write",
  }),
});

module.exports = imageUploader;

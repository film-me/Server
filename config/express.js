const express = require("express");
const compression = require("compression");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
var cors = require("cors");
module.exports = function () {
  const app = express();

  app.use(compression());

  app.use(express.json({ limit: "10mb" }));

  app.use(express.urlencoded({ limit: "10mb", extended: false }));

  app.use(bodyParser.json({ limit: 10000000 }));

  app.use(methodOverride());

  app.use(cors());
  // app.use(express.static(process.cwd() + '/public'));

  require("../src/app/User/userRoute")(app);
  require("../src/app/Pose/poseRoute")(app);
  require("../src/app/Story/storyRoute")(app);
  require("../src/app/Mypage/mypageRoute")(app);

  return app;
};

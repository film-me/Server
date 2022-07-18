module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 2. 유저 생성 (회원가입) API
    app.post('/app/users', user.postUsers);
};

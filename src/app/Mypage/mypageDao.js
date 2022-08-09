// 나의 포즈자랑 조회 
async function selectUserPoseList(connection, userId) {
    const selectUserPoseQuery = `
    select p.idx as poseIdx , p.imageURL as poseImgUrl, p.views as viewCount
    from Poses as p join Members M on p.memberIdx = M.idx
    where M.idx = ?;
    `;

    const selectUserPoseRow = await connection.query(
        selectUserPoseQuery, [userId]
    );
  
    return selectUserPoseRow[0];
  }

  // 내가 좋아요 한 포즈 조회 
async function selectUserLikePoseList(connection, userId) {

    const selectUserLikePoseQuery = `
    select p.idx as poseIdx , p.memberIdx as poseHostIdx, p.imageURL as poseImgUrl, p.views as viewCount
    from Poses as p join Likes L on p.idx = L.poseIdx
    where p.status = 'ACTIVATE' and L.status = 'ACTIVATE' #이거 주인이 삭제하면 다 삭제
          and L.memberIdx= 1 ;
    `;

    const selectUserLikePoseRow = await connection.query(
        selectUserLikePoseQuery, userId
    );
  
    return selectUserLikePoseRow[0];
  }
  

  
 // 내 정보 조회
 async function selectUserInfo(connection, userId) {

  const selectUserInfolQuery = `
  select m.profileURL , m.name as nickname , m.level
  from Members as m
  where m.status = 'ACTIVATE' and m.idx = ? ;  
  `;

  const selectUserInfoRow = await connection.query(
      selectUserInfolQuery, userId
  );

  return selectUserInfoRow[0];
}

// 프로필 이미지 변경
async function updateUserProfileImg(connection, userId,imageUrl) {

  const updateUserProfileImgQuery = `
  update Members set profileURL = ? where idx = ?;  
  `;

  const updateUserProfileImgRow = await connection.query(
    updateUserProfileImgQuery, [imageUrl,userId]
  );

  return updateUserProfileImgRow[0];
}



// 닉네임 변경 
async function updateUserNickname(connection, userId,nickname) {

  const updateUserNicknameQuery = `
  update Members set name = ? where idx = ?;  
  `;

  const updateUserNicknameRow = await connection.query(
    updateUserNicknameQuery, [nickname,userId]
  );

  return updateUserNicknameRow[0];
}

async function selectUserNickname(connection, userId) {

  const resultNicknameQuery = `
  select name as nickname
  from Members 
  where idx= ?
  `;

  const resultNicknameRow = await connection.query(
    resultNicknameQuery, userId
  );

  return resultNicknameRow[0];
}

async function selectUserImg(connection, userId) {

  const selectUserImgQuery = `
  select profileUrl 
  from Members 
  where idx= ?
  `;

  const selectUserImgRow = await connection.query(
    selectUserImgQuery, userId
  );

  return selectUserImgRow[0];
}


module.exports = {
    selectUserPoseList,
    selectUserLikePoseList,
    selectUserInfo,
    updateUserProfileImg,
    updateUserNickname,
    selectUserNickname,
    selectUserImg,
  };
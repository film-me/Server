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


module.exports = {
    selectUserPoseList,
    selectUserLikePoseList,
    selectUserInfo,
  };
async function deletePose(connection, poseId) {
  const deletePoseQuery = `
        update Poses p set status = 'DELETED' where p.idx = ?
    `;
  const deletePoseRow = await connection.query(deletePoseQuery, poseId);

  return deletePoseRow;
}
async function likePose(connection, poseId, userId) {
  const likePoseQuery = `
        insert into Likes(memberIdx, poseIdx)
        values (?, ?);
    `;
  const likePoseRow = await connection.query(likePoseQuery, [userId, poseId]);

  return likePoseRow;
}
async function selectUserFromPose(connection, poseId) {
  const getUserIdFromPoseQuery = `
        select p.memberIdx
        from Poses p
        where p.id = ?
    `;
  const selectUserFromPoseRow = await connection.query(likePoseQuery, poseId);

  return selectUserFromPoseRow;
}
async function selectLike(connection, poseId, userId) {
  const selectLikeFromPoseandUserQuery = `
        select l.*
        from Likes l 
        join Poses p on l.poseIdx = p.idx
        join Members m on l.memberIdx = m.idx
        where p.idx = ? and m.idx = ?
    `;
  const selectLikeFromPoseandUserRow = await connection.query(
    selectLikeFromPoseandUserQuery,
    [poseId, userId]
  );

  return selectLikeFromPoseandUserRow[0];
}
async function updateLikeStatus(connection, poseId, userId, status) {
  const updateLikeStatusQuery = `
        update Likes l
        set l.status = ?
        where l.poseIdx = ? and l.memberIdx = ?
    `;
  const selectLikeFromPoseandUserRow = await connection.query(
    updateLikeStatusQuery,
    [status, poseId, userId]
  );

  return selectLikeFromPoseandUserRow;
}

// 포즈 전체 조회
async function getPoses(connection, order) {

  const getPosesQuery = `
    select p.idx, p.imageURL, ifnull(x.likeCnt, 0) likeCnt
    from Poses p
           left join (
      select l.poseIdx, count(*) likeCnt
      from Likes l
      group by l.poseIdx
    ) x on x.poseIdx = p.idx

    order by `+order+`;
  `;

  const getPosesRow = await connection.query(getPosesQuery);
  return getPosesRow[0];
}

// 특정 포즈 조회
async function getOnePose(connection, poseIdx) {

  const getOnePoseQuery = `
    select m.idx, m.profileURL, m.name,p.imageURL, ifnull(x.likeCnt, 0) likeCnt, p.views, ifnull((
    select count(*)
    from Likes l
    where l.memberIdx = ?
    and l.poseIdx = ?
    group by l.poseIdx
    ), 0) isLike
from Poses p
join Members m on m.idx = p.memberIdx
left join (
    select l.poseIdx, count(*) likeCnt
    from Likes l
    group by l.poseIdx
    ) x on x.poseIdx = p.idx
where p.idx = ? and p.status='ACTIVATE';
  `;
  const getOnePoseRow = await connection.query(getOnePoseQuery, [1, poseIdx, poseIdx]);
  return getOnePoseRow[0];
}

// 포즈 등록
async function insertPose(connection, memberIdx, imageURL) {
  const insertPoseQuery = `
    INSERT INTO Poses(memberIdx, imageURL)
    VALUES (?, ?);
  `;

  const insertPoseRow = await connection.query(insertPoseQuery, [memberIdx, imageURL])
}

async function getLikeInfo(connection) {
  const testQuery = `
    select poseIdx, memberIdx, 10 as rate
    from Likes
  `
  const testRow = await connection.query(testQuery)
  return testRow[0];
}

module.exports = {
  deletePose,
  likePose,
  selectUserFromPose,
  selectLike,
  updateLikeStatus,
  getOnePose,
  insertPose,
  getPoses,
  getLikeInfo,
};

async function initViews(connection) {
  const initViewsQuery = `
    update Poses p
    set p.todayViews = 0;
  `;
  await connection.query(initViewsQuery);
  return;
}

async function deletePose(connection, poseId) {
  const deletePoseQuery = `
        update Poses p set status = 'DELETED' where p.idx = ? and p.status='ACTIVATE';
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
        select memberIdx
        from Poses p
        where p.idx = ? and p.status = 'ACTIVATE'
    `;
  const selectUserFromPoseRow = await connection.query(
    getUserIdFromPoseQuery,
    poseId
  );

  return selectUserFromPoseRow[0];
}
async function selectLike(connection, poseId, userId) {
  const selectLikeFromPoseandUserQuery = `
        select l.*
        from Likes l 
        join Poses p on l.poseIdx = p.idx
        join Members m on l.memberIdx = m.idx
        where p.idx = ? and m.idx = ? and p.status = 'ACTIVATE' and m.status = 'ACTIVATE'
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
        where l.poseIdx = ? and l.memberIdx = ?;
    `;
  const selectLikeFromPoseandUserRow = await connection.query(
    updateLikeStatusQuery,
    [status, poseId, userId]
  );

  return selectLikeFromPoseandUserRow;
}

// 포즈 전체 조회
async function getPoses(connection, order) {
  const getPosesQuery =
    `
    select p.idx, p.memberIdx, p.imageURL, ifnull(x.likeCnt, 0) likeCnt
    from Poses p
           left join (
      select l.poseIdx, count(*) likeCnt
      from Likes l
      group by l.poseIdx
    ) x on x.poseIdx = p.idx
    where p.status = 'ACTIVATE'

    order by ` +
    order +
    `;
  `;

  const getPosesRow = await connection.query(getPosesQuery);
  return getPosesRow[0];
}

// 추천포즈 조회
async function getRecommendPoses(connection, poseList) {
  let Query;
  Query = `
  select idx, memberIdx, imageURL, ifnull(x.likeCnt, 0) likeCnt
  from Poses
  left join (
      select l.poseIdx, count(*) likeCnt
      from Likes l
      group by l.poseIdx
    ) x on x.poseIdx = Poses.idx
  where status = 'ACTIVATE' and idx in (${poseList})
  order by FIELD(idx, ${poseList});
  `;
  const recommendData = await connection.query(Query);

  Query = `
  select idx, memberIdx, imageURL, ifnull(x.likeCnt, 0) likeCnt
  from Poses
  left join (
      select l.poseIdx, count(*) likeCnt
      from Likes l
      group by l.poseIdx
    ) x on x.poseIdx = Poses.idx
  where status = 'ACTIVATE' and idx not in (${poseList})
  order by createdAt desc;
  `;
  const data = await connection.query(Query);
  const getPosesRow = recommendData[0].concat(data[0]);

  return getPosesRow;
}

// 특정 포즈 조회
async function getOnePose(connection, userIdx, poseIdx) {
  const getOnePoseQuery = `
  select m.idx, m.profileURL, m.name,p.imageURL, ifnull(x.likeCnt, 0) likeCnt, p.views, ifnull((
    select count(*)
    from Likes l
    where l.memberIdx = ?
    and l.poseIdx = ? and l.status='ACTIVATE'
    group by l.poseIdx
    ), 0) isLike
from Poses p
join Members m on m.idx = p.memberIdx
left join (
    select l.poseIdx, count(*) likeCnt
    from Likes l
    where l.status = 'ACTIVATE'
    group by l.poseIdx
    ) x on x.poseIdx = p.idx
where p.idx = ? and p.status='ACTIVATE';
  `;
  const getOnePoseRow = await connection.query(getOnePoseQuery, [
    userIdx,
    poseIdx,
    poseIdx,
  ]);

  const upViewsQuery = `
    update Poses p
    set p.views = p.views+1, p.todayViews = p.todayViews+1
    where p.idx = ? and p.status='ACTIVATE';
  `;
  const upViewsQueryResult = await connection.query(upViewsQuery, [poseIdx]);

  return getOnePoseRow[0];
}

// 포즈 등록
async function insertPose(connection, memberIdx, imageURL) {
  const insertPoseQuery = `
    INSERT INTO Poses(memberIdx, imageURL)
    VALUES (?, ?);
  `;

  const insertPoseRow = await connection.query(insertPoseQuery, [
    memberIdx,
    imageURL,
  ]);
}

// 포즈 개수 확인
async function checkPoseCount(connection, memberIdx) {
  const checkPoseCountQuery = `
    select count(p.idx) poseCount
    from Poses p
    where p.memberIdx = ? and status='ACTIVATE';
  `;
  const result = await connection.query(checkPoseCountQuery, [memberIdx]);
  return result[0];
}

// 레벨업
async function levelUp(connection, memberIdx, level) {
  const levelUpQuery = `
    update Members m
    set m.level = ?
    where m.idx = ? and status='ACTIVATE';
  `;
  await connection.query(levelUpQuery, [level, memberIdx]);
}

async function getLikeInfo(connection) {
  const testQuery = `
    select poseIdx, memberIdx, 10 as rate
    from Likes
    where status='ACTIVATE';
  `;
  const testRow = await connection.query(testQuery);
  return testRow[0];
}

async function getStoryImageURL(connection, storyIdx) {
  const getStoryImageURLQuery = `
    select imageURL
    from Stories
    where idx = ? and status='ACTIVATE';
  `;
  const getStoryImageURLRow = await connection.query(getStoryImageURLQuery, [
    storyIdx,
  ]);
  return getStoryImageURLRow[0];
}

module.exports = {
  initViews,
  deletePose,
  likePose,
  selectUserFromPose,
  selectLike,
  updateLikeStatus,
  getOnePose,
  insertPose,
  checkPoseCount,
  levelUp,
  getPoses,
  getLikeInfo,
  getRecommendPoses,
  getStoryImageURL,
};

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

module.exports = {
  deletePose,
  likePose,
  selectUserFromPose,
  selectLike,
  updateLikeStatus,
};

async function selectStory(connection, userId) {
  const selectStoryQuery = `
        select s.idx, s.memberIdx, s.imageURL, s.content, date_format(s.date,'%Y.%m.%d') as date
        from Stories s
        where s.memberIdx = ? and s.status = 'ACTIVATE'
        order by s.createdAt DESC;
    `;
  const selectStoryRow = await connection.query(selectStoryQuery, userId);

  return selectStoryRow;
}

async function selectFrame(connection) {
  const selectFrameQuery = `
        select idx, imageURL
        from Frames
    `;
  const selectFrameRow = await connection.query(selectFrameQuery);

  return selectFrameRow;
}

// 특정 스토리 조회
async function selectStoryDetail(connection, storyIdx) {
  const selectStoryDetailQuery = `
  select date_format(S.date,'%Y.%m.%d') as date, S.imageURL , S.content
  from Stories as S
  where S.idx = ? and S.status='ACTIVATE';
  `;
  const selectStoryDetailRow = await connection.query(
    selectStoryDetailQuery,
    storyIdx
  );

  return selectStoryDetailRow[0];
}

// 스토리 등록
async function insertStory(connection, insertStoryParams) {
  const insertStoryQuery = `
      INSERT INTO Stories(memberIdx, imageURL, content, date)
      VALUES (?, ?, ?, ?);
  `;
  const insertStoryRow = await connection.query(
    insertStoryQuery,
    insertStoryParams
  );
  return insertStoryRow;
}

// 스토리 수정
async function updateStory(connection, updateStoryParams) {
  const updateStoryQuery = `
  UPDATE Stories
  SET imageURL = ?, content = ?, date = ? where idx = ? and status='ACTIVATE';
  `;
  const updateStoryRow = await connection.query(
    updateStoryQuery,
    updateStoryParams
  );
  return updateStoryRow;
}

// 스토리 삭제
async function deleteStory(connection, idx) {
  const deleteStoryQuery = `
  UPDATE Stories SET status = 'DELETED' where idx = ?;
  `;
  const deleteStoryRow = await connection.query(deleteStoryQuery, idx);
  return deleteStoryRow;
}

module.exports = {
  selectStory,
  selectFrame,
  selectStoryDetail,
  insertStory,
  updateStory,
  deleteStory,
};

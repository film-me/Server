async function selectStory(connection, userId) {
  const selectStoryQuery = `
        select s.idx, s.memberIdx, s.imageURL, s.content, s.date
        from Stories s
        where s.memberIdx = ?
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
  select date_format(S.date,'%Y.%m.%d')  as storyDate, S.imageURL as storyImg , S.content as storyMemo
  from Stories  as S
  where S.idx = ? and S.status='ACTIVATE'  ;
  `;
  const selectStoryDetailRow = await connection.query(
    selectStoryDetailQuery,
    storyIdx
  );

  return selectStoryDetailRow[0];
}

// 특정 스토리 조회
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

module.exports = {
  selectStory,
  selectFrame,
  selectStoryDetail,
  insertStory,
};

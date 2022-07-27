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
module.exports = {
  selectStory,
  selectFrame,
};

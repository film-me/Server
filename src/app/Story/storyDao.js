async function selectStory(connection, userId) {
  const selectStoryQuery = `
        select s.idx, s.memberIdx, s.imageURL, s.content, s.date
        from Stories s
        where s.memberIdx = ?
    `;
  const selectStoryRow = await connection.query(selectStoryQuery, userId);

  return selectStoryRow;
}

module.exports = {
  selectStory,
};

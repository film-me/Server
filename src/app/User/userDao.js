// 유저 생성
async function insertUser(connection, insertUserParams) {
  const insertUserQuery = `
      INSERT INTO Members(identification, password, name, profileURL)
      VALUES (?, ?, ?, ?);
  `;
  const insertUserRow = await connection.query(
      insertUserQuery,
      insertUserParams
  );

  return insertUserRow;
};

// 아이디로 회원 조회
async function selectUserId(connection, identification) {
  const selectUserIdQuery = `
      SELECT idx, identification, password, name, level
      FROM Members
      WHERE identification = ? and status = 'ACTIVATE';
  `;
  const [idRow] = await connection.query(selectUserIdQuery, identification);
  return idRow;
};

// 아이디로 회원 상태 조회
async function selectUserAccount(connection, identification) {
  const selectUserAccountQuery = `
      SELECT idx, status
      FROM Members
      WHERE identification = ?;`;
  const selectUserAccountRow = await connection.query(selectUserAccountQuery, identification);

  return selectUserAccountRow[0];
}

// 암호화된 비밀번호 조회
async function selectUserHashedPassword(connection, userIdx) {
  const selectUserHashedPasswordQuery = `
      SELECT password as hashedPassword
      FROM Members
      WHERE idx = ${userIdx} and status = 'ACTIVATE';
  `;
  const [userSecurityRow] = await connection.query(selectUserHashedPasswordQuery);

  return userSecurityRow;
}



module.exports = {
  insertUser,
  selectUserId,
  selectUserAccount,
  selectUserHashedPassword
};
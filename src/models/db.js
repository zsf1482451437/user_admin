const mysql = request("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "user-admin",
});

module.exports = pool;

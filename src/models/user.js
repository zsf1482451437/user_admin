const pool = require("./db");

class UserModel {
  // 获取所有用户
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  }

  // 根据 ID 获取用户
  static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  }

  // 创建用户
  static async create(name, email) {
    const [result] = await pool.query(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );
    return { id: result.insertId, name, email };
  }

  // 更新用户
  static async update(id, name, email) {
    await pool.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [
      name,
      email,
      id,
    ]);
    return { id, name, email };
  }

  // 删除用户
  static async delete(id) {
    await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return { message: "User deleted" };
  }
}

module.exports = UserModel;

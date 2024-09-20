const pool = require("./db");
const formatResponse = require("../utils/formatResponse");

class UserModel {
  // 获取所有用户
  static async getAll() {
    try {
      const [rows] = await pool.query("SELECT * FROM users");
      return formatResponse(rows, "success", "Users retrieved successfully");
    } catch (error) {
      return formatResponse(null, "error", error.message);
    }
  }

  // 根据 ID 获取用户
  static async getById(id) {
    try {
      const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
      return formatResponse(rows[0], "success", "User retrieved successfully");
    } catch (error) {
      return formatResponse(null, "error", error.message);
    }
  }

  // 创建用户
  static async create(name, email) {
    try {
      const [result] = await pool.query(
        "INSERT INTO users (name, email) VALUES (?, ?)",
        [name, email]
      );
      return formatResponse(
        { id: result.insertId, name, email },
        "success",
        "User created successfully"
      );
    } catch (error) {
      return formatResponse(null, "error", error.message);
    }
  }

  // 更新用户
  static async update(id, name, email) {
    try {
      await pool.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [
        name,
        email,
        id,
      ]);
      return formatResponse(
        { id, name, email },
        "success",
        "User updated successfully"
      );
    } catch (error) {
      return formatResponse(null, "error", error.message);
    }
  }

  // 删除用户
  static async delete(id) {
    try {
      await pool.query("DELETE FROM users WHERE id = ?", [id]);
      return formatResponse(null, "success", "User deleted successfully");
    } catch (error) {
      return formatResponse(null, "error", error.message);
    }
  }
}

module.exports = UserModel;

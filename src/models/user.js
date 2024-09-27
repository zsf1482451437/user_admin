const pool = require("./db");
const successHandler = require("../utils/successHandler");
const ErrorHandler = require("../utils/errorHandler");

const GET_ALL_USERS_SQL = "SELECT * FROM users";
const GET_USER_BY_ID_SQL = "SELECT * FROM users WHERE id = ?";
const ADD_USER_SQL =
  "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
const UPDATE_USER_SQL =
  "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
const DELETE_USER_SQL = "DELETE FROM users WHERE id = ?";
const LOGIN_USER_SQL = "SELECT * FROM users WHERE email = ? AND password = ?";

const SELECT_USER_SUCCESS_MESSAGE = "查询成功";
const CREATE_USER_SUCCESS_MESSAGE = "创建成功";
const UPDATE_USER_SUCCESS_MESSAGE = "更新成功";
const DELETE_USER_SUCCESS_MESSAGE = "删除成功";

class UserModel {
  static async executeQuery({
    query,
    params,
    showData = true,
    singleRecord = false,
    successMessage,
    errorMessage,
  }) {
    try {
      const [rows] = await pool.query(query, params);
      const data = showData ? (singleRecord ? rows[0] : rows) : null;
      return successHandler(data, 200, successMessage);
    } catch (error) {
      return ErrorHandler.handleError(error, errorMessage);
    }
  }

  static async getAll() {
    return await UserModel.executeQuery({
      query: GET_ALL_USERS_SQL,
      params: [],
      successMessage: SELECT_USER_SUCCESS_MESSAGE,
    });
  }

  static async getById(id) {
    return await UserModel.executeQuery({
      query: GET_USER_BY_ID_SQL,
      params: [id],
      singleRecord: true,
      successMessage: SELECT_USER_SUCCESS_MESSAGE,
    });
  }

  static async create(name, email, password) {
    return await UserModel.executeQuery({
      query: ADD_USER_SQL,
      params: [name, email, password],
      showData: false,
      successMessage: CREATE_USER_SUCCESS_MESSAGE,
    });
  }

  static async update(id, name, email, password) {
    return await UserModel.executeQuery({
      query: UPDATE_USER_SQL,
      params: [name, email, password, id],
      showData: false,
      successMessage: UPDATE_USER_SUCCESS_MESSAGE,
    });
  }

  static async delete(id) {
    return await UserModel.executeQuery({
      query: DELETE_USER_SQL,
      params: [id],
      showData: false,
      successMessage: DELETE_USER_SUCCESS_MESSAGE,
    });
  }

  static async login(email, password) {
    return await UserModel.executeQuery({
      query: LOGIN_USER_SQL,
      params: [email, password],
      singleRecord: true,
      successMessage: "登录成功",
      errorMessage: "登录失败，用户名或密码错误",
    });
  }
}

module.exports = UserModel;

const UserModel = require("../models/user");

class UserService {
  static async getAllUsers() {
    return await UserModel.getAll();
  }

  static async getUserById(id) {
    return await UserModel.getById(id);
  }

  static async createUser(name, email, password) {
    return await UserModel.create(name, email, password);
  }

  static async updateUser(id, name, email, password) {
    return await UserModel.update(id, name, email, password);
  }

  static async deleteUser(id) {
    return await UserModel.delete(id);
  }

  static async loginUser(email, password) {
    return await UserModel.login(email, password);
  }
}

module.exports = UserService;

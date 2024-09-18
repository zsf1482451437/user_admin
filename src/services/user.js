const UserModel = require("../models/user");

class UserService {
  static async getAllUsers() {
    return await UserModel.getAll();
  }

  static async getUserById(id) {
    return await UserModel.getById(id);
  }

  static async createUser(name, email) {
    return await UserModel.create(name, email);
  }

  static async updateUser(id, name, email) {
    return await UserModel.update(id, name, email);
  }

  static async deleteUser(id) {
    return await UserModel.delete(id);
  }
}

module.exports = UserService;

const UserService = require("../services/user");

class UserController {
  static async getAllUsers(ctx) {
    ctx.body = await UserService.getAllUsers();
  }

  static async getUserById(ctx) {
    const { id } = ctx.params;
    ctx.body = await UserService.getUserById(id);
  }

  static async createUser(ctx) {
    const { name, email, password } = ctx.request.body;
    ctx.body = await UserService.createUser(name, email, password);
  }

  static async updateUser(ctx) {
    const { id } = ctx.params;
    const { name, email, password } = ctx.request.body;
    ctx.body = await UserService.updateUser(id, name, email, password);
  }

  static async deleteUser(ctx) {
    const { id } = ctx.params;
    ctx.body = await UserService.deleteUser(id);
  }

  static async login(ctx) {
    const { email, password } = ctx.request.body;
    ctx.body = await UserService.loginUser(email, password);
  }
}

module.exports = UserController;

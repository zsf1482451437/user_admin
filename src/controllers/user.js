const Router = require("koa-router");
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
    const { name, email } = ctx.request.body;
    ctx.body = await UserService.createUser(name, email);
  }

  static async updateUser(ctx) {
    const { id } = ctx.params;
    const { name, email } = ctx.request.body;
    ctx.body = await UserService.updateUser(id, name, email);
  }

  static async deleteUser(ctx) {
    const { id } = ctx.params;
    ctx.body = await UserService.deleteUser(id);
  }
}

module.exports = UserController;

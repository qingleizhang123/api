const UserModel = require('../model/user');

class UserControler {
  static async login(ctx) {
    let req = ctx.request.body;
    if (req.userName && req.password) {
      try{
        let data = await UserModel.getUser(req);
        ctx.response.status = 200;
        if (data) {
          ctx.body = {
            code: 200,
            msg: '账号密码正确',
            data: data
          }
        } else {
          ctx.body = {
            code: 412,
            msg: '账号密码错误',
            data: data
          }
        }
      } catch(err) {
        ctx.response.status = 412;
        ctx.body = {
          code: 412,
          msg: '账号密码错误',
          data
        }
      }
    }
  }

  static async updatePassword(ctx) {
    let req = ctx.request.body;
    if (req.userName) {
      try {
        let data = await UserModel.updateUserPassword(req);
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: '密码修改成功',
          data
        }
      } catch (err) {
        ctx.response.status = 412;
        ctx.body = {
          code: 412,
          msg: '密码修改失败',
          data
        }
      }
    } else {
      ctx.response.status = 416;
      ctx.body = {
        code: 416,
        msg: '参数不齐全'
      }
    }
  }

  static async create(ctx) {
    let req = ctx.request.body;
    if (req.userName && req.password) {
      try {
        let data = await UserModel.createUser(req);
        ctx.response.status = 200;
        ctx.response.body = {
          code: 200,
          msg: '新建用户成功',
          data
        }
      } catch (err) {
        ctx.response.status = 412;
        ctx.response.body = {
          code: 412,
          msg: '新建用户失败',
          data
        }
      }
    } else {
      ctx.response.status = 416;
      ctx.body = {
        code: 416,
        msg: '参数不齐全'
      }
    }
  }

  static async delete(ctx) {
    let req = ctx.request.body;
    if (req.userName) {
      try {
        let data = await UserModel.deleteUser(req);
        ctx.response.status = 200;
        ctx.response.body = {
          code: 200,
          msg: '删除用户成功',
          data
        }
      } catch (err) {
        ctx.response.status = 412;
        ctx.response.body = {
          code: 412,
          msg: '删除用户失败',
          data
        }
      }
    } else {
      ctx.response.status = 416;
      ctx.body = {
        code: 416,
        msg: '参数不齐全'
      }
    }
  }
}

module.exports = UserControler;
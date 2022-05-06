const UserModel = require('../model/user');
const createToken = require('../utils/createToken');
const checkToken = require('../utils/checkToken');

class UserControler {
  static async login(ctx) {
    const { userName, password } = ctx.request.body;

    if (userName && password) {
      try {
        let data = await UserModel.getUser(userName);
        ctx.response.status = 200;
        if (!data) {
          ctx.body = {
            code: -1,
            msg: '用户名不存在'
          }
        } else if (data.password !== password) {
          ctx.body = {
            code: -1,
            msg: '密码错误'
          }
        } else if (!data.state) {
          ctx.body = {
            code: -1,
            msg: '账号还未审核'
          }
        }else if (data.password === password) {
          const token = createToken(password);
          ctx.body = {
            code: 200,
            msg: '账号密码正确',
            data: data,
            token
          }
        }
      } catch(err) {
        ctx.response.status = 412;
        ctx.body = {
          code: 412,
          msg: '登录失败，请重新登录',
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
        console.log(req);
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
const RoleModel = require('../model/role');
class RoleControler {
  static async create(ctx) {
    let req = ctx.request.body;
    if (req.roleName && req.roleText) {
      try {
        console.log(req);
        let data = await RoleModel.createRole(req);
        ctx.response.status = 200;
        ctx.response.body = {
          code: 200,
          msg: '新建角色成功',
          data
        }
      } catch (err) {
        ctx.response.status = 412;
        ctx.response.body = {
          code: 412,
          msg: '新建角色失败',
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
    if (req.roleName) {
      try {
        let data = await RoleModel.deleteRole(req);
        ctx.response.status = 200;
        ctx.response.body = {
          code: 200,
          msg: '删除角色成功',
          data
        }
      } catch (err) {
        ctx.response.status = 412;
        ctx.response.body = {
          code: 412,
          msg: '删除角色失败',
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

  static async list(ctx) {
    let req = ctx.request.body;
    if (req.page && req.pageSize) {
      try{
        const data = await RoleModel.getRolelist(req);
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: '查询成功',
          data
        }
      }catch(err){
        ctx.response.status = 412;
        ctx.body = {
          code: 412,
          msg: '查询失败',
          err
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

module.exports = RoleControler;
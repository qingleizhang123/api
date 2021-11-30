const PersonModel = require('../model/person');

class PersonControler {
  static async resume(ctx) {
    try{
      let data = await PersonModel.getPersonResume();
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        msg: '查询成功',
        data: data
      }
    } catch(err) {
      ctx.response.status = 412;
      ctx.body = {
        code: 412,
        msg: '查询失败',
        data
      }
    }
  }

  static async update(ctx) {
    let req = ctx.request.body;
    if (req.name) {
      try {
        let data = await PersonModel.updatePersonResume(req);
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: '更新成功',
          data
        }
      } catch (err) {
        ctx.response.status = 412;
        ctx.body = {
          code: 412,
          msg: '更新失败',
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
    if (req.name && req.description) {
      try {
        let data = await PersonModel.createPersonResume(req);
        ctx.response.status = 200;
        ctx.response.body = {
          code: 200,
          msg: '新建博主成功',
          data
        }
      } catch (err) {
        ctx.response.status = 412;
        ctx.response.body = {
          code: 412,
          msg: '新建博主失败',
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
    if (req.name) {
      try {
        let data = await PersonModel.deletePersonResume(req);
        ctx.response.status = 200;
        ctx.response.body = {
          code: 200,
          msg: '删除博主成功',
          data
        }
      } catch (err) {
        ctx.response.status = 412;
        ctx.response.body = {
          code: 412,
          msg: '删除博主失败',
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

module.exports = PersonControler;
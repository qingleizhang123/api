const DeviceModel = require('../model/device');

class DeviceControler {
  static async create(ctx) {
    let req = ctx.request.body;
    if (req.name && req.type && req.factory) {
      try {
        
        let data = await DeviceModel.createDevice(req);
        ctx.response.status = 200;
        ctx.response.body = {
          code: 200,
          msg: '新建器械成功',
          data
        }
      } catch (err) {
        ctx.response.status = 412;
        ctx.response.body = {
          code: 412,
          msg: '新建器械失败',
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
    if (req.id) {
      try {
        let data = await DeviceModel.deleteDevice(req.id);
        ctx.response.status = 200;
        ctx.response.body = {
          code: 200,
          msg: '删除器械成功',
          data
        }
      } catch (err) {
        ctx.response.status = 412;
        ctx.response.body = {
          code: 412,
          msg: '删除器械失败',
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
        const data = await DeviceModel.getDevicelist(req);
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

module.exports = DeviceControler;
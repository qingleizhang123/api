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
}

module.exports = PersonControler;
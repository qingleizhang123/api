const getAllDrive =  require('../utils/getAllDrivers');

class DriverController {
  static async getAllDrivers(ctx) {
    const data = await getAllDrive();
    if (!data) {
      ctx.body = {
        code: -1,
        msg: '接口请求错误'
      }
    } else {
      ctx.body = {
        code: 200,
        msg: '接口请求正确',
        data: data
      }
    }
  } 
}

module.exports = DriverController;
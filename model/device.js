const db = require('../config/db');

const Sequelize = db.sequelize;

const Device = Sequelize.import('../schema/device');
Device.sync({force:false});

class DeviceModel {
  /**
   * 新建器械
   * @param {*} data 
   * @returns 
   */
  static async createDevice(data) {
    return await Device.create({
      deviceName: data.name,
      deviceType: data.type,
      deviceFactory: data.factory,
      tag: data.tag,
      description: data.desc,
    });
  }

  /**
   * 获取器械列表
   * @returns 
   */
  static async getDevicelist(data) {
    return await Device.findAndCountAll({
      offset: (data.page - 1) * data.pageSize,
      limit: data.pageSize
    });
  }

  /**
   * 删除器械数据
   * @param {*} data 
   * @returns 
   */
   static async deleteDevice(id) {
    return await Device.destroy({
      where: {
        id
      }
    })
  }
}

module.exports = DeviceModel;
// 验证token
const jwt = require('jsonwebtoken');
const { TOKEN_ENCODE_STR, URL_NO_VERIFY } = require('../config/config');
const db = require('../config/db');
const Sequelize = db.sequelize;
const User = Sequelize.import('../schema/user');
 
// 检查 token
module.exports = async (ctx, next) => {
  let url = ctx.url;
  if (ctx.method !== 'GET' && !URL_NO_VERIFY.includes(url)) {
    let tokenStr = ctx.get('Authorization');
    if (tokenStr === '') {
      ctx.response.status = 401;
      ctx.response.body =  '你还没有登录，快去登录吧！';
      return;
    }
    try {
      // 验证token是否过期
      const token = tokenStr.split(' ')[1];
      
      let { str = '' } = await jwt.verify(token, TOKEN_ENCODE_STR);
      // 验证token与账户是否匹配
      let res = await User.findOne({
        where: {
          userName: str
        }
      });
      if (res === null) {
        ctx.response.status = 401;
        ctx.response.body = 'token过期或错误，请重新登录！';
        return;
      }
      // 保存用户的id
      ctx._id = res.id;
    } catch (e) {
      ctx.response.status = 401;
      ctx.response.body = '登录过期请重新登录！';
      return;
    }
  }
  await next();
};
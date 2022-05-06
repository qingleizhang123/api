// 验证token
const jwt = require('jsonwebtoken');
// 秘钥
const PRIVATEKEY = 'cedric1990';
 
// 检查 token
module.exports = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, PRIVATEKEY, (err, decode) => {
      if (err) {
        // 验证不通过（token过期或错误）
        resolve(false);
      } else {
        // 验证通过，decode包括主题信息、token过期时间
        resolve(decode)
      }
    })
  })
};
// 创建token
const jwt = require('jsonwebtoken')
// 秘钥
const PRIVATEKEY = 'cedric1990';
// token过期时间,2个小时
const TIME = 60*60*2;
 
module.exports = (id) => {
  const token = jwt.sign(
    {
      id: id
    },
    PRIVATEKEY,
    {
      expiresIn: TIME
    }
  )
  return token
}
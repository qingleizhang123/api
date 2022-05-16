// 创建token
const jwt = require('jsonwebtoken')
// 秘钥
const { TOKEN_ENCODE_STR } = require('../config/config');
// token过期时间,2个小时
const TIME = 60*60*2;
 
module.exports = (str) => {
  const token = jwt.sign(
    {
      str: str
    },
    TOKEN_ENCODE_STR,
    {
      expiresIn: TIME
    }
  )
  return token
}
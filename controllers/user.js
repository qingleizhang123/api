const UserModel = require('../model/user');
const createToken = require('../utils/createToken');
const nodeMailer = require('nodemailer');
const Email = require('../config/smtp');

class UserControler {
  static async login(ctx) {
    const { userName, password } = ctx.request.body;

    if (userName && password) {
      try {
        let data = await UserModel.getUser(userName);
        ctx.response.status = 200;
        if (!data) {
          ctx.body = {
            code: -1,
            msg: '用户名不存在'
          }
        } else if (data.password !== password) {
          ctx.body = {
            code: -1,
            msg: '密码错误'
          }
        } else if (!data.state) {
          ctx.body = {
            code: -1,
            msg: '账号还未审核'
          }
        }else if (data.password === password) {
          const token = createToken(password);
          ctx.body = {
            code: 200,
            msg: '账号密码正确',
            data: data,
            token
          }
        }
      } catch(err) {
        ctx.response.status = 412;
        ctx.body = {
          code: 412,
          msg: '登录失败，请重新输入',
          data
        }
      }
    }
  }

  static async updatePassword(ctx) {
    let req = ctx.request.body;
    if (req.userName) {
      try {
        let data = await UserModel.updateUserPassword(req);
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: '密码修改成功',
          data
        }
      } catch (err) {
        ctx.response.status = 412;
        ctx.body = {
          code: 412,
          msg: '密码修改失败',
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
    if (req.userName && req.password) {
      try {
        console.log(req);
        let data = await UserModel.createUser(req);
        ctx.response.status = 200;
        ctx.response.body = {
          code: 200,
          msg: '新建用户成功',
          data
        }
      } catch (err) {
        ctx.response.status = 412;
        ctx.response.body = {
          code: 412,
          msg: '新建用户失败',
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
    if (req.userName) {
      try {
        let data = await UserModel.deleteUser(req);
        ctx.response.status = 200;
        ctx.response.body = {
          code: 200,
          msg: '删除用户成功',
          data
        }
      } catch (err) {
        ctx.response.status = 412;
        ctx.response.body = {
          code: 412,
          msg: '删除用户失败',
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

  static async verify(ctx) {
    let req = ctx.request.body;
    if (req.userName) {
      try {
        let data = await UserModel.verifyUser(req);
        ctx.response.status = 200;
        ctx.response.body = {
          code: 200,
          msg: '账号审核完成',
          data
        }

        const result = req.state ? '通过' : '不通过';
        
        // QQ邮箱smtp服务权限校验
        const transporter = nodeMailer.createTransport({
          /**
           *  端口465和587用于电子邮件客户端到电子邮件服务器通信 - 发送电子邮件。
           *  端口465用于smtps SSL加密在任何SMTP级别通信之前自动启动。
           *  端口587用于msa
           */
          port: 587,
          secure: false, // 为true时监听465端口，为false时监听其他端口       
          service: Email.smtp.host,
          auth: {
            user: Email.smtp.user,
            pass: Email.smtp.pass
          }
        })

        // 邮件需要接收的信息
        const ko = {
          email: req.email
        }

        // 邮件中需要显示的内容
        const mailOptions = {
          from: `${Email.smtp.user}`, // 邮件来自
          to: ko.email,
          subject: '注册账号审核',
          html: `您注册的账号${req.userName}已完成审核,审核结果为${result}!`
        }

        transporter.sendMail(mailOptions, (err) => {
          if (err) {
            console.log('error');
            return;
          }
          console.log('发送成功');
        })

      } catch (err) {
        ctx.response.status = 412;
        ctx.response.body = {
          code: 412,
          msg: '接口请求失败',
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
        const data = await UserModel.getUserlist(req);
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

  static async stateList(ctx) {
    let state = ctx.params.state;
    if (state) {
      try{
        const data = await UserModel.getUserByState(state);
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

module.exports = UserControler;
const Koa = require('koa')
const app = new Koa()
const path = require('path');
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaBody = require('koa-body')

const index = require('./routes/index')
const users = require('./routes/users')

const cors = require('koa-cors');

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// koa-body
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname,'images'),
    keepExtensions: true,
    maxFileSize: 20*1024*1024 // 设置上传文件大小最大限制，默认2M
  }
}))

// cors
app.use(cors())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});



module.exports = app

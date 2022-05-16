const router = require('koa-router')()
const ArticleController = require('../controllers/article');
const PersonControler = require('../controllers/person');
const ArticleTypeController = require('../controllers/articleType');
const UserControler = require('../controllers/user');
const DriverController = require('../controllers/drivers');
const ProthesisControler = require('../controllers/prothesis');
const DeviceControler = require('../controllers/device');
const RoleControler = require('../controllers/role');

router.prefix('/api/v1')

/**
 * 文章接口
 */
//创建文章
router.post('/article/create',ArticleController.create);

//文章列表
router.get('/article/list/:articleTypeId',ArticleController.list);

//获取文章详情
router.get('/article/:id',ArticleController.detail);

//创建文章类别
router.post('/articleType/create',ArticleTypeController.create);

//获取文章类别列表
router.get('/articleType/list',ArticleTypeController.list);

//获取博主简介
router.get('/person/resume',PersonControler.resume);

//新建博主简介
router.post('/person/create',PersonControler.create);

//修改博主简介
router.post('/person/edit',PersonControler.update);

//删除博主简介
router.post('/person/delete',PersonControler.delete);

//用户登录
router.post('/user/login',UserControler.login);

//新建账号
router.post('/user/register',UserControler.create);

//修改账号密码
router.post('/user/edit',UserControler.updatePassword);

//删除账号
router.post('/user/delete',UserControler.delete);

//审核账号
router.post('/user/verify',UserControler.verify);

//获取账号列表
router.post('/user/list',UserControler.list);

//根据状态获取账号列表
router.get('/user/stateList:state',UserControler.stateList);

//获取磁盘目录
router.get('/driver/list',DriverController.getAllDrivers);

//新建假体
router.post('/prothesis/create',ProthesisControler.create);

//删除假体
router.post('/prothesis/delete',ProthesisControler.delete);

//获取假体列表
router.post('/prothesis/list',ProthesisControler.list);

//新建器械
router.post('/device/create',DeviceControler.create);

//删除器械
router.post('/device/delete',DeviceControler.delete);

//获取器械列表
router.post('/device/list',DeviceControler.list);

//获取角色列表
router.post('/role/list',RoleControler.list);

//新建角色
router.post('/role/create',RoleControler.create);

//删除角色
router.post('/role/delete',RoleControler.delete);

// 图片上传
async function upload( ctx, next ) {
  const file = ctx.request.files
  const baseName = path.basename(file['img'].path)
  ctx.body = { url: `${ctx.origin}/images/${baseName}` }
}

// 用户图片上传
router.post('/upload', upload)

module.exports = router

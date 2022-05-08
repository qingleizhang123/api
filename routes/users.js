const router = require('koa-router')()
const ArticleController = require('../controllers/article');
const PersonControler = require('../controllers/person');
const ArticleTypeController = require('../controllers/articleType');
const UserControler = require('../controllers/user');
const DriverController = require('../controllers/drivers');

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
router.post('/user/create',UserControler.create);

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

module.exports = router

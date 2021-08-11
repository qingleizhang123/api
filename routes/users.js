const router = require('koa-router')()
const ArticleController = require('../controllers/article');
const PersonControler = require('../controllers/person');


router.prefix('/api/v1')

/**
 * 文章接口
 */
//创建文章
router.post('/article/create',ArticleController.create);

//文章列表
router.get('/article/list/:type',ArticleController.list);

//获取文章详情
router.get('/article/:id',ArticleController.detail);

//获取博主简介
router.get('/person/resume',PersonControler.resume);

module.exports = router

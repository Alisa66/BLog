
module.exports = app => {
    const {router, controller} = app;

    // 要这样引入才会生效
    const adminauth = app.middleware.adminauth()

    router.get('/admin/index', adminauth, controller.admin.main.index);
    router.post('/admin/checkLogin',adminauth, controller.admin.main.checkLogin);
    // 加上路由守卫就无法访问到
    router.get('/admin/getTypeInfo',adminauth, controller.admin.main.getTypeInfo);
    router.post('/admin/addArticle', adminauth,controller.admin.main.addArticle)
    router.post('/admin/updateArticle', adminauth,controller.admin.main.updateArticle)
    router.get('/admin/getArticleList', adminauth,controller.admin.main.getArticleList)
    router.get('/admin/delArticle/:id',adminauth,controller.admin.main.delArticle)
    router.get('/admin/getArticleById/:id',adminauth,controller.admin.main.getArticleById)
};


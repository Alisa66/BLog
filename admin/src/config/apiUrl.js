
let ipUrl = 'http://127.0.0.1:7002/admin/'
let servicePath = {
    checkLogin: ipUrl + 'checkLogin', // 检查用户名和密码是否正确
    getTypeInfo: ipUrl+'getTypeInfo', // 获取文章分类信息
    addArticle: ipUrl + 'addArticle', // 添加文章
    updateArticle: ipUrl + 'updateArticle', // 修改文章
    getArticleList: ipUrl + 'getArticleList',// 读取文章列表
    delArticle: ipUrl + 'delArticle/',// 删除文章列
    getArticleById: ipUrl + 'getArticleById/',// 修改文章
}
export  default   servicePath

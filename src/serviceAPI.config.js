const BASEURL = 'https://www.easy-mock.com/mock/5b9bbaea85a2240a058f48a2/mall/'
const LOCALURL = 'http://localhost:3000/'
const URL = {
    getShoppingMallInfo: BASEURL,
    getGoodsInfo: BASEURL + 'getGoodsInfo',
    registerUser: LOCALURL + 'user/register', //用户注册接口
    login: LOCALURL + 'user/login', //用户登录接口
    getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo',  //获取商品详情
    getCateGoryList: LOCALURL + 'goods/getCateGoryList',  //得到大类信息
    getCateGorySubList: LOCALURL + 'goods/getCategorySubList',  //得到小类信息
    getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID',  //得到小类商品信息
}

module.exports = URL
const BASEURL = 'https://www.easy-mock.com/mock/5b9bbaea85a2240a058f48a2/mall/'
const LOCALURL = 'http://localhost:3000/'
const URL = {
    getShoppingMallInfo: BASEURL,
    getGoodsInfo: BASEURL + 'getGoodsInfo',
    registerUser: LOCALURL + 'user/register', //用户注册接口
    login: LOCALURL + 'user/login', //用户登录接口
}

module.exports = URL
var mongoose = require('mongoose')
//引入bcrypt模块
var bcrypt = require('bcrypt')
//定义加密密码计算强度
var SALT_WORK_FACTOR = 10;

//连接数据库
mongoose.connect('mongodb://localhost:27017/test');

//定义用户模式
var UserSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    password: {
        unique: true,
        type: String
    }
}, {
    collection: 'user'
});

//使用pre中间件在用户信息存储前进密码加密
UserSchema.pre('save', function(next) {
    var user = this;

    // /进行加密
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        })
    })
});

//编译模型
var UserBx = mongoose.model('UserBx', UserSchema);

//创建文档对象实例
var user = new UserBx({
    name: 'lian',
    password: '123456'
});

//保存用户信息
user.save(function (err, user) {
    if (err) {
        console.log(err);
    } else {
        //如果保存成功， 打印用户密码
        console.log('password: ' + user.password);
    }
})
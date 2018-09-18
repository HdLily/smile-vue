const mongoose = require('mongoose')  //引入Mongoose
const Schema = mongoose.Schema  //声明Schema
let ObjectId = Schema.Types.ObjectId //声明object类型
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

//创建我们的用户Schema
const userSchema = new Schema({
    UserId: ObjectId,
    userName: {unique: true, type: String},
    password: String,
    createAt: {type: Date, default: Date.now()},
    lastLoginAt: { type: Date, default: Date.now()}
}, {
    collection: 'user'
})

userSchema.pre('save', function(next) {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(this.password, salt, (err,hash) => {
            if (err) return next(err)
            this.password = hash
            next()
        })
    })
})

userSchema.methods = {
    //密码比对
    //_password:客户端密码 
    //password: 数据库取出来的密码
    comparePassword: (_password, password) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, password, (err, isMatch) => {
                if (!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}
//发布模型
mongoose.model('User', userSchema)
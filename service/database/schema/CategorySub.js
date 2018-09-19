const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySubSchema = new Schema({
    ID:{unique: true, type: String},
    Mall_CATEGORY_ID: {type: String},
    COMMENTS: {type: Number},
    SORT: {type: Number}
})

mongoose.model('CategorySub', categorySubSchema)
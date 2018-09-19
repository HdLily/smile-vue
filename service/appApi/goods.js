// 以后关于商品的操作就都在这个api文件中编写了，我们也是要写路由的形式，提供每一个支持。
const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router.get('/insertAllGoodsInfo', async(ctx) => {
    fs.readFile('./goods.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const Goods = mongoose.model('Goods')
        data.map((value, index) => {
            console.log(value)
            let newGoods = new Goods(value)
            newGoods.save().then(() => {
                saveCount++
                console.log('成功'+ saveCount)
            }).catch(error => {
                console.log('失败：' +error)
            })
        })
    })
    ctx.body = '开始导入数据'
})

//用fs读取category.json的数据
// 把数据进行循环存入数据库。
router.get('/insertAllCategory', async (ctx) => {
    fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const Category = mongoose.model('Category')
        data.RECORDS.map((value, index) => {
            console.log(value)
            let newCategory = new Category(value)
            newCategory.save().then(() => {
                saveCount++
                console.log('插入成功:' + saveCount)
            }).catch(error => {
                console.log('插入失败:' + error)
            })
        })

    })
    ctx.body = "开始导入数据....."
})
// 保存到数据库的业务逻辑
router.get('/insertAllCategorySub', async (ctx) => {
    fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((value, index) => {
            console.log(value)
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(() => {
                saveCount++
                console.log('插入成功:' + saveCount)
            }).catch(error => {
                console.log('插入失败:' + error)
            })
        })

    })
    ctx.body = "开始导入数据....."
})

    // .编写后台数据接口
// 直接在service / appApi / goods.js里，
// 新编写一个路由业务逻辑，并用findeOne的形式查找出一条商品数据。
// 具体业务逻辑代码如下：
//**获取商品详情信息的接口
// 我们先获得了从前端得到的参数goodsId，然后得到Goods模型，
// 用模型的findOne方法查找数据，查找出来进行返回。

router.post('/getDetailGoodsInfo', async (ctx) => {
    try {
        let goodsId = ctx.request.body.goodsId
        const Goods = mongoose.model('Goods')
        console.log(goodsId)
        let result = await Goods.findOne({ ID: goodsId }).exec()
        ctx.body = { code: 200, message: result }
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }
})

//**读取大类数据的接口 */

router.get('/getCategoryList', async (ctx) => {
    try {
        const Category = mongoose.model('Category')
        let result = await Category.find().exec()
        ctx.body = { code: 200, message: result }
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }

})

/**读取小类的数据 */


router.post('/getCategorySubList', async (ctx) => {
    try {
        let cateoryId = ctx.request.body.categoryId
        //let cateoryId=1
        const CategorySub = mongoose.model('CategorySub')
        let result = await CategorySub.find({ MALL_CATEGORY_ID: cateoryId }).exec()
        ctx.body = { code: 200, message: result }
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }

})

/**根据类别获取商品列表 */

router.post('/getGoodsListByCategorySubID', async (ctx) => {
    try {
        let categorySubId = ctx.request.body.categorySubId  //子类别ID
        let page = ctx.request.body.page  //当前页数
        let num = 10  //每页显示数量
        let start = (page - 1) * num  //开始位置

        const Goods = mongoose.model('Goods')
        let result = await Goods.find({ SUB_ID: categorySubId })
            .skip(start).limit(num).exec()
        ctx.body = { code: 200, message: result }
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }

})



module.exports = router
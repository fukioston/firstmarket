const express=require('express')
const router=express.Router()
const user_handler=require('../router_handler/user')
// 验证数据的
const expressjoi=require('@escook/express-joi')
// 导入验证规则
const{
    reg_schema,login_schema
}=require('../schema/user')
router.post('/reuser',expressjoi(reg_schema),user_handler.reuser)
router.post('/login',expressjoi(login_schema),user_handler.login)
router.post('/login2',user_handler.login2)
router.get('/islogin',user_handler.islogin)

module.exports=router
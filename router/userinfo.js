const express=require('express')
const router=express.Router()
// 获取用户信息
const userinfo_handler=require('../router_handler/userinfo')
const expressjoi=require('@escook/express-joi')
// 导入验证规则
const{
    updateuserinfo_schema,
    updatepassword_schema,
}=require('../schema/user')
router.get('/userinfo',userinfo_handler.getUserInfo)
router.post('/userinfo',expressjoi(updateuserinfo_schema),userinfo_handler.updateUserInfo)
router.post('/updatepwd',expressjoi(updatepassword_schema),userinfo_handler.updatepassword)

module.exports=router
const express=require('express')
const router=express.Router()
const commodity_handler=require('../router_handler/commodity')
router.post('/uploadpic',commodity_handler.uploadpic)//上传图片的接口
router.post('/upload',commodity_handler.upload)//上传图片的接口
router.post('/Addtomyfavorite',commodity_handler.Addtomyfavorite)//上传收藏信息的接口
router.post('/cancelmyfavorite',commodity_handler.cancelmyfavorite)//取消收藏信息的接口
router.post('/updateCommodityinfo',commodity_handler.updateCommodityinfo)//更新信息
router.post('/updateCommodityinfo2',commodity_handler.updateCommodityinfo2)//更新信息
router.post('/updateCommodityinfo3',commodity_handler.updateCommodityinfo3)//更新信息
router.post('/updateCommodityinfo4',commodity_handler.updateCommodityinfo4)//更新信息
router.post('/iscollect',commodity_handler.iscollect)//判断是否已经收藏
router.get('/getall',commodity_handler.getall)//获取所有商品信息的接口
router.get('/getmyfavorite',commodity_handler.getmyfavorite)//获取所有商品信息的接口
router.get('/getmyupload',commodity_handler.getmyupload)//获取w我上传商品信息的接口
router.get('/getcommodityinfo',commodity_handler.getcommodityinfo)//获取商品信息的接口
router.get('/GetRandomCommodity',commodity_handler.GetRandomCommodity)//随机获取推荐商品




module.exports=router
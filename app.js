const express=require('express')
// 创建服务器实例对象
const app=express()
const joi=require('joi')
app.listen(3007,function(){
    console.log('hello')
})
// 导入并配置cors中间件,
const cors=require('cors')
app.use(cors())
// 配置解析表单数据中间件 这个中间件只能解析
// application/x-www-form-urlencoded

app.use(express.urlencoded({extended:false}))
app.use((req,res,next)=>{
    // status默认为1，表失败情况
    
    res.cc=function(err,status=1){
        res.send({
            status,
            message:err instanceof Error? err.message:err,
        })
    }
    next()
})
// 配置Token中间件
const expressJWT=require('express-jwt')
const config=require('./config')
app.use(express.static('public'));
app.use(expressJWT({secret:config.jwtSecretkey}).unless({path:[/^\/api/,/^\/commodity/]}))//指明哪些不用认证

// 导入并使用用户路由模块
const userRouter=require('./router/user')
app.use('/api',userRouter)
// 导入并使用用户信息的路由模块
const userinfoRouter=require('./router/userinfo')
app.use('/my',userinfoRouter)
const commodityRouter=require('./router/commodity')
app.use('/commodity',commodityRouter)

//定义错误级别中间件
app.use((err,req,res,next)=>{
    // 验证失败
    if(err instanceof joi.ValidationError)return res.cc(err)
    // 身份认证失败
    if(err.name==='UnauthorizedError')return res.cc('身份认证失败！')
    res.cc(err)
}
)

app.listen(80,()=>{
    console.log('api sever running at h..')
})
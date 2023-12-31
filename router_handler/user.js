//导入数据库
const db=require('../db/index.js')//数据库
const bcrypt=require('bcryptjs')//加密的
const jwt=require('jsonwebtoken')//token
const config=require('../config.js')
//进行路由函数的写
exports.reuser=(req,res)=>{
    const userinfo=req.body
    console.log(userinfo)
    
    const sqlstr='select* from user where id=?'
    const sql='insert into user set ?'
    db.query(sqlstr,userinfo.id,(err,results)=>{
        if(err){
            return res.cc(err)
        }
        if(results.length>0)
        return res.cc('用户名被占用！')
        
        console.log(userinfo)
//推荐对密码进行加密，不然数据库被人盗取后别人就一眼看出来，用bcryptjs的包
userinfo.password=bcrypt.hashSync(userinfo.password,10)
console.log(userinfo.password)

db.query(sql,{id:userinfo.id,
    name:userinfo.name,
    password:userinfo.password
    },(err,results)=>{
        if(err){
            return res.cc(err)
        }
        if(results.affectedRows!==1)
        return res.cc('注册失败')
        
         res.cc('注册成功',0)
         
    })
    }
)
}

exports.login=(req,res)=>{
    
    const userinfo=req.body
    const sql='select * from user where id=? '
    db.query(sql,userinfo.id,function(err,results){
        if(err)return res.cc(err)
        if(results.length!==1)return res.cc('id错误,登录失败')
        const result=bcrypt.compareSync(userinfo.password,results[0].password)
    if(result!=1) return res.cc('密码错误，登录失败')
    const user={...results[0],password:''}
    console.log(user)
    // 进行加密
    const tokenStr=jwt.sign(user,config.jwtSecretkey,{expiresIn:config.expiresIn})
    res.send({
        status:0,
        message:'登录成功',
        token:'Bearer '+tokenStr,//获得了token

    })

})
}
exports.login2=(req,res)=>{
    const headersToken=req.get('Authorization');
    const token=headersToken.split(' ')[1];
    const decode=jwt.verify(token,'cgnnb');
    const sql='select * from user where id=? '
    db.query(sql,decode.id,function(err,results){
    const user={...results[0],password:''}
    console.log(user)
    // 进行加密
    const tokenStr=jwt.sign(user,config.jwtSecretkey,{expiresIn:config.expiresIn})
    res.send({
        status:0,
        message:'登录成功',
        token:'Bearer '+tokenStr,//获得了token

    })
})}
exports.islogin=(req,res)=>{
    
    const headersToken=req.get('Authorization');
    const token=headersToken.split(' ')[1];
    const decode=jwt.verify(token,'cgnnb');
    console.log(decode)
    res.send({
        message:'身份认证通过',
        status:0,
        data:decode
    })
}
const db=require('../db/index')
const bcrypt=require('bcryptjs')//加密的
const jwt=require('jsonwebtoken')//token
const config=require('../config.js')
// 获取信息的函数
exports.getUserInfo=(req,res)=>{
    const headersToken=req.get('Authorization');
    const token=headersToken.split(' ')[1];
    const decode=jwt.verify(token,'cgnnb');
    
    const sql='select id,name from user where id=?'
    db.query(sql,decode.id,(err,results)=>{
        if(err)return res.cc(err)
        if(results.length!==1)return res.cc('获取信息失败')
        res.send({
            status:0,
            message:'成功',
            data:results[0],
        })
    })
    }
    exports.updateUserInfo=(req,res)=>{
        const headersToken=req.get('Authorization');
    const token=headersToken.split(' ')[1];
    const decode=jwt.verify(token,'cgnnb');
     const sql='update user set ? where id=?'
     console.log(req.body)
       db.query(sql,[req.body,decode.id],(err,results)=>{
        if(err)return res.cc(err)
        if(results.affectedRows!==1)return res.cc('更新用户信息失败')
        res.cc('更新用户信息成功！',0)
       })
       

    }
    exports.updatepassword=(req,res)=>{
        const headersToken=req.get('Authorization');
    const token=headersToken.split(' ')[1];
    const decode=jwt.verify(token,'cgnnb');
        const sql='select * from user where id=?'
        const sql2='update user set password=? where id=?'
        db.query(sql,decode.id,(err,results)=>{
            if(err)return res.cc(err)
            if(results.length!==1)return res.cc('用户不存在')
            const result=bcrypt.compareSync(req.body.oldpassword,results[0].password)
            if(!result) return res.cc('旧密码错误')
            const newpassword=bcrypt.hashSync(req.body.newpassword,10)
            db.query(sql2,[newpassword,req.user.id],(err,results)=>{
                if(err)return res.cc(err)
                if(results.affectedRows!==1)return res.cc('更新用户密码失败')
               res.cc('更新用户密码成功！',0)
            })
        })

    }

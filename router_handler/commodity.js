const db=require('../db/index.js')//数据库
const bcrypt=require('bcryptjs')//加密的
const jwt=require('jsonwebtoken')//token
const config=require('../config.js')
const {uploadFiles}=require('../handleFiles.js')
//下面是上传商品的
exports.upload=(req,res)=>{
    //获取上传的人的信息 
    const headersToken=req.get('Authorization');
    console.log(headersToken)
    const token=headersToken.split(' ')[1];
    const decode=jwt.verify(token,'cgnnb');
        const commodityinfo=req.body
const sql='insert into commodity set ?'
//下面连带着传入数据库
db.query(sql,{
    name:commodityinfo.name,
    introduction:commodityinfo.introduction,
    connectnum:commodityinfo.connectnum,
    picture:commodityinfo.picturename,
    money:commodityinfo.money,
    state:1,
    uploadid:decode.id
},
    (err,results)=>{
        if(err){
            return res.cc(err)
        }
        if(results.affectedRows!==1)
        return res.cc('上传商品失败')
         res.cc('上传商品成功',0)

    })

}
exports.uploadpic=(req,res)=>{

const uploadpic=uploadFiles({path:'./public/picture',//上传的图片存储路径
key:'file',//与前端append相匹配
size:10000
}
)

uploadpic(req,res,(err)=>{
    
    if(err)
    {console.log('图片上传失败') 
    }
    else{
    console.log('图片上传成功1',req.files)
res.send({
    message:'图片上传成功2',
    status:1,
    data:req.files[0].filename

})

}
})

}
exports.getall=(req,res)=>{
    console.log(req.query)
    
    currentpage=req.query.currentpage
    
    const sql='select * from commodity'
    db.query(sql,(err,results)=>{
        // if((currentpage-1)*pagegoodsnum>results.length)retults=null//如果是最后一页
        if((currentpage)*10>results.length)//如果是最后一页
        results=results.slice((currentpage-1)*10,results.length)
        else 
       results=results.slice((currentpage-1)*10,(currentpage)*10)
        
        res.send({
        status:0,
        message:'成功',
        data:results,
    })})
}
exports.getmyfavorite=(req,res)=>{
    const headersToken=req.get('Authorization');
    const token=headersToken.split(' ')[1];
    const decode=jwt.verify(token,'cgnnb');
    currentpage=req.query.currentpage;
    const sql='select *from commodity,userfavorite where commodity.id=userfavorite.commodity_id and userfavorite.user_id=?'//存在疑问
    
    db.query(sql,[decode.id],(err,results)=>{
        console.log(results)
        if((currentpage)*10>results.length)//如果是最后一页
        results=results.slice((currentpage-1)*10,results.length)
        else 
       results=results.slice((currentpage-1)*10,(currentpage)*10)
        res.send({
        status:0,
        message:'成功',
        data:results,
    })})
}
exports.getmyupload=(req,res)=>{
    const headersToken=req.get('Authorization');
  
    const token=headersToken.split(' ')[1];
    const decode=jwt.verify(token,'cgnnb');
    currentpage=req.query.currentpage;
    const sql='select * from commodity where uploadid=?'
    
    db.query(sql,decode.id,(err,results)=>{
        if((currentpage)*10>results.length)//如果是最后一页
        results=results.slice((currentpage-1)*10,results.length)
        else 
       results=results.slice((currentpage-1)*10,(currentpage)*10)
        res.send({
            status:0,
            message:'成功',
            data:results,
        })
    })

}
exports.getcommodityinfo=(req,res)=>{
    const sql='select * from commodity where id=?'//商品id
    
    db.query(sql,req.query.commodityid,(err,results)=>{
        res.send({
            status:0,
            message:'成功',
            data:results[0],
        })
    })

}
exports.Addtomyfavorite=(req,res)=>{
    const headersToken=req.get('Authorization');
   
    const token=headersToken.split(' ')[1];
    const decode=jwt.verify(token,'cgnnb');
    const c_id=req.body.commodity_id
    const sql1='select *from userfavorite where commodity_id=? and user_id=?'
    const sql2='insert into userfavorite set ?'
    db.query(sql1,[c_id,decode.id],(err,results)=>{
        if(err){
            return res.cc(err)
        }
        if(results.length>0)
        return res.cc('请不要重复收藏！')
        db.query(sql2,{commodity_id:c_id,
         user_id:decode.id
        },(err,results)=>{
         if(err) return res.cc('收藏失败'+err)
         res.cc('收藏商品成功',0)


        }
        
        )
    })
}
exports.cancelmyfavorite=(req,res)=>{
    const sql='delete  from userfavorite where commodity_id=? and user_id=?'
    const c_id=req.body.commodity_id
    const headersToken=req.get('Authorization');
    const token=headersToken.split(' ')[1];
    const decode=jwt.verify(token,'cgnnb');

    db.query(sql,[c_id,decode.id],(err,results)=>{
        res.send({
            status:0,
            message:'取消收藏成功'
            
        })
    })


}
exports.GetRandomCommodity=(req,res)=>{
    const sql='select * from commodity'
    db.query(sql,(err,results)=>{
           const length=results.length
           var x1=Math.floor(Math.random() * length);
           var x2=Math.floor(Math.random() * length);
           while(x2===x1){
            x2=Math.floor(Math.random() * length);
           }
           var x3=Math.floor(Math.random() * length);
           while(x3===x1||x3===x2)
           {x3=Math.floor(Math.random() * length);

           }
           var x4=Math.floor(Math.random() * length);
           while(x4===x1||x4===x2||x4===x3)
           {x4=Math.floor(Math.random() * length);

           }
           var x5=Math.floor(Math.random() * length);
           while(x5===x1||x5===x2||x5===x3||x5===x4)
           {x5=Math.floor(Math.random() * length);}

           var x6=Math.floor(Math.random() * length);
           while(x6===x1||x6===x2||x6===x3||x6===x4||x6===x5)
           {x6=Math.floor(Math.random() * length);}
           var x7=Math.floor(Math.random() * length);
           while(x7===x1||x7===x2||x7===x3||x7===x4||x7===x5||x7===x6)
           {x7=Math.floor(Math.random() * length);}
           var x8=Math.floor(Math.random() * length);
           while(x8===x1||x8===x2||x8===x3||x8===x4||x8===x5||x8===x6||x8===x7)
           {x8=Math.floor(Math.random() * length);}
           var x9=Math.floor(Math.random() * length);
           while(x9===x1||x9===x2||x9===x3||x9===x4||x9===x5||x9===x6||x9===x7||x9===x8)
           {x9=Math.floor(Math.random() * length);}
           var x10=Math.floor(Math.random() * length);
           while(x10===x1||x10===x2||x10===x3||x10===x4||x10===x5||x10===x6||x10===x7||x10===x8||x10===x9)
           {x10=Math.floor(Math.random() * length);}
           const Recommand=[results[x1],results[x2],results[x3],results[x4],results[x5],
           results[x6],results[x7],results[x8],results[x9],results[x10]]
           res.send({
            status:0,
            message:'成功',
            data:Recommand,
        })

    })
}
exports.updateCommodityinfo=(req,res)=>{
    const sql='update commodity set name=? where id=?'
    console.log(req.body)
      db.query(sql,[req.body.name,req.body.commodityid],(err,results)=>{
       if(err)return res.cc(err)
       if(results.affectedRows!==1)return res.cc('更新用户信息失败')
       res.cc('更新用户信息成功！',0)
      })
      
}
exports.updateCommodityinfo2=(req,res)=>{
    const sql='update commodity set money=? where id=?'
    
      db.query(sql,[req.body.money,req.body.commodityid],(err,results)=>{
       if(err)return res.cc(err)
       if(results.affectedRows!==1)return res.cc('更新用户信息失败')
       res.cc('更新用户信息成功！',0)
      })
      
}
exports.updateCommodityinfo3=(req,res)=>{
    const sql='update commodity set connectnum=? where id=?'
   
      db.query(sql,[req.body.connectnum,req.body.commodityid],(err,results)=>{
       if(err)return res.cc(err)
       if(results.affectedRows!==1)return res.cc('更新用户信息失败')
       res.cc('更新用户信息成功！',0)
      })
      
}
exports.updateCommodityinfo4=(req,res)=>{
    const sql='update commodity set introduction=? where id=?'
  
      db.query(sql,[req.body.introduction,req.body.commodityid],(err,results)=>{
       if(err)return res.cc(err)
       if(results.affectedRows!==1)return res.cc('更新用户信息失败')
       res.cc('更新用户信息成功！',0)
      })
      
}
exports.iscollect=(req,res)=>{
    const sql='select *from userfavorite where commodity_id=? and user_id=?'
   
    const c_id=req.body.commodity_id
    const headersToken=req.get('Authorization');
    const token=headersToken.split(' ')[1];
    const decode=jwt.verify(token,'cgnnb');
   

    db.query(sql,[c_id,decode.id],(err,results)=>{
        if(err){
            return res.cc(err)
        }
        if(results.length>0)
        return res.cc('已经收藏！',0)
    })

}

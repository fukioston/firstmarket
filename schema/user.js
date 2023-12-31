//这里写输入的限制啥的
const joi=require('joi')
// name是必填
const name=joi.required()
const usermessage=joi.required()
// password是字符串，长度6-14
const password=joi.string().pattern(/^[\S]{6,14}$/).required()
// id只能是数字
const id=joi.number().min(100000).max(10000000000).required()
const oldpassword=password
const newpassword=joi.not(joi.ref('oldpassword')).concat(password)
exports.reg_schema={
    body:{
        name,
        password,
        id
    },
}
exports.login_schema={
    body:{
        
        password,
        id
    },
}
exports.updateuserinfo_schema={
    body:
    {name,usermessage}
}
exports.updatepassword_schema={
    body:{
       oldpassword,
       newpassword,
    }
}

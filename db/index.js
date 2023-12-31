const  mysql=require('mysql')
const db=mysql.createPool({
    host:'localhost',
                     user:'myuser',
                     password:'36491491Aa!',
                     port:3306,
                     database:'second_hand_websites',
                     charset:'utf8'
})
module.exports=db
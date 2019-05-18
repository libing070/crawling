var express = require('express');
var db=require('node_db').db;
var router = express.Router();

//获取最新的十条数据
router.post('/loadhtml',function(req,res,next){
    let url = req.body.url;
    var selectSql='select  * from details where url = "'+url+'" LIMIT 1';
    db.query(selectSql,function(result,fields){
        if(fields.length>0){
            res.json(fields);
        }else{
            res.end('Error');
            return next();
        }
    });
})
module.exports = router;
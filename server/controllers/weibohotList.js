var express = require('express');
var db=require('node_db').db;
var router = express.Router();

//获取最新的十条数据
router.get('/dbList',function(req,res,next){
    var selectSql='select * from crawlings order by id DESC limit 10';
    db.query(selectSql,function(result,fields){
        if(fields.length>0){
            res.json(fields);
        }else{
            res.end('Error');
            return next();
        }
    });
})

//获取总数据条数
router.get('/dbListSum',function(req,res,next){
    var selectSql='select count(*) as sum from crawlings';
    db.query(selectSql,function(result,fields){
        if(fields.length>0){
            res.json(fields);
        }else{
            res.end('Error');
            return next();
        }
    });
})


router.post('/dbListByPage',function(req,res,next){
    var prevOrnext=req.body.prevOrnext;//"0"表示上一页  "1"表示下一页;
    var pageNum = req.body.pageNum;
    var firstCreatetimestring=req.body.firstCreatetimestring;
    var lastCreatetimestring=req.body.lastCreatetimestring;
    var selectSql="";
    if(prevOrnext=="0"){
        selectSql ='select * from (select * from crawlings where createtimestring>'+firstCreatetimestring+' LIMIT 10) as tb1 ORDER BY createtimestring DESC';//这里注意是降序
    }else{
        selectSql ='select * from crawlings where createtimestring<'+lastCreatetimestring+' ORDER BY createtimestring DESC ,id DESC  LIMIT 10;';//这里注意是降序
    }

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
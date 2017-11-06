var mysql=require("mysql")
//创建连接
function UserConnect(){
	var connection = mysql.createConnection({
		host:"localhost",
		database:"myfirst",
		user:"root",
		password:""
	})
	//连接数据库
	connection.connect(function(err,res){
		if(err){
			throw err;
			return
		}
		console.log("连接成功")
		createTable();
	})
	var createTable=function(){
		var sql="create table if not exists user(id int(10) auto_increment,name varchar(64) character set utf8 not null,time DATE not null,primary key(id)  )"
		connection.query(sql,function(err,res){
			  if(err){
			     console.log("建表错误:"+err);
			 throw err;
		     return;

		     }
			  console.log("建表成功")
		})
	}
	//插入数据
	this.insert= function(name,date){
		var sql="insert into user(id,name,time) values(null,?,?)"
			var params =[name,date]
			connection.query(sql,params,function(err,res){
			  if(err){
			     console.log("添加错误:"+err);
					 throw err;
				     return;
			     }
			  console.log("添加成功"+res)
			
		})
			
	}
	this.delete=function(name){
		var sql="delete from user where name = ?"
		var params=[name]
		connection.query(sql,params,function(err,res){
			if(err){
				console.log("删除错误"+err.message)
				throw err;
				return
			}
			console.log("删除成功");
		})
	}
	//更新
	this.update=function(name){
		var sql="update user set  name=?"
		var parmas=[name]
		connection.query(sql,parmas,function(err,res){
			if(err){
				console.log("更新错误"+err.message)
				throw err;
				return
			}
			console.log("更新成功"+res)
		})
	}
	//查询
	this.inquire=function(name){
		var sql="select*from user where name=?";
		var parmas=[name]
		connection.query(sql,parmas,function(err,res){
			if(err){
			console.log(err.message)
		}
		console.log("查询到的数据供"+res[0].name)
		})
	}
	
}
module.exports=UserConnect
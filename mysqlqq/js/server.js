var http=require("http");
var url=require("url");
var query=require("querystring");
//自定义模块
var sql=require("./mysqlyj");
var sqlObj= new sql();
function can(req,success){
	var data=""
		//psot 请求
		req.on("data",function(drunk){
			data+=drunk;
		})
		req.on("end",function(){
			console.log("接收的数据是"+data)
			//添加
			//添加到联系人数据库
			data=query.parse(data)
			success(data)
		})
}
//优化
http.createServer(function(req,res){
	var path = url.parse(req.url,true).pathname;
	res.setHeader("Access-Control-Allow-Origin","*")
	console.log("路径是"+path)
	if (path== "/add") {
		 can(req,function (obj){
			sqlObj.insert(obj.user,
			new Date().toLocaleDateString())
		 	
		 })

		
	} else if(path=="/dlete"){
			var data=""
		//psot 请求
		req.on("data",function(drunk){
			data+=drunk
		})
		req.on("end",function(){
			console.log("接收的数据是"+data)
			//添加
			//添加到联系人数据库
			data=query.parse(data)
			var user =data.user
			 sqlObj.delete(user)   
		})
	}else if(path=="/updata"){
		var data=""
		req.on("data",function(drunk){
			data+=drunk
		})
		req.on("end",function(){
			data=query.parse(data)
			var user =data.user
			 sqlObj.update(user)   
			
		})
	}
	else if(path=="/inquire"){
		var data=""
		req.on("data",function(drunk){
			data+=drunk
		})
		req.on("end",function(){
			data=query.parse(data)
			var user=data.user
			sqlObj.inquire(user)
			
		})
	}
	res.end()
}).listen(8084)

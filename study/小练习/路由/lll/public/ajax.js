function ajax(obj){
	
	// 有参数的时候拼接参数字符串
	var queryStr="";
	if(obj.query){
		for(var x in obj.query){
			queryStr+=x+"="+obj.query[x]+"&";
		}
		queryStr=queryStr.replace(/&$/,"");
	}

	// 处理请求方式
	var type=obj.type||"GET";

	// 处理请求路径
	var url=obj.url;
	if(type=="GET"&&queryStr!=""){
		url+="?"+queryStr;
	}

	// 创建XMLHttpRequest实例对象
	var xhr=new XMLHttpRequest();

	// open方法指定请求方式、请求路径、同步异步
	xhr.open(type,url);

	// send发送请求
	if(type=="GET"){
		xhr.send();
	}else{
		xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")
		xhr.send(queryStr);
	}

	xhr.onreadystatechange=function(){

		if(xhr.status==200&&xhr.readyState==4){

			obj.success(xhr.responseText);

		}

	}

}

var express = require("express")

var app = express()

app.use(express.static("public"))
app.get("*",function(req,res){

	res.redirect("/")
	// res.sendFile(__dirname+"/public/index.html");

})
app.listen(8080,function(){
    console.log("服务期开启成功")
})
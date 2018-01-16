/**登录单击按钮事件监听**/
$('.btn').click(function(){
	var u=$("#user_name").val();
	var p = $("#user_pwd").val();
	$.ajax({
			type:"POST",
			url:"data/user/login.php",
			data:{user_name:u,user_pwd:p},
			success:function(data){
				if(data.code===200){
					location.href="index.html";
				}else{
					alert("对不起，用户名或密码错误");
				}
			}
	})
})

/***7天之内不再登录***/
(document).ready(function () {
  if ($.cookie("rmbUser") == "true") {
    $("#ck_rmbUser").attr("checked", true);
    $("#username").val($.cookie("username"));
    $("#password").val($.cookie("password"));
  }
});
//记住用户名密码
function save() {
  if ($("#ck_rmbUser").attr("checked")) {
    var str_username = $("#username").val();
    console.log(str_username);
    var str_password = $("#password").val();
    $.cookie("rmbUser", "true", {expires: 7}); //存储一个带7天期限的cookie
    $.cookie("username", str_username, {expires: 7});
    $.cookie("password", str_password, {expires: 7});
  }
  else {
    $.cookie("rmbUser", "false", {expire: -1});
    $.cookie("username", "", {expires: -1});
    $.cookie("password", "", {expires: -1});
  }
}
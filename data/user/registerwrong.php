<?php
	require_once('../init.php');
	$user_name=$_REQUEST['user_name'];
	$user_pwd=$_REQUEST['user_pwd'];

	if($user_name=''||$user_pwd=''){
		echo "用户名和密码不能为空";
		exit;
	}
	$sql = "select * from mi_user where user_name='$user_name'";
	$rs=mysqli_query($conn,$sql);
	
	$arr=mysql_fetch_array($rs,MYSQL_ASSOC);
	echo mysql_error();
	if($arr['$user_name']==$user_name){
		echo "用户名已注册，请重新注册";
	}else{
		//$sql="INSERT INTO mi_user //VALUES(NULL,'$user_name','$user_pwd')";
		//echo 'success';
mysql_query("inser into mi_user (user_name,user_pwd) values ('$user_name','$user_pwd')",$conn);
		echo "注册成功";
	}
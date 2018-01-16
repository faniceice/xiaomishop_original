<?php
/**
* 接收客户端
*/
header('Content-Type: application/json;charset=UTF-8');
require_once('../init.php');

@$user_name = $_REQUEST['user_name'] or die('{"code":401,"msg":"user_name required"}');

@$user_pwd = md5($_REQUEST['user_pwd']) or die('{"code":402,"msg":"user_pwd required"}');

$sql = "INSERT INTO mi_user(user_name,user_pwd) VALUES('$user_name','$user_pwd')";
$result = mysqli_query($conn,$sql);
if(!$result){
	printf("Error:%sn",mysqli_error($conn));
	exit();
}
if(!$result){
  echo('{"code":500, "msg":"db execute err"}');
}else {
  $uid = mysqli_insert_id($conn);
  echo('{"code":200, "msg":"register succ", "uid":'.$uid.'}');
}
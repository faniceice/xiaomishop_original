<?php
/**
* 接收客户端提交的user_name，验证此用户名是否已经存在。
* 若不存在，则返回{"code":200, "msg":"non-exists"}
* 若存在，则返回{"code":201, "msg":"exists"}
*/
header('Content-Type:application/json;charset=UTF-8');
require_once('../init.php');
@$user_name = $_REQUEST['user_name'] or die('{"code":401,"msg":"user_name required"}');


$sql = "SELECT user_id FROM mi_user WHERE user_name='$user_name' LIMIT 1";
$result = mysqli_query($conn,$sql);
if(!$result){
	printf("Error:%sn",mysqli_error($conn));
	exit();
}
if(!$result){       //SQL语句执行失败
  echo('{"code":500, "msg":"db execute err"}');
}else {
  $row = mysqli_fetch_assoc($result);
  if(!$row){        //用户名不存在
    echo('{"code":200, "msg":"non-exists"}');
  }else {           //用户名已经存在
    echo('{"code":201, "msg":"exists"}');
  }
}
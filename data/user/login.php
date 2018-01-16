<?php
/**
* 接收客户端提交的登录信息：name、pwd，执行登录验证；
* 返回表明登录成功或失败的JSON消息：
* 如：{"code":200, "msg":"check passed"}
*/
header('Content-Type: application/json;charset=UTF-8');
require_once('../init.php');
@$uname = $_REQUEST['user_name'] or die('{"code":401,"msg":"uname required"}');
@$upwd = md5($_REQUEST['user_pwd']) or die('{"code":402,"msg":"upwd required"}');


$sql = "SELECT user_id FROM mi_user WHERE user_name='$uname' AND user_pwd='$upwd'";
$result = mysqli_query($conn,$sql);

if(!$result){       //SQL语句执行失败
  echo('{"code":500, "msg":"db execute err"}');
}else {
  $row = mysqli_fetch_assoc($result);
  if(!$row){        //用户名或密码错误
    echo('{"code":201, "msg":"uname or upwd err"}');
  }else {           //登录成功
    session_start();
    $_SESSION['loginUname'] = $uname;
    $_SESSION['loginUid'] = $row['user_id'];
    $pageToJump = @$_SESSION['pageToJump'];
    if($pageToJump==='cart.html' && @$_SESSION['toBuyLid']){
      //完成购物车添加
      $sql = "SELECT iid FROM mi_shoppingcart_item WHERE user_id=$_SESSION[loginUid] AND product_id=$_SESSION[toBuyLid]";
      $result = mysqli_query($conn, $sql);
      if( mysqli_fetch_row($result) ){
        $sql = "UPDATE xz_shoppingcart_item SET count=count+1 WHERE user_id=$_SESSION[loginUid] AND product_id=$_SESSION[toBuyLid]";
      }else {
        $sql = "INSERT INTO xz_shoppingcart_item VALUES(NULL, $_SESSION[loginUid], $_SESSION[toBuyLid], $_SESSION[toBuyCount],false)";
      }
      $result = mysqli_query($conn, $sql);
      unset($_SESSION['toBuyLid']);
      unset($_SESSION['toBuyCount']);
      unset($_SESSION['pageToJump']);

      echo('{"code":200, "msg":"login succ", "pageToJump":"'.$pageToJump.'"}');
    }else if($pageToJump==='cart.html'){
      //完成车购物查看
      unset($_SESSION['pageToJump']);
      echo('{"code":200, "msg":"login succ", "pageToJump":"'.$pageToJump.'"}');
    }else {
      echo('{"code":200, "msg":"login succ"}');
    }
  }
}
<?php
/**
* 根据编号lid查询商品的所有信息
* 参数： lid
* 返回：{
*     "details":{ ..., "picList":[{},...] }
*     "family":{ "fid":.., "fname":.., "laptopList":[ {"lid":..,"spec":..},... ]}
*  }
*/
header('Content-Type: application/json;charset=UTF-8');
require_once('../init.php');

@$lid = $_REQUEST['lid'];
if(!$lid){
  $lid = 1;
}

$output = [
  'details'=>[],
  'family'=>[]
];
//读取手机的基本信息
$sql = "SELECT * FROM mi_laptop WHERE lid=$lid";
$result = mysqli_query($conn, $sql);
$output['details'] = mysqli_fetch_assoc($result);

//读取手机的图片列表
$sql = "SELECT * FROM mi_laptop_pic WHERE laptop_id=$lid ORDER BY pid";
$result = mysqli_query($conn, $sql);
$output['details']['picList'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

//读取型号信息
$fid = $output['details']['family_id'];
$sql = "SELECT * FROM mi_laptop_family WHERE fid=$fid";
$result = mysqli_query($conn, $sql);
$output['family'] = mysqli_fetch_assoc($result);

//读取同型号的其它手机信息
$sql = "SELECT lid FROM mi_laptop WHERE family_id=$fid";
$result = mysqli_query($conn, $sql);
$output['family']['laptopList'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($output);
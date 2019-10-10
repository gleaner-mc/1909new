<?php
 $username = $_POST["username"];
 $password = $_POST["password"];

// 将这些数据插入到数据库
mysql_connect("localhost", "root", "root");

// 确定要操作的库
mysql_select_db("test");

// 书写sql语句 插入数据
$sql = "INSERT INTO userlist (username, password) values('$username', '$password')";

// 执行
$num = mysql_query($sql);
if ($num == 1) {
    setCookie("global", "$username", time() * 1000 * 60 * 60 * 24, "/");
    echo json_encode(array("error" => 0, "data" => "注册成功"));
} else {
    echo json_encode(array("error" => 1, "data" => "注册失败"));
}


?>
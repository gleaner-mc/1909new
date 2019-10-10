<?php
    // 获取前端提交的用户名和密码
    $username = $_POST["username"];
    $password = $_POST["password"];

    // 连接数据库
    mysql_connect("localhost", "root", "root");

    // 选择数据库
    mysql_select_db("test");

    // 定义查询语句
    $sql = "select * from userlist where username='$username' and password='$password'";

    // 执行
    $result = mysql_query($sql);

    // 获取结果
    $row = mysql_fetch_assoc($result);

    // 判断
    if ($row) {
        setCookie("global","$username",time()+1000*3600*24,"/");
        echo json_encode(array(
            "error" => 0,
            "data" => "登录成功"
        ));
    } else {
        echo json_encode(array(
            "error" => 1,
            "data" => "登录失败"
        ));
    }

?>
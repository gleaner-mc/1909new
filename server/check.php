<?php
    // 获取前端提交的用户名称
    $username = $_GET["username"];
    // 连接数据库
    mysql_connect("localhost", "root", "root");

    // 选中数据库
    mysql_select_db("test");

    // 定义查询语句
    $sql = "SELECT * FROM userlist WHERE username='$username'";

    // 执行
    $result = mysql_query($sql);
    // mysql_fetch_assoc从$result结果集中获取一条信息 如果能够获取到说明已经存在用户名为田七的数据 
    $row = mysql_fetch_assoc($result);

    if ($row) {
        echo json_encode(array("error" => 1, "data" => "抱歉已经被占用")); // 格式 {error:1, data: "抱歉已经被占用"}
    } else {
        echo json_encode(array("error" => 0, "data" => "恭喜可以使用")); // 格式 {error:1, data: "恭喜可以使用"}
    }

?>
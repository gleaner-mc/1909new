<?php
    // 获取前端提交的商品id
    $id = $_GET["id"];

    // 连接数据库 并查询 
    mysql_connect("localhost", "root", "root");
    mysql_select_db("test");
    
    // 定义查询语句
    $sql = "select * from goods where goods_id='$id'";
    $result = mysql_query($sql);
    $row = mysql_fetch_assoc($result);
    // 返回给前端
    if ($row) {
        echo json_encode(array(
            "error" => 0,
            "data" => $row,
            "msg" => "数据查询成功"
        ));
    } else {
        echo json_encode(array(
            "error" => 1,
            "data" => "",
            "msg" => "数据查询失败"
        ));
    }

?>
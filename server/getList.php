<?php
    // 当前的页面功能： 查询一共有多少条数据 并将这些数据返回给用户
    mysql_connect("localhost", "root", "root");
    // 连接数据库
    mysql_select_db("test");
    // 定义查询语句
    $sql = "select  *  from goods";

    $result = mysql_query($sql);
    $arr = array();
    $i = 0;
    while($row = mysql_fetch_assoc($result)) {
        array_push($arr, $row);
        $i++;
    }

    $arr1 = array(
        "error" => 0,
        "data" => $arr,
        "count" => $i
    );
    echo json_encode($arr1);

?>
// 获取三个元素
var username = document.getElementById("username");
var password = document.getElementById("password");
var button = document.getElementById("button");

button.onclick = function() {
    // 获取用户名 获取密码 发送给服务器
    AJAX.post("../server/login.php", {
        username: username.value,
        password: password.value
    }, function(data) {
        // 登录成功
        if (!data.error) {
            // 判定URL中search中是否有target字段 如果有 就跳转到target的值所指向的网址
            // 如果没有 就跳转到列表页
            var target = location.search.split("=")[1];
            if (target) {
                // 跳转到目标网址
                location.href = decodeURIComponent(target);
            } else {
                // 跳转到列表页
                location.href = "./list.html";
            }
        }
    })
}
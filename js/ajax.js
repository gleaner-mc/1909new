// 封装的思路：AJAX整体发送流程
// 1 初始化XHR 
// 2 open方法 第一个 get、post 是可变的 第二个 url 可变的 第三个 写死 就是true
// 3 根据不同的ajax请求方式 数据也是存放再不同的位置  get请求放在URL的query部分  post请求放在send里
// 4 请求结束之后 要执行的代码不同

var AJAX = {
    // get方法 用于发送get请求
    get: function(url, data, callback) {
        // 格式化data  {username: "田七", password: 1234567, sex: "nan", age: 22}
        var query = "";
        for (var i in data) {
            // i 第一次循环 是 username 
            // data[i] 是 田七
            // 第一次循环结束之后 query => username=田七& 
            // i 第二次循环是 password
            // data[i] 是 1234567
            // 第二次循环之后 query => username=田七&password=1234567&
            // 第三次循环之后 query => username=田七&password=1234567&sex=nan&
            // 第四次循环之后 query => username=田七&password=1234567&sex=nan&age=22&
            query += i + "=" + data[i] + "&";
        }
        query = query.slice(0, -1);
        // 初始化xhr
        var xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHttp");
        } else {
            throw new Error("您的浏览器不支持AJAX，请升级！");
        }
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                // 将返回的数据格式化成对象
                var obj = JSON.parse(xhr.responseText);
                // 将返回的数据格式化成对象并传递给外部的回调函数
                callback(obj);
            }
        }

        xhr.open("get", url + "?" + query, true);
        xhr.send();
    }, 
    // post方法 用于发送post请求
    post: function(url, data, callback) {
          // 格式化data  {username: "田七", password: 1234567, sex: "nan", age: 22}
          var query = "";
          for (var i in data) {
              // i 第一次循环 是 username 
              // data[i] 是 田七
              // 第一次循环结束之后 query => username=田七& 
              // i 第二次循环是 password
              // data[i] 是 1234567
              // 第二次循环之后 query => username=田七&password=1234567&
              // 第三次循环之后 query => username=田七&password=1234567&sex=nan&
              // 第四次循环之后 query => username=田七&password=1234567&sex=nan&age=22&
              query += i + "=" + data[i] + "&";
          }
          query = query.slice(0, -1);
          // 初始化xhr
          var xhr = null;
          if (window.XMLHttpRequest) {
              xhr = new XMLHttpRequest();
          } else if (window.ActiveXObject) {
              xhr = new ActiveXObject("Microsoft.XMLHttp");
          } else {
              throw new Error("您的浏览器不支持AJAX，请升级！");
          }
          xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                  // 将返回的数据格式化成对象
                  var obj = JSON.parse(xhr.responseText);
                  // 将返回的数据格式化成对象并传递给外部的回调函数
                  callback(obj);
              }
          }
          xhr.open("post", url  , true);
          xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded;charset=utf-8");
          xhr.send(query);
    }
}



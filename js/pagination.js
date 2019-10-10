// 定义构造函数
    function Pagination(ele, options) {
      this.ele = ele;
      this.options = options;
      this.init();
    }

    // 方法 写在原型上
    Pagination.prototype = {
      construtor: Pagination,
      init: function () {
        console.log("初始化");
        // 第一部分 渲染操作区域
        this.render();
        // 第二部分 更改信息列表
        this.update();
        // 第三部分 添加事件
        this.bindEvent();
      },
      // 渲染操作区域
      render: function () {
        // 获取 操作区域元素
        var operationArea = this.ele.querySelector(".operate-area");
        operationArea.innerHTML = "";
        // 渲染首页按钮
        var firstBtn = document.createElement("span");
        firstBtn.innerHTML = "首页";
        operationArea.appendChild(firstBtn);
        // 渲染上一页按钮
        var prevBtn = document.createElement("span");
        prevBtn.innerHTML = "上一页";
        operationArea.appendChild(prevBtn);
        // 动态渲染中间的数字按钮

        // 获取一共多少页
        var totalPage = this.options.pageInfo.totalPage;
        // 获取当前页
        var currentPage = this.options.pageInfo.currentPage;
        // 判定 是否总页数小于10页
        if (totalPage <= 10) {
          // 如果是 就把这10个按钮都显示出来
          for (var i = 1; i < totalPage; i++) {
            var span = document.createElement('span');
            span.innerHTML = i;
            span.className = "num";
            if (i === currentPage) {
              span.className = "num active";
            }
            operationArea.appendChild(span);
            span.style.cursor="pointer";
          }
        } else {
          // 不小于10 需要...
          // 判定当前页是第几页 如果小于5  显示1 ~ 5 ... 21 22
          if (currentPage < 5) {
            // 循环 创建span 并追加到操作区域
            for (var i = 1; i < 5; i++) {
              var span = document.createElement('span');
              span.innerHTML = i;
              span.className = "num";
              if (i === currentPage) {
                span.className = "num active";
              }
              operationArea.appendChild(span);
            }
            // 创建一个... 
            var span = document.createElement('span');
            span.innerHTML = '...';
            span.className = "num";
            operationArea.appendChild(span);
            // 创建最后两个
            for (var i = totalPage - 2; i < totalPage; i++) {
              var span = document.createElement('span');
              span.innerHTML = i;
              span.className = "num";
              operationArea.appendChild(span);
            }
          } else if (currentPage === 5) {
            // 循环 创建span 并追加到操作区域
            for (var i = 1; i < 7; i++) {
              var span = document.createElement('span');
              span.innerHTML = i;
              span.className = "num";
              if (i === currentPage) {
                span.className = "num active";
              }
              operationArea.appendChild(span);
            }
            // 创建一个... 
            var span = document.createElement('span');
            span.innerHTML = '...';
            operationArea.appendChild(span);
            // 创建最后两个
            for (var i = totalPage - 2; i < totalPage; i++) {
              var span = document.createElement('span');
              span.innerHTML = i;
              span.className = "num";
              if (i === currentPage) {
                span.className = "num active";
              }
              operationArea.appendChild(span);
            }
          } else if (currentPage > 5 && currentPage < totalPage - 5) {
            // 循环 创建span 并追加到操作区域
            for (var i = 1; i < 2; i++) {
              var span = document.createElement('span');
              span.innerHTML = i;
              span.className = "num";
              if (i === currentPage) {
                span.className = "num active";
              }
              operationArea.appendChild(span);
            }
            // 创建一个... 
            var span = document.createElement('span');
            span.innerHTML = '...';
            operationArea.appendChild(span);

            // 循环创建5个中间的按钮
            for (var i = currentPage - 3; i < currentPage + 2; i++) {
              var span = document.createElement('span');
              span.className = "num";
              span.innerHTML = i;
              if (i === currentPage) {
                span.className = "num active";
              }
              operationArea.appendChild(span);
            }
            // 创建一个... 
            var span = document.createElement('span');
            span.innerHTML = '...';
            operationArea.appendChild(span);
            // 创建最后两个
            for (var i = totalPage - 2; i < totalPage; i++) {
              var span = document.createElement('span');
              span.innerHTML = i;
              span.className = "num";
              operationArea.appendChild(span);
            }
          } else if (currentPage === totalPage - 4) {
            // 创建前两个
            for (var i = 1; i < 2; i++) {
              var span = document.createElement('span');
              span.className = "num";
              span.innerHTML = i;
              if (i === currentPage) {
                span.className = "num active";
              }
              operationArea.appendChild(span);
            }
            // 创建一个... 
            var span = document.createElement('span');
            span.innerHTML = '...';
            operationArea.appendChild(span);
            // 循环创建倒数7个
            for (var i = totalPage - 7; i < totalPage; i++) {
              var span = document.createElement('span');
              span.innerHTML = i;
              span.className = "num";
              if (i === currentPage) {
                span.className = "num active";
              }
              operationArea.appendChild(span);
            }
          } else {
            // 创建前两个
            for (var i = 1; i < 2; i++) {
              var span = document.createElement('span');
              span.innerHTML = i;
              span.className = "num";
              operationArea.appendChild(span);
            }
            // 创建一个... 
            var span = document.createElement('span');
            span.innerHTML = '...';
            operationArea.appendChild(span);
            // 循环创建倒数5个
            for (var i = totalPage - 5; i < totalPage; i++) {
              var span = document.createElement('span');
              span.className = "num";
              if (i === currentPage) {
                span.className = "num active";
              }
              span.innerHTML = i;
              operationArea.appendChild(span);
            }
          }
        }
        
        // 渲染下一页按钮
        var nextBtn = document.createElement("span");
        nextBtn.innerHTML = "下一页";
        operationArea.appendChild(nextBtn);
        nextBtn.style.cursor="pointer";
        // 渲染末页按钮
        var lastBtn = document.createElement("span");
        lastBtn.innerHTML = "末页";
        operationArea.appendChild(lastBtn);
        lastBtn.style.cursor="pointer";
        // 渲染input数字选项
        var input = document.createElement("input");
        input.type = "number";
        input.min = 1;
        input.max = this.options.pageInfo.totalPage;
        input.value = this.options.pageInfo.currentPage;
        operationArea.appendChild(input);
        // 渲染button按钮
        var button = document.createElement("button");
        button.innerHTML = "跳转";
        operationArea.appendChild(button);
      },
      // 更改信息列表
      update: function () {
        // 把原来的数据清理掉
        var tbody = this.ele.querySelector(".row:first-child");
        tbody.innerHTML = "";
        // 获取数据
        // 如果当前页是1页 那么应当获取到 数组中的0 - 9 这些数据 
        // 如果当前页是2页 那么应当获取到 数组中的10 - 19 这些数据 
        // 如果当前页是3页 那么应当获取到 数组中的20 - 29 这些数据 
        // 获取当前页
        var currentPage = this.options.pageInfo.currentPage;

        // 获取一页显示的数据
        var pageSize = this.options.pageInfo.pageSize;
        // 以此类推
        var nowPageData = this.options.data.slice(currentPage * pageSize - pageSize, currentPage * pageSize);
        // 循环当前页面所需的数据 并格式化成HTML 然后上树
        nowPageData.forEach(function (item) {
          console.log(item);
          tbody.innerHTML += 
          `
          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 box">
                <img src="${item.goods_big_logo}"
                    class="img-responsive" alt="Responsive image">
                <div class="desc">
                    ${item.goods_name}
                </div>
                <div class="price">
                    <i class="glyphicon glyphicon-yen"></i>
                    <span class="">${item.goods_price}</span>
                </div>
                <div class="clearfix">
                    <a href="./cart.html" class="pull-left">去购物车</a>
                    <a href="./detail.html?id=${item.goods_id}" class="pull-right">查看详情</a>
                </div>
            </div>`

        });
      },
      // 添加事件
      bindEvent: function () {
        var _this = this;
        var btns = this.ele.querySelectorAll(".operate-area span");
        console.log(btns)
        btns[0].parentNode.onclick = function(e) {
          if (e.target.className === "num") {
            _this.options.pageInfo.currentPage = +e.target.innerHTML;
            _this.render();
            _this.update();
            _this.bindEvent();
          }
        }
       
        var prev = btns[1];
        var first = btns[0];
        var next = btns[btns.length - 2];
        var last = btns[btns.length - 1];
        var button = this.ele.querySelector("button");
        
        button.onclick = function() {
          console.log(1)
          var value = 0;
          if (+this.previousElementSibling.value > _this.options.pageInfo.totalPage) {
            value = _this.options.pageInfo.totalPage
          } else if (+this.previousElementSibling.value < 1) {
            value = 1;
          } else {
            value = +this.previousElementSibling.value;
          }
          _this.options.pageInfo.currentPage = value;
          _this.render();
          _this.update();
          _this.bindEvent();
        }
        console.log(prev);
        prev.onclick = function () {
          // 将当前的页码减1 
          // 更新操作区域
          // 更新页面显示区域
          // 既然要执行这三个操作 就必须要得到Pagination的实例 可是这是一个事件函数 函数中的this是绑定事件的元素
          _this.options.pageInfo.currentPage--;
          if (_this.options.pageInfo.currentPage === 0) {
            _this.options.pageInfo.currentPage = 1;
            return;
          }
          _this.render();
          _this.update();
          _this.bindEvent();
        }

        first.onclick = function() {
          _this.options.pageInfo.currentPage = 1;
          if (_this.options.pageInfo.currentPage === 0) {
            _this.options.pageInfo.currentPage = 1;
            return;
          }
          _this.render();
          _this.update();
          _this.bindEvent();
        }

        next.onclick = function() {
          _this.options.pageInfo.currentPage++;
          if (_this.options.pageInfo.currentPage > _this.options.pageInfo.totalPage) {
            _this.options.pageInfo.currentPage = _this.options.pageInfo.totalPage;
            return;
          }
          _this.render();
          _this.update();
          _this.bindEvent();
        }

        last.onclick = function() {
          _this.options.pageInfo.currentPage = _this.options.pageInfo.totalPage;
          _this.render();
          _this.update();
          _this.bindEvent();
        }

      }
    }

    // 定义配置信息对象
    // var options = {
    //   // 定义页面信息
    //   pageInfo: {
    //     // 当前是第几页
    //     currentPage: 2,
    //     // 一共多少数据
    //     totalSize: arr.length,
    //     // 一页显示多少数据
    //     pageSize: 10,
    //     // 一共多少页
    //     totalPage: Math.ceil(arr.length / 10)
    //     // totalPage: 5
    //   },
    //   // 定义文本信息
    //   textInfo: {
    //     first: "首页",
    //     prev: "上一页",
    //     next: "下一页",
    //     last: "末页"
    //   },
    //   // 具体的每一条信息数组 
    //   data: arr
    // }
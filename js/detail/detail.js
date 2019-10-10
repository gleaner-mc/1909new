// 获取URL中的id部分
var search = window.location.search;
// 截取 
var id = search.split("=")[1];
// 获取row元素
var row = document.querySelector(".row");
// 判定 当前的页面到底是人为输入的网址 还是点击其它页面跳转过来的 
if (id) {

var productInfo = null;
// 发送ajax 去服务器请求对应的商品信息并显示在当前页面
AJAX.get("../server/getDetail.php", {
    id: id
}, function(data) {
    console.log(data);
    if (!data.error) {
        productInfo = data.data;
        row.innerHTML = "";
        row.innerHTML = `
        <div class="media">
                <div class="media-left">
                    <div class="box">
                        <div class="show">
                            <img src="${data.data.goods_big_logo}" alt="">
                            <div class="mask"></div>
                        </div>
                        <div class="list">
                            <p class="active">
                                <img src="https://images.s.cn/images/goods/20190409/0a2738c38284f2f1.jpg"
                                    showImg="${data.data.goods_big_logo}"
                                    enlargeImg="${data.data.goods_big_logo}" alt="">
                            </p>
                            <p>
                                <img src="https://images.s.cn/images/goods/20180806/642423d68083cb37.jpg"
                                    showImg="${data.data.goods_small_logo}"
                                    enlargeImg="${data.data.goods_small_logo}" alt="">
                            </p>
                        </div>
                        <div class="enlarge"></div>
                    </div>

                </div>
                <div class="media-body">
                    <h4 class="media-heading">${data.data.goods_name}</h4>

                    <div class="price">
                        <div>吊牌价：<i class="glyphicon glyphicon-yen"></i>
                            <span class="first">566</span></div>
                        <div class="price-2">销售价：<i class="glyphicon glyphicon-yen"></i>
                            <span class="second">${data.data.goods_price}</span>(打折)</div>
                        <div class="price-3">好评度：335人评论</div>
                        <div>运费：&nbsp;名鞋库会员满399包邮(不包括货到付款)</div>
                    </div>
                    <div class="chicun">
                        <p>尺码：</p>
                        <div class="btn-group" role="group" aria-label="...">
                            
                            <button type="button" class="btn btn-default">41</button>
                            <button type="button" class="btn btn-default">42</button>
                            <button type="button" class="btn btn-default">43</button>
                            <button type="button" class="btn btn-default">44</button>
                        </div>
                    </div>
                    <div class="buy">
                        <div class="btn-group" role="group" aria-label="...">
                            <button type="button" class="btn btn-default btn-1" name="buynow">立即购买</button>
                            <button type="button" class="btn btn-default btn-2 " name="addCart">
                            <i class="glyphicon glyphicon-shopping-cart"></i>
                                加入购物车</button>
                        </div>
                    </div>
                </div>
            </div>
        
        `
         
    var home = document.getElementById("home");
    home.innerHTML = data.data.goods_introduce;
    class Enlarge {
        constructor (ele) {
          this.ele = ele
      
          // 获取一下 show 盒子
          this.show = this.ele.querySelector('.show')
      
          // 获取遮罩层盒子
          this.mask = this.ele.querySelector('.mask')
      
          // 获取放大镜盒子
          this.enlarge = this.ele.querySelector('.enlarge')
      
          // 获取list 盒子
          this.list = this.ele.querySelector('.list')
      
          // 所有 p 标签的盒子
          this.p = this.list.children
          
          this.init()
        }
      
        init () {
          this.overOut()
          this.setScale()
          this.move()
          this.change()
        }
      
        // 1. 鼠标移入移出事件
        overOut () {
          this.show.addEventListener('mouseover', () => this.mask.style.display = this.enlarge.style.display = 'block')
          this.show.addEventListener('mouseout', () => this.mask.style.display = this.enlarge.style.display = 'none')
        }
      
        // 2. 调整一下放大镜盒子的比例
        setScale () {
          // 获取 mask 的尺寸
          const maskX = parseInt(getStyle(this.mask, 'width'))
          const maskY = parseInt(getStyle(this.mask, 'height'))
      
          // show 盒子的尺寸
          const showX = this.show.clientWidth
          const showY = this.show.clientHeight
      
          // 背景图的尺寸
          const bgX = parseInt(getStyle(this.enlarge, 'background-size').split(' ')[0])
          const bgY = parseInt(getStyle(this.enlarge, 'background-size').split(' ')[1])
      
          // 放大镜盒子的尺寸
          const enlargeX = maskX * bgX / showX
          const enlargeY = maskY * bgY / showY
      
          this.enlarge.style.width = enlargeX + 'px'
          this.enlarge.style.height = enlargeY + 'px'
        }
      
        // 3. 执行move行为
        move () {
          this.show.addEventListener('mousemove', e => {
            e = e || window.event
      
            let x = e.pageX - this.ele.offsetLeft - 100
            let y = e.pageY - this.ele.offsetTop - 100
      
            const showX = this.show.clientWidth
            const showY = this.show.clientHeight
      
            const maskX = this.mask.clientWidth
            const maskY = this.mask.clientHeight
      
            const enlargeX = this.enlarge.clientWidth
            const enlargeY = this.enlarge.clientHeight
      
            // 边界值判断
            if (x <= 0) {
              x = 0
            }
      
            if (y <= 0) {
              y = 0
            }
      
            if (x + maskX >= showX) {
              x = showX - maskX
            }
      
            if (y + maskY >= showY) {
              y = showY - maskY
            }
      
            // 给遮罩层盒子赋值
            this.mask.style.left = x + 'px'
            this.mask.style.top = y + 'px'
      
            // 按照比例让右边的放大镜盒子跟着动
            // 背景图片移动距离 = 遮罩层移动距离 * 放大盒子尺寸 / 遮罩层尺寸
            const bgX = x * enlargeX / maskX
            const bgY = y * enlargeY / maskY
      
            this.enlarge.style.backgroundPosition = `-${bgX}px -${bgY}px`
          })
        }
      
        // 4. 点击换个图片
        change () {
          const _this = this
          for (let i = 0; i < this.p.length; i++) {
            this.p[i].addEventListener('click', function () {
              for (let j = 0; j < _this.p.length; j++) {
                _this.p[j].className = ''
              }
      
              this.className = 'active'
      
              // this 是我点击的 p 标签
              // 你点击哪个 p 标签我就拿到了你应该展示的图片地址
              const showImg = this.children[0].getAttribute('showImg')
              _this.show.children[0].src = showImg
      
              const enlargeImg = this.children[0].getAttribute('enlargeImg')
              _this.enlarge.style.backgroundImage = 'url(' + enlargeImg + ')'
            })
          }
        }
      }
      
      function getStyle (ele, attr) {
        if (window.getComputedStyle) {
          return window.getComputedStyle(ele)[attr]
        } else {
          return ele.currentStyle[attr]
        }
      }
      const box = document.querySelector('.box')
      const e = new Enlarge(box)
      console.log(e)

    }
})

/* 
    购物车分析：
        1 检测用户是否登录
            1.1 已经登录
                1.1.1 判定是否有这个商品在购物车里
                    如果已经有这个商品 应该让数量 +1
                    如果没有这个商品 应该添加该商品

            1.2 没有登录
                1.2.1 跳回登录页面去登录


*/


// 使用委托模式 添加加入购物车事件 
row.onclick = function(e) {
    var e = e || window.event;
    // 判定用户点击到的元素是谁
    var target = e.target;
    // 获取target的name属性 如果name属性值是 addCart 就说明点击的是加入购物车
    var name = target.name;
    if (name === "addCart") {
        // 登录验证 如果登陆过 就允许添加到购物车 但是不跳转页面
        var global = getCookie("global");
        if (global) {
            // 将当前的商品加入到本地存储中
            var cartList = JSON.parse(localStorage.getItem("cartList")) || [];
            console.log(cartList)
            // 判定本地存储中是否有商品信息 
            if (!cartList.length) {
                // 如果没有 直接往里存放
                productInfo.cart_number = 1;
                cartList.push(productInfo);
                localStorage.setItem("cartList", JSON.stringify(cartList));
            } else {
                // 如果有内容 我们要先判定这个购物车里面是否有当前产品
                var product = cartList.find(function(item) {
                    return item.goods_id === productInfo.goods_id
                });
                if (product) {
                    // 如果有 就数量+1
                    product.cart_number++;
                } else {
                    // 如果没有产品 就添加一条
                    productInfo.cart_number = 1;
                    cartList.push(productInfo);
                }
                
                // 将修改之后的数据重新放回本地存储
                localStorage.setItem("cartList", JSON.stringify(cartList));

            }
        } else {
            // 跳转回登录页面
            location.href = "./login.html?target=" + encodeURIComponent(location.href);
        }
    } 
    if (name === "buynow") {
        // 登录验证 如果登录过 就允许立即购买 跳转到购物车页面
        var global = getCookie("global");
        if (global) {
            // 将当前的商品加入到本地存储中
            var cartList = JSON.parse(localStorage.getItem("cartList")) || [];
            // 判定本地存储中是否有商品信息 
            if (!cartList.length) {
                // 如果没有 直接往里存放
                productInfo.cart_number = 1;
                cartList.push(productInfo);
                localStorage.setItem("cartList", JSON.stringify(cartList));
            } else {
                // 如果有内容 我们要先判定这个购物车里面是否有当前产品
                var product = cartList.find(function(item) {
                    return item.goods_id === productInfo.goods_id
                });
                if (product) {
                    // 如果有 就数量+1
                    product.cart_number++;
                } else {
                    // 如果没有产品 就添加一条
                    productInfo.cart_number = 1;
                    cartList.push(productInfo);
                }
                // 将修改之后的数据重新放回本地存储
                localStorage.setItem("cartList", JSON.stringify(cartList));
            }
            // 因为点击的是立即购买 所以要跳转到购物车
            location.href = "./cart.html";
        } else {
            // 没有登陆过 
            console.log("没有登陆过 跳转到登录页面");
            // 跳转回登录页面
            location.href = "./login.html?target=" + encodeURIComponent(location.href);
        }
    }
}



} else {
    row.innerHTML = `
        <h1>您没有查看任何宝贝，请去查看！ <a href="./list.html">去选宝贝!</a></h1>
    
    `;
}

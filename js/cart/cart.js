// 先做登录检测
if (!getCookie("global")) {
    location.href = "./login.html?target=" + location.href;
}

// 获取本地存储中的数据 
var cartList = JSON.parse(localStorage.getItem("cartList")) || [];

// 获取元素
var listGroup = document.querySelector('.list-group');
// 判定数组的长度 如果为0 说明没有内容 我们就渲染一种页面 ，提醒用户去登录
if (!cartList.length) {
    listGroup.innerHTML = 
    `
    <div class="page-header">
        <h1>您的购物车空空如也！<small><a href="./list.html">请去选购商品吧！</a></small></h1>
    </div>
    `

} else {
    listGroup.innerHTML = "";
    // 如果不为0 说明用户购物车中有内容 就渲染具体的商品即可  
    cartList.forEach(function(item) {
        console.log(item);
        listGroup.innerHTML +=
        `
        <li class="list-group-item">
        <div class="item">
            <input type="checkbox" class="checkbox">
        </div>
        <div class="item">
            <img src="${item.goods_small_logo}" alt="" class="src">
        </div>
        <div class="item">
            <span class="info">${item.goods_name}</span>
        </div>
        <div class="item">
            <span class="price">￥${item.goods_price}</span>
        </div>
        <div class="operate">
                <div class="btn-group" role="group" aria-label="..."> 
                    <button type="button" class="btn btn-default" name="decrease" data-id="${item.goods_id}">-</button>
                    <button type="button" class="btn btn-default" disabled>${item.cart_number}</button>
                    <button type="button" class="btn btn-default" name="increase" data-id="${item.goods_id}">+</button>
                </div>
                 
        </div>
  </li>
        `;
    })
}

// 使用委托模式 添加增加购物车商品数量 减少购物车商品数量事件
listGroup.onclick = function(e) {
    // 兼容e
    var e = e || window.event;
    // 获取触发事件的元素
    var target = e.target;
    if (target.name === "increase") {
        // 点击到的是增加按钮
        // 获取自定义属性 data-id
        var productId = target.getAttribute("data-id");
        console.log("增加一个商品，商品id是" + productId);
        // 循环本地存储的数据 拿着id 去匹配 匹配到就让它的cart_number ++
        var product = cartList.find(function(item) {
            return item.goods_id === productId;
        })
        product.cart_number++;
        target.previousElementSibling.innerHTML++;
        localStorage.setItem("cartList", JSON.stringify(cartList))

    } else if (target.name === "decrease") {
        // 点击到的是减少按钮
        var productId = target.getAttribute("data-id");
        console.log("减少一个商品，商品id是" + productId);
        // 循环本地存储的数据 拿着id 去匹配 匹配到就让它的cart_number --
        var product = cartList.find(function(item) {
            return item.goods_id === productId;
        });
        if (product.cart_number > 0) {
            product.cart_number--;
            target.nextElementSibling.innerHTML--;
        }
        localStorage.setItem("cartList", JSON.stringify(cartList))
    }
}
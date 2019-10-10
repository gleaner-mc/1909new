// 验证登录的问题

const login = getCookie('global')

if (!login) {
  location.href = './login.html?target=' + location.href
}


// 已经登录过

// 1. 获取 localStorage 里面的数据
let cartList = JSON.parse(localStorage.getItem('cartList')) || []
// const cartList = []

// 判断数组的长度

const box = document.querySelector('.container')

// if (!cartList.length) {
//   // 证明没有东西
//   box.innerHTML = `
//     <div class="jumbotron">
//       <h1>您的购物车空空如也</h1>
//       <p>点击下方按钮快去选购吧! ^_^</p>
//       <p><a class="btn btn-primary btn-lg" href="./list.html" role="button">去选购</a></p>
//     </div>
//   `
// } else {
//   bindHtml()
// }

// 渲染页面
bindHtml()
function bindHtml() {
  if (!cartList.length) {
    // 证明没有东西
    box.innerHTML = `
      <div class="jumbotron">
        <h1>您的购物车空空如也</h1>
        <p>点击下方按钮快去选购吧! ^_^</p>
        <p><a class="btn btn-primary btn-lg" href="./list.html" role="button">去选购</a></p>
      </div>
    `
    return
  }

  // 全选按钮要不要选中取决于什么？
  // 数据里面每一个的 is_select 都是 true，那么我就是 true
  // 数据里面只要有一个 is_select 不是 true，我就是 false
  const selectAll = cartList.every(item => item.is_select === 1)

  // 准备一个变量 存储所选商品数量
  const selectInfo = selectShop()

  let str = `
    <div class="panel panel-info ">
      <div class="panel-body bg-info">
        <div class="checkbox">
          <label>
            <input id="selectAll" ${selectAll ? 'checked' : ''} type="checkbox" value="">
            全选
          </label>
          <span>&nbsp;&nbsp;&nbsp; 商品种类： ${cartList.length}</span>
          <span>&nbsp;&nbsp;&nbsp; 所选商品数量： ${selectInfo.count}</span>
          <span>&nbsp;&nbsp;&nbsp; 所选商品价格： ￥${selectInfo.price.toFixed(2)}</span>&nbsp;&nbsp;&nbsp;
          <span id="pay" class="btn btn-warning btn-xs">去结算</span>&nbsp;&nbsp;&nbsp;
          <span id="clear" class="btn btn-danger btn-xs">清空购物车</span>
        </div>

      </div>
      <div class="panel-footer">
        <ul class="cart-list">
  `

  cartList.forEach(item => {
    str += `
      <li class="cart-item">
        <div class="left">
          <input ${item.is_select === 1 ? 'checked' : ''} id="select" data-id="${item.goods_id}" type="checkbox">
        </div>
        <div class="right">
          <div class="media">
            <div class="media-left">
              <a href="#">
                <img class="media-object" src="${item.goods_big_logo}" alt="...">
              </a>
            </div>
            <div class="media-body">
              <h4 class="media-heading">${item.goods_name}</h4>
              <p>
                <i class="glyphicon glyphicon-yen"></i>
                <span>${item.goods_price}</span>
              </p>
              <div class="btn-group pull-right" role="group" aria-label="...">
                <button data-id="${item.goods_id}" type="button" class="btn btn-default" id="sub" ${item.cart_number - 0 === 1 ? 'disabled' : ''}>-</button>
                <button type="button" class="btn btn-default" disabled>${item.cart_number}</button>
                <button data-id="${item.goods_id}" type="button" class="btn btn-default" id="add" ${item.cart_number - 0 >= item.goods_number ? 'disabled' : ''}>+</button>
              </div>
              <button id="del" data-id="${item.goods_id}" class="btn btn-danger">我不要了</button>
            </div>
          </div>
        </div>
      </li>
    `
  })

  str += `
        </ul>
      </div>
    </div>
  `

  box.innerHTML = str
}

// 事件委托
box.addEventListener('click', e => {
  e = e || window.event
  const t = e.target

  // 数量上涨
  if (t.id === 'add') {
    // 遍历数组找到 id 对应的那一条
    const id = t.getAttribute('data-id')

    cartList.forEach(item => {
      if (item.goods_id === id) {
        item.cart_number = item.cart_number - 0 + 1
      }
    })

    localStorage.setItem('cartList', JSON.stringify(cartList))
    bindHtml()
  }

  // 数量减少
  if (t.id === 'sub') {
    // 遍历数组找到 id 对应的那一条
    const id = t.getAttribute('data-id')

    cartList.forEach(item => {
      if (item.goods_id === id) {
        item.cart_number = item.cart_number - 0 - 1
      }
    })

    localStorage.setItem('cartList', JSON.stringify(cartList))
    bindHtml()
  }

  // 删除一条
  if (t.id === 'del') {
    const id = t.getAttribute('data-id')

    // 删除数组中 goods_id === id 的那一条
    // filter
    // 1 2 3
    // 1 3
    cartList = cartList.filter(item => item.goods_id - 0 !== id - 0)

    localStorage.setItem('cartList', JSON.stringify(cartList))
    bindHtml()
  }

  // 单选判断
  if (t.id === 'select') {
    // console.log('我在点击选择复选框')
    // console.log(t.checked)
    const id = t.getAttribute('data-id')

    // 遍历数组，找到 id 对应的那一条
    cartList.forEach(item => {
      if (item.goods_id === id) {
        item.is_select = t.checked ? 1 : 0
      }
    })

    localStorage.setItem('cartList', JSON.stringify(cartList))
    bindHtml()
  }

  // 全选判断
  if (t.id === 'selectAll') {

    // 遍历数组
    cartList.forEach(item => {
      item.is_select = t.checked ? 1 : 0
    })

    localStorage.setItem('cartList', JSON.stringify(cartList))
    bindHtml()
  }

  // 判断结算
  if (t.id === 'pay') {
    alert('结算成功！ 您已经支付 ： ￥' + selectShop().price.toFixed(2))
    cartList = cartList.filter(item => item.is_select !== 1)

    localStorage.setItem('cartList', JSON.stringify(cartList))
    bindHtml()
  }

  // 判断清空
  if (t.id === 'clear') {
    cartList = []
    localStorage.setItem('cartList', JSON.stringify([]))
    bindHtml()
  }
})

// 计算所选商品数量的函数
// 能返回一个对象 { count: 10, price: 123.00 }
function selectShop() {
  // 找到所有选中过的商品
  const tmp = cartList.filter(item => item.is_select === 1)

  // console.log(tmp) // 所有选中商品的数组
  let count = 0
  let price = 0

  for (var i = 0; i < tmp.length; i++) {
    count += tmp[i].cart_number - 0
    price += tmp[i].goods_price * tmp[i].cart_number
  }

  return {
    count,
    price
  }
}

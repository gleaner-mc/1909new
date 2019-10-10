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

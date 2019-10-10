var $carousel = $(".carousel");
        var $cirs = $(".cirs");
        var $leftBtn = $("#leftBtn");
        var $rightBtn = $("#rightBtn");
        
        // 获取轮播图的一张图片的宽度
        var width = $carousel.children().width();
        // 定义信号量
        var idx = 0;
        var lock =true;
        $rightBtn.click(function() {
            if(!lock){
                return;
            }
            lock = false;
            idx++;
            $carousel.stop().animate({left: idx * - width}, 1000, function() {
                console.log("动画结束")
                if (idx >= $carousel.children().length - 1) {
                    idx = 0;
                    $carousel.css("left", "0");
                }
                $cirs.children().eq(idx).addClass("active").siblings().removeClass("active");
                lock = true;
            })
        })

        $leftBtn.click(function() {
            if(!lock){
                return;
            }
            lock = false;
            idx--;
            console.log(idx);
            console.log("动画结束")
            if (idx < 0) {
                idx = $carousel.children().length - 1;
                $carousel.css("left", idx * -width);
                idx--;
            }
            $carousel.stop().animate({left: idx * - width}, 1000, function() {
                $cirs.children().eq(idx).addClass("active").siblings().removeClass("active");
                lock = true;
            });
        });

        var timer = setInterval(function() {
            $rightBtn.trigger("click");
        }, 1000);

        $carousel.hover(function() {
           clearInterval(timer); 
        }, function() {
            timer = setInterval(function() {
                $rightBtn.trigger("click");
            }, 1000);
        })
// 1 发送ajax 请求一共多少条数据 
const getData = function() {
    return new Promise(function(resolve, reject) {
        AJAX.get("../server/getList.php", {}, function(data) {
            if (!data.error) {
                resolve(data);
            } else {
                reject("报错了");
            }
        });
    })
}
async function fun() {
    let data = await getData();
    console.log(data);
    // 获取元素
    let container = document.querySelector(".container");
    // 初始化分页结构
    let p = new Pagination(container, {
        pageInfo: {
            currentPage: 1,
            // 一共多少数据
            totalSize: data.data.length,
            // 一页显示多少数据
            pageSize: 20,
            // 一共多少页
            totalPage: Math.ceil(data.data.length / 20)
        },
         // 定义文本信息
        textInfo: {
            first: "首页",
            prev: "上一页",
            next: "下一页",
            last: "末页"
        },
        data: data.data
    });  

} 
let p = fun();
p.then(function() {
    console.log("执行完毕");
})
.catch(function(err) {
    console.log(err)
    console.log("报错了");
})
// 2 把分页组件渲染
// 3 默认显示前xxx条

# 什么是JSONP
````
请求方：frank.com的前端程序员(浏览器)
响应方：jack.com的后端程序员(服务器
1. 请求方创建script，src指向响应方，同时传一个参数?callbackName===xxx
2. 响应方根据查询参数callbackName,构造形如
    1. xxx.call(undefined,'你要的数据(JSON)')
    2. xxx('你要的数据(JSON)')
3. 浏览器接收到响应，就会执行 xxx.call(undefined,'你要的数据')
4. 那么请求方就知道了他要的数据
    
这就是JSONP    
这就是JSONP    
````
约定

1. callbackName -> callback
2. xxx -> 随机数 frank1334243232321()  
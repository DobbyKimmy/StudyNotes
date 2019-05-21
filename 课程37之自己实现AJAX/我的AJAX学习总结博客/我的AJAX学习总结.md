> 我的AJAX学习总结。

## 什么是同源策略
同源政策很简单，它的含义是指两个网页：
1. 协议相同
2. 域名相同
3. 端口相同

一旦以上三点中有任意一点不同，两个网站都不能称为同源。举例：
````
http://www.example.com/xxx
http://www.example.com/yyy
以上两个网站是同源的，满足协议,域名,端口都相同(http协议默认端口为80)
---------------------------
http://example.com/xxx
http://www.example.com/xxx
以上两个网站是非同源的，因为域名不同
---------------------------
http://127.0.0.1:8080/xxx
http://127.0.0.1:8888/xxx
以上两个网站是非同源的，因为端口号不同
````
#### 为什么要有同源政策
同源政策的目的其实就是为了保证用户信息的安全，防止恶意的网站数据窃取。
在阮一峰的博客中，在同源政策一节中对其作用描述如下：
````
"设想这样一种情况：
A网站是一家银行，用户登录以后，又去浏览其他网站。
如果其他网站可以读取A网站的 Cookie，会发生什么？
很显然，如果 Cookie 包含隐私（比如存款总额），这些信息就会泄漏。
更可怕的是：
Cookie 往往用来保存用户的登录状态。
如果用户没有退出登录，其他网站就可以冒充用户，为所欲为。"
````
所以自1995起，"同源政策"由网景引入浏览器后，所有浏览器都开始效仿了这一政策。不过同源政策带来的安全保障的同时，也带来了一些限制，其中一个限制就是**AJAX 请求不能发送**。
## XMLHttpRequest与CORS
上文说到同源政策的限制之一就是AJAX请求无法发送，我们知道AJAX的核心就是XMLHttpRequest。先看一个示例：
<br>
在我的hosts文件中，我事先已经写好了ip与域名的映射。
<br>
![6](https://user-gold-cdn.xitu.io/2019/5/19/16ad02e81133b719?w=247&h=71&f=png&s=3044)
<br>
代码如下：
````
var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
    console.log('Please appoint the port number\n Like node server.js 8888')
    process.exit(1)
}

var server = http.createServer(function(request, response){
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    var query = parsedUrl.query
    var path = parsedUrl.pathname
    if(path.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var method = request.method
    console.log('HTTP Path:\n'+path)
    if(path ==='/'){
        // sync是同步,async代表异步
        let string = fs.readFileSync('./index.html','utf8');
        response.statusCode = 200
        response.setHeader('Content-Type','text/html;charset=utf-8')
        response.write(string);
        response.end();
    }else if(path ==='/xxx'){
        response.statusCode = 200
        response.setHeader('Content-Type','text/json;charset=utf-8')
        response.write(`
           {
              "info":{
                 "name":"DobbyKim",
                 "age":"25",
                 "hobby":"唱跳rap篮球",
                 "girlfriend":"rightHand"
              }
           } 
        `)
        response.end();
    }
    else{
        response.statusCode = 404
        response.setHeader('Content-Type','text/html;charset=utf-8')
        response.write('wrong')
        response.end()
    }


    console.log(method+''+request.url)
})

server.listen(port)
console.log('Listen'+port+'Success\n Please open http://localhost:'+port)

````
前端代码：
````
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>你咬我啊</title>
</head>
<body>
<button id="btn">你咬我啊</button>
<script>
    btn.addEventListener('click',()=>{
        // 创建XMLHttpRequest对象
        let request = new XMLHttpRequest();
        // 初始化
        request.open('POST','http://dobby.com:8888/xxx');
        // 发送请求
        request.send();
        request.onreadystatechange = ()=>{
            // 请求及响应均成功
            if(request.readyState === 4){
                if(request.status>=200 && request.status<300){
                    let string = request.responseText;
                    let obj = window.JSON.parse(string);
                    console.log(string);
                    console.log(obj);
                }else{console.log('fail');}
            }
        }
    })
</script>
</body>
</html>
````
在前端script代码中，我们为按钮添加了事件，当按钮被click，当前页面就会向服务端发起请求,我们再来回想一下request.readyState的五个状态值：
````
0 ：代理被创建，但尚未调用open()方法
1 : open()方法已经被调用
2 : send()方法已经被调用
3 : 响应数据下载中
4 : 响应数据下载已完成
````
首先我们开启两个node-server，它们指定的端口号分别为：8888和8889。我们在浏览器分别输入URL:``dobby.com:8888``以及``frank.com:8889``。当我们在``dobby.com:8888``下点击按钮时,在浏览器的控制台上打印出了我们接收到的JSON数据。
<br>

![](https://user-gold-cdn.xitu.io/2019/5/19/16ad05d5e8664c22?w=816&h=251&f=png&s=19870)
<br>
但是，当我们在``frank.com:8889``下点击按钮，在控制台上则会报错：
<br>

![](https://user-gold-cdn.xitu.io/2019/5/19/16ad05f257ce41fc)
<br>
这也就进一步验证了AJAX受限于"同源政策"，对于我们上述示例来说，实际上这是一次跨域请求的过程即:A网站想要给B网站发送请求。由于同源政策，AJAX只能请求于协议,域名,端口号相同的网站，而在实际开发中，又有很多跨域的需求，所以AJAX自然也会使用一些方法规避同源政策。其实这也很简单,我们只需在后端代码中添加一句话即可:
````javascript
else if(path ==='/xxx'){
        response.statusCode = 200
        response.setHeader('Content-Type','text/json;charset=utf-8')
        // 添加了这句话以后，任何网站都可以请求dobbykim.com:8888
        // response.setHeader('Access-Control-Allow-Origin','*')
        response.setHeader('Access-Control-Allow-Origin','http://frank.com:8889')
        response.write(`
           {
              "info":{
                 "name":"DobbyKim",
                 "age":"25",
                 "hobby":"唱跳篮球rap",
                 "girlfriend":"rightHand"
              }
           } 
        `)
        response.end();
    }
````
上面我们就用到了**CORS**机制，所谓的CORS即Cross-Origin-Resource-Sharing，翻译成跨域资源共享，它使用额外的 HTTP 头来告诉浏览器  让运行在一个 origin (domain) 上的Web应用被准许访问来自不同源服务器上的指定的资源。也就是添加的：
````
response.setHeader('Access-Control-Allow-Origin','http://frank.com:8889');
````
当然我在注释也已经标明了：
````
response.setHeader('Access-Control-Allow-Origin','*');
````
如果``'Access-Control-Allow-Origin'``后面如果是一个通配符，则说明任何网站都可以向这个设置了CORS机制的后台服务器发送请求。
当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域 HTTP 请求。有了CORS机制，可以使AJAX进行跨域请求。并且AJAX同时也支持多种请求方式：get,post,put,delete等等。
## 回顾请求与响应
简单回顾下请求与响应：
#### 请求
一个标准的HTTP请求分为  3 or 4 个部分，如果这个请求是POST请求，则可以有第四部分即数据体，如果是一个简单的GET请求，则只包含三个部分。现以一个POST请求为例：
````
// 请求行：分别为 method ，path， 使用协议
POST / HTTP/1.1
// 请求头：key:value
Content-Type: text/html
... ...
// 空行:空行的作用是告知服务器，后面已经没有请求头的内容了

// 数据体：仅有提交数据的情况下，才有数据体
username: dobbykim
password: 666666
````
响应：
````
// 响应行: 分别为 协议，状态码， 状态码信息
HTTP/1.1 200 ok
// 响应头：key: value
Content-Type: text/html
... ...
// 空行: 空行的作用是告知浏览器，后面已经没有响应头的内容了

// 下载的内容如：一个html页面
<!DOCTYPE html>
<html lang="en">
<head>...</head>
<body>...</body>
</html>
````
## XMLHttpRequest对象操作请求与获取响应
在上文，我们使用了XMLHttpRequest发送请求，并在响应数据下载完毕后打印出了响应的内容，其实XMLHttpRequest对象，在发送请求与接收响应的过程中可以设置请求的任意部分，也可以获取到响应的任意部分。如：对于上例而言
````
btn.addEventListener('click',(e)=>{
    let request = new XMLHttpRequest();
    request.open('POST','/xxx')//初始化一个请求; 配置request
    request.setRequestHeader('dobby','18');
    request.setRequestHeader('Content-Type','x-www-form-urlencoded');
    request.send('a=1&b=2');
    request.onreadystatechange = ()=>{
        if(request.readyState === 4){
            if(request.status >=200 && request.status<300){
                console.log('获取响应的状态码');
                console.log(request.status);
                console.log('获取响应的状态码信息');
                console.log(request.statusText);
                console.log('获取响应的header');
                console.log(request.getAllResponseHeaders());
                console.log(request.getResponseHeader('Content-Type'));
                console.log('获取响应的第四部分');
                console.log(request.responseText);

            }else if(request.status>=400){
                console.log('说明请求失败');
            }
        }
    }
})
````
总结：
````
JS可以设置任意的请求部分
// 设置请求行
request.open('get','/xxx')
// 设置请求头
request.setRequestHeader('Content-Type'，'x-www-form-urlencoded')
request.setRequestHeader('dobby','18')
// 设置数据体
request.send('a=1&b=2')
````
JS可以获取到响应的任意部分
````
// 获取响应行信息
request.status // 获取状态码
request.statusText // 获取状态码信息
// 获取响应头信息
request.getResponseHeader('Content-Type')
// 获取响应头所有的信息
request.getAllResponseHeaders();
// 获取响应的内容(字符串)
request.responseText
````
## 自己实现一个简单的AJAX
首先，来看一看jQuery提供的AJAX,对于上述示例来说：
````
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>
<body>
    <button id="btn">点我</button>
    <script>
        btn.addEventListener('click',()=>{
            $.ajax({
                url:'/ppp',
                method:'get',
                success:(x)=>{console.log(x)},
                error:(x)=>{
                    console.log(x.status);
                    console.log(x.responseText);
                }
            })
        })
    </script>
</body>
</html>
````
我们知道jQuery的本质就是一个函数，jQuery的ajax本质上来说也是一个函数，函数可以传入对请求信息设置的一些参数，也可以设置响应成功时执行的函数，响应失败时执行的函数。接下来我们模仿这样一个API实现下我们自己的ajax。
````
window.jQuery = function () {}
    window.jQuery.ajax = function(options){
        let request = new XMLHttpRequest();
        let path = options.path;
        let method = options.method;
        let headers = options.headers;
        let successFn = options.success;
        let failFn = options.fail;
        let data = options.data;

        request.open(method,path);
        for(let key in headers){
            let value = headers[key];
            request.setRequestHeader(key,value);
        }
        request.onreadystatechange = ()=>{
            if(request.readyState === 4){
                if(request.status>=200 && request.status <300 ){
                    successFn(request.responseText);
                }else if(request.status >=400){
                    failFn(request);
                }
            }
        }
        request.send(data);
    }
    window.$ = window.jQuery;

    function success(responseText) {
        console.log(responseText);
    }
    function fail(request){
        console.log(request.responseText);
    }

    btn.addEventListener('click',()=>{
        window.jQuery.ajax({
            path:'/xxx',
            method:'POST',
            headers:{
                'Content-Type':'x-www-form-urlencoded',
                'DobbyKim':'good'
            },
            success:success,
            fail:fail,
            data:'a=1&b=2'
        })
    })
````
其实不难发现，我们只需要知道 ``request.open()``,``request.send()``这几个JS的方法以及它们所表示的含义，就不难实现这样一个简易版的ajax。对于以上代码其实还有可以值得优化的空间，这需要我们知道一个ES6语法的知识点：解构赋值。
## 解构赋值
我们直接来看MDN提供的几个例子：
<br>
先声明后赋值时的解构
````
var a,b;
[a,b] = [1,2];
console.log(a); //1
console.log(b); //2
````
交换变量
````javascript
var a = 1;
var b = 2;
[a,b] = [b,a];
console.log(a); // 2
console.log(b); // 1
````
解构赋值顾名思义，就是先解构后赋值，解构的含义自然是分析解构，对于解构赋值我并不打算了解太多，毕竟这只是一个语法糖，知道简单 的一些小例子即可。不过对于上面的代码，我们可以使用解构赋值来进行优化：
````
window.jQuery.ajax = function(options){
        let request = new XMLHttpRequest();
        let path = options.path;
        let method = options.method;
        let headers = options.headers;
        let success = options.success;
        let fail = options.fail;
        let data = options.data;
        ... ... 
}
````
可以将上面的代码优化为：
````
window.jQuery.ajax = function(options){
        let request = new XMLHttpRequest();
        let {path,method,headers,success,fail,data} = options;
         ... ...
}
````
进而,可以写成这样：
````
window.jQuery.ajax = function({path,method,headers,success,fail,data}){
... ... 
}
````
## 初涉Promise
简单地接触了Promise的一些相关语法，因为对其了解还不是很透彻，直接上代码，在整体学习Promise之后，我会再整理关于Promise的相关文章。
````
window.jQuery = function () {}
    window.jQuery.ajax = function({path,method,headers,data}){
        return new Promise((resolve,reject)=>{
            let request = new XMLHttpRequest();

            request.open(method,path);
            for(let key in headers){
                let value = headers[key];
                request.setRequestHeader(key,value);
            }
            request.onreadystatechange = ()=>{
                if(request.readyState === 4){
                    if(request.status>=200 && request.status <300 ){
                        resolve.call(undefined,request.responseText)
                    }else if(request.status >=400){
                        reject.call(undefined,request)
                    }
                }
            }
            request.send(data);
        })
    }
    window.$ = window.jQuery;

    btn.addEventListener('click',()=>{
        window.jQuery.ajax({
            path:'/xxx',
            method:'POST',
            headers:{
                'Content-Type':'x-www-form-urlencoded',
                'DobbyKim':'good'
            },
            data:'a=1&b=2'
        }).then(
            // when success
            (responseText)=>{console.log(responseText)},
            // when fail
            (request)=>{console.log(request)}
        )
    })
````
当然jQuery提供的ajax也支持Promise：
````
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>自己实现一个AJAX</title>
</head>
<body>
<button id="btn">click me</button>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script>
   btn.addEventListener('click',()=>{
       $.ajax({
           url:'/xxx',
           method:'POST',
       }).then(
           (responseText)=>{console.log(responseText)},
           (request)=>{console.log(request.responseText)}
           )
   })
</script>
</body>
</html>
````


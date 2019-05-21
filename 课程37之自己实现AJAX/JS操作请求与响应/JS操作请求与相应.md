# 视频：JS操作请求与响应
1. 设置请求头

    ````javascript
    request.setRequestHeader('frank','18');
    注意：此方法必须在open()和send()之间进行调用
    ````
    
2. JS设置请求的四个部分
    
    ````javascript
    // 设置请求的第一部分
    request.open('POST','/xxx')
    // 设置请求的第二部分
    request.setRequestHeader('dobby','18');
    request.setRequestHeader('Content-Type','x-www-form-urlencoded')
    // 设置请求的第四部分
    request.send('a=1&b=2');
    ````    
    
3. JS获取响应header
   
   ````
   // 获取响应的响应头
   request.getAllResponseHeaders()
   
   // 获取状态码  即 200
   request.status
   // 获取状态码信息 status message
   request.statusText
   
   // 获取 Content-Type 获取响应头的某一部分信息
   request.getResponseHeader('Content-Type')
   
   // 获取响应的第四部分 下载的内容
   request.responseText;
   
       // 响应部分
       HTTP/1.1 200 ok
       Content-Type:text/html
       
    ```` 
    
4. 方老师总结    

    ````
       JS可以设置任意请求的Header吗
       可以：
            第一部分：request.open('get','/xxx')
            第二部分：request.setHeader('content-type','x-www-form-urlencoded')
            第四部分：request.send('a=1&b=2')
       JS可以获取任意响应吗
       可以：
            第一部分：request.status / request.statusText
            第二部分：request.getResponseHeader('Content-Type') / request.getAllResponseHeaders()
            第四部分：request.responseText     
    ````
   
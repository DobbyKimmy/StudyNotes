# 同源策略与CORS跨域
1. 什么叫同源策略

    只有协议+端口+域名一模一样才允许发AJAX请求
    1. http://baidu.com可以向http://www.baidu.com发送AJAX请求吗？
    2. http://baidu.com:80可以向http://baidu.com:81发AJAX请求吗？
    
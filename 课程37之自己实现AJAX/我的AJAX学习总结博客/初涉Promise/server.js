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
    var pathWithQuery = request.url;
    var path = parsedUrl.pathname
    var queryString = '';
    if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var query = parsedUrl.query
    var method = request.method
    /****************************************/
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
              "note":{
                 "to":"crystal",
                 "from":"kim",
                 "heading":"hello",
                 "content":"tonight hit tiger"
              }
           } 
        `)
        response.end();
    }
    else{
        response.statusCode = 404
        response.setHeader('Content-Type','text/html;charset=utf-8')
        response.write(`
            {
                "error":"not found"
            }
        `)
        response.end()
    }

    // 代码结束，下面的不要看
    console.log(method+''+request.url)
})

server.listen(port)
console.log('Listen'+port+'Success\n Please open http://localhost:'+port)

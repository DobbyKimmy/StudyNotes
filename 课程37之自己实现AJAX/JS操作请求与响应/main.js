myButton.addEventListener('click',(e)=>{
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
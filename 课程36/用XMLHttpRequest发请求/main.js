myButton.addEventListener('click',(e)=>{
    let request = new XMLHttpRequest();
   /* request.onreadystatechange = function () {
        console.log(request.readyState)
    }*/
    request.onreadystatechange = function () {
        if(request.readyState === 4){
            console.log('请求和响应都完毕了')
            if(request.status >=200 && request.status <300){
                console.log('说明请求成功');
                console.log(request.responseText);

                // 将XML的字符串转换为DOM
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(request.responseText,'text/xml');
                let c = xmlDoc.getElementsByTagName('content')[0].textContent;
                console.log(c)
            }else{
                console.log('说明请求失败')
            }
        }
    }
    request.open('GET','/xxx')//初始化一个请求; 配置request
    request.send();// 发送请求。如果请求是异步的（默认），那么该方法将在请求发送后立即返回。
})
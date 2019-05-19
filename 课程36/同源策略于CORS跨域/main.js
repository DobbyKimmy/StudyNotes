myButton.addEventListener('click',(e)=>{
    let request = new XMLHttpRequest();
    request.onreadystatechange = ()=>{
        if(request.readyState === 4){
            console.log('请求响应都完毕了');
            if(request.status >=200 && request.status<300){
                console.log('说明请求成功');
                let string = request.responseText;
                console.log(string);
                // 将符合JSON语法的字符串 转换成JS对应的值
                let obj = window.JSON.parse(string);
                console.log(obj);

            }else if(request.status>=400){
                console.log('说明请求失败');
            }
        }
    }
    request.open('GET','http://jack.com:8002/xxx')//初始化一个请求; 配置request
    request.send();
})
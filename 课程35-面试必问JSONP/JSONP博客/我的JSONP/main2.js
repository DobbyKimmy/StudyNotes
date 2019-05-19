btn.addEventListener('click',()=>{
    let script = document.createElement('script');
    let functionName = 'dobby'+parseInt(Math.random()*10000,10);
    window[functionName] = (e)=>{
        if(e === 'success'){
            amount.innerText = amount.innerText - 1;
        }else{
            alert('fail');
        }
    }

    script.src = 'http://frank.com:8889/pay?callback='+functionName;
    document.body.appendChild(script);
    script.onload = (e)=>{
        e.currentTarget.remove();
        delete window[functionName];
    }
    script.onerror = ()=>{
        alert('fail');
        delete window[functionName];
    }
})
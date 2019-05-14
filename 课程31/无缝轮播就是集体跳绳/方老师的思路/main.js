$('.images>img:nth-child(1)').addClass('current')
$('.images>img:nth-child(2)').addClass('enter')
$('.images>img:nth-child(3)').addClass('enter')
var n = 0;
var arr1 = [1,2,3];
var arr2 = [2,3,1];
setInterval(()=>{
    $('.images>img:nth-child('+(arr1[n%3])+')')
        .addClass('leave').removeClass('current')
        .one('transitionend',(x)=>{
            $(x.currentTarget)
                .addClass('enter')
                .removeClass('leave')
        })
    $('.images>img:nth-child('+(arr2[n%3])+')')
        .addClass('current').removeClass('enter')
    n+=1;
},3000)

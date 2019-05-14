$('.images>img:nth-child(1)').addClass('current')
$('.images>img:nth-child(2)').addClass('enter')
$('.images>img:nth-child(3)').addClass('enter')
var n = 0;
var arr1 = [1,2,3];
var arr2 = [2,3,1];
setInterval(()=>{
    $('.images>img:nth-child('+(arr1[n%3])+')').css({
        transform:'translateX(-100%)'
    })
    $('.images>img:nth-child('+(arr2[n%3])+')').css({
        transform:'translateX(-100%)'
    })
    $('.images>img:nth-child('+(arr1[n%3])+')').one('transitionend',function (x) {
        $(x.currentTarget)
            .addClass('enter')
            .removeClass('current')
            .css({transform:'none'});
    })
    $('.images>img:nth-child('+(arr2[n%3])+')').one('transitionend',function (x) {
        $(x.currentTarget)
            .addClass('current')
            .removeClass('enter')
            .css({transform:'none'});
    })
    n+=1;
},3000)
/*
setTimeout(()=>{
    $('.images>img:nth-child(1)').css({
        transform:'translateX(-100%)'
    })
    $('.images>img:nth-child(2)').css({
        transform:'translateX(-100%)'
    })
    $('.images>img:nth-child(1)').one('transitionend',function (x) {
        $(x.currentTarget)
            .addClass('enter')
            .removeClass('current')
            .css({transform:'none'});
    })
    $('.images>img:nth-child(2)').one('transitionend',function (x) {
        $(x.currentTarget)
            .addClass('current')
            .removeClass('enter')
            .css({transform:'none'});
    })
},3000)
setTimeout(()=>{
    $('.images>img:nth-child(2)').css({
        transform:'translateX(-100%)'
    })
    $('.images>img:nth-child(3)').css({
        transform:'translateX(-100%)'
    })
    $('.images>img:nth-child(2)').one('transitionend',function (x) {
        $(x.currentTarget)
            .addClass('enter')
            .removeClass('current')
            .css({transform:'none'});
    })
    $('.images>img:nth-child(3)').one('transitionend',function (x) {
        $(x.currentTarget)
            .addClass('current')
            .removeClass('enter')
            .css({transform:'none'});
    })
},6000)
setTimeout(()=>{
    $('.images>img:nth-child(3)').css({
        transform:'translateX(-100%)'
    })
    $('.images>img:nth-child(1)').css({
        transform:'translateX(-100%)'
    })
    $('.images>img:nth-child(3)').one('transitionend',function (x) {
        $(x.currentTarget)
            .addClass('enter')
            .removeClass('current')
            .css({transform:'none'});
    })
    $('.images>img:nth-child(1)').one('transitionend',function (x) {
        $(x.currentTarget)
            .addClass('current')
            .removeClass('enter')
            .css({transform:'none'});
    })
},9000)
setTimeout(()=>{
    $('.images>img:nth-child(1)').css({
        transform:'translateX(-100%)'
    })
    $('.images>img:nth-child(2)').css({
        transform:'translateX(-100%)'
    })
    $('.images>img:nth-child(1)').one('transitionend',function (x) {
        $(x.currentTarget)
            .addClass('enter')
            .removeClass('current')
            .css({transform:'none'});
    })
    $('.images>img:nth-child(2)').one('transitionend',function (x) {
        $(x.currentTarget)
            .addClass('current')
            .removeClass('enter')
            .css({transform:'none'});
    })
},12000)*/

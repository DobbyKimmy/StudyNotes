let n = 0;
let arr = [];
// 初始化图片的位置
initImage();
// 初始化数组
initArr();

setInterval(()=>{
    makeLeave(getImage(n))
        .one('transitionend',(e)=>{
            makeEnter($(e.currentTarget))
        })
    makeCurrent(getImage(n+1))
    n+=1;
},3000)



function makeLeave($node){
    return $node.addClass('leave').removeClass('current enter');
}
function makeEnter($node){
    return $node.addClass('enter').removeClass('current leave');
}
function makeCurrent($node) {
    return $node.addClass('current').removeClass('leave enter');
}

function getImage(n) {
    return $(`.images>img:nth-child(${arr[n%getImageQuantity()]})`);
}

// 获取共有多少张图片
function getImageQuantity() {
    return $(`.images`).children('img').length
}
// 初始化数组
function initArr() {
    for(let i=0;i<getImageQuantity();i++){
        arr.push(i+1);
    }
}
// 初始化图片的位置
function initImage(){
    $(`.images>img:nth-child(1)`)
        .addClass('current')
        .siblings().addClass('enter');
}
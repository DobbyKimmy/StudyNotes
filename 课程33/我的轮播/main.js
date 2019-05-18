let $buttons = $('.buttonWrapper').children('svg');
let $slide = $('#slide');
let $images = $slide.children('img');
let imgLength = $('#slide').children('img').length;

let current = 0;
initMySlide();

$('#next').on('click',()=>{
    goToSlide(current+1);
})
$('#previous').on('click',()=>{
    goToSlide(current-1);
})

function goToSlide(index) {
    if(index>imgLength-1)
        index = 0;
    else if(index<0){
        index = imgLength - 1;
    }

    // 相当于最后一张图片到第一张图片
    if(current === imgLength-1 && index === 0){
        $slide.css({
            transform:`translateX(-${(imgLength+1)*400}px)`
        }).one('transitionend',()=>{
            $slide.hide().offset();
            $slide.css({
                transform:'translateX(-400px)'
            }).show();
        })
    }else if(current === 0 && index === imgLength-1){
        // 第一张图片到最后一张图片
        $slide.css({
            transform:'translateX(0px)'
        }).one('transitionend',()=>{
            $slide.hide().offset();
            $slide.css({
                transform:`translateX(-${imgLength*400}px)`
            }).show();
        })
    }else{
        $slide.css({
            transform:`translateX(-${(index+1) * 400}px)`
        })
    }
    current = index;
}
























/*$('.buttonWrapper').on('click','svg',function (e) {
    let $button = $(e.currentTarget);
    let index = $button.index();
    $slide.css({
        transform:`translateX(-${(index+1)*400}px)`
    })
})*/


/*$buttons.eq(0).on('click',function () {
    if(current===(imgLength-1)){
        // 从点击最后一张图片到第一张图片
        $slide.css({
            transform:`translateX(-${(imgLength+1)*400}px)`
        }).one('transitionend',()=>{
            $slide.hide().offset();
            $slide.css({
                transform:'translateX(-400px)'
            }).show();
        })
    }else if(current===0){
        $slide.css({
            transform:'translateX(-400px)'
        })
    }

    current = 0;
})
$buttons.eq(1).on('click',function () {
    $slide.css({
        transform:'translateX(-800px)'
    })
    current = 1;
})
$buttons.eq(2).on('click',function () {
    $slide.css({
        transform:'translateX(-1200px)'
    })
    current = 2;
})
$buttons.eq(3).on('click',function () {
    if(current===0){
        // 从点击第一张图片到最后一张图片
        $slide.css({
            transform:'translateX(0px)'
        }).one('transitionend',()=>{
            $slide.hide().offset();
            $slide.css({
                transform:'translateX(-1600px)'
            }).show();
        })
    }else{
        $slide.css({
            transform:'translateX(-1600px)'
        })
    }

    current = 3;
})*/
function initMySlide(){
    let $firstImg = $slide.children('img').eq(0).clone(true);
    let $lastImg = $slide.children('img').eq(imgLength-1).clone(true);
    // 初始化
    $slide.append($firstImg);
    $slide.prepend($lastImg);
    $slide.css({
        transform:'translateX(-400px)'
    })
}
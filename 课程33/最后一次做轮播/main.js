let $buttons = $('#buttonWrapper>button');
let $slides = $('#slides');
let $images = $slides.children('img');

let $firstImg = $images.eq(0).clone(true);
let $lastImg = $images.eq($images.length-1).clone(true);
$slides.append($firstImg);
$slides.prepend($lastImg);

$slides.css({
    transform:'translateX(-400px)'
})

let current = 0;

$buttons.eq(0).on('click',()=>{
    if(current===3){
        $slides.css({
            transform:'translateX(-2000px)'
        }).one('transitionend',()=> {
            $slides.hide().offset();
            $slides.css({
                transform:'translateX(-400px)'
            }).show();
        })

    }else{
        $slides.css({
            transform:'translateX(-400px)'
        })
    }

    current = 0;
})
$buttons.eq(1).on('click',()=>{
    $slides.css({
        transform:'translateX(-800px)'
    })
    current = 1;
})
$buttons.eq(2).on('click',()=>{
    $slides.css({
        transform:'translateX(-1200px)'
    })
    current = 2;
})
$buttons.eq(3).on('click',()=>{
    if(current===0){
        $slides.css({
            transform:'translateX(0px)'
        }).one('transitionend',()=> {
            $slides.hide().offset();
            $slides.css({
                transform:'translateX(-1600px)'
            }).show();
        })
    }else{
        $slides.css({
            transform:'translateX(-1600px)'
        })
    }
    current = 3;
})
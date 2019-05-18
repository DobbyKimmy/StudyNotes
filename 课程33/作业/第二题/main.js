$buttons = $('#slideBoxBar>ul>li');
for(let i=0;i<$buttons.length;i++){
    $buttons.eq(i).on('click',(e)=>{
        var index = $(e.currentTarget).index();
        var p = index*-920;
        $('#slideBox').css({
            transform:`translateX(${p}px)`
        })
        activeButton($(e.currentTarget));
        n = index;
    })
}
var n = 0;
var size = $buttons.length;
activeButton($buttons.eq(0));
var intervalId = setTimer();
function activeButton($button) {
    $button
        .addClass('active')
        .siblings('.active')
        .removeClass('active')
}
function setTimer() {
    return setInterval(()=>{
        n+=1;
        $buttons.eq(n%size).trigger('click');
    },3000)
}
$('#slideBox').on('mouseenter',()=>{
    window.clearInterval(intervalId);
})
$('#slideBox').on('mouseleave',()=>{
    intervalId = setTimer();
})
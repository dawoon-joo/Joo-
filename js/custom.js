var $header = $("#header");
var $menuWeb_li = $(".menuWeb>li");
var $sub = $menuWeb_li.find(".sub");
var speed = 500;

$menuWeb_li.on("mouseenter focusin",function(){
    var ht = $sub.outerHeight();
    var bg = $sub.css("background-color")
    var posY = $header.outerHeight();
    var isbgGnb = $(".bgGnb").length;

    if(!isbgGnb){
        $header.prepend(
            $("<div class='bgGnb'>")
        )
    }
    $(".bgGnb").stop().fadeIn(speed);
    $(this).children(".sub").stop().fadeIn(speed);
    $(this).children("a").addClass("on");
});

$menuWeb_li.on("mouseleave focusout",function(){
    $(".bgGnb").stop().fadeOut(speed /10, function(){
        $(this).remove();
    })
    $(this).children(".sub").stop().fadeOut(speed / 10);
    $(this).children("a").removeClass("on");
});


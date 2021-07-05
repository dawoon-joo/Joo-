var $slider = $("#slider");
var $list = $slider.find(".list1");
var $list_li = $list.find("li");
var $prev = $slider.find(".prev");
var $next = $slider.find(".next");
var speed = 1500;
var enableClick = true;

init($slider);


$(".next").on("click",function(e){
    e.preventDefault();
    if(enableClick){
        next($slider);
        
        enableClick = false;
    };
    
    
});

$prev.on("click",function(e){
    e.preventDefault();
    if(enableClick){
        
        prev($slider);
        enableClick = false;
    };
});

//초기화 함수 정의 //init($slider) 호출
function init(el){
    var len = el.children("ul").children("li").length;
    el.children("ul").css({width:100 * len +"%"});
    el.children("ul").children("li").css({
        width: 100 / len + "%"
    });
    el.children("ul").find("li").last().prependTo(el.children("ul"));
};



function next(el){
    el.children("ul").animate({marginLeft : "-200%"},500,function(){
        el.children("ul").css({marginLeft : "-100%"});
        el.children("ul").find("li").first().appendTo(el.children("ul"));
        enableClick = true;
    });
}
function prev(el){
    el.children("ul").animate({marginLeft : "0%"},500,function(){
        el.children("ul").css({marginLeft : "-100%"});
        el.children("ul").find("li").last().prependTo(el.children("ul"));
        enableClick = true;
    });
}
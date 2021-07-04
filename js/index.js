var prev = $(".btnPrev");
var next = $(".btnNext");
var list = $(".list");

next.on("click", function(e){
    e.preventDefault();
    list.find("li").removeClass("on");
    list.find("li").eq(3).addClass("on");

    list.stop().animate({marginLeft : "-60%"},500, function(){
        list.find("li").first().appendTo(list);
        list.css({marginLeft: "-40%"});
    });
});

prev.on("click", function(e){
    e.preventDefault();
    list.find("li").removeClass("on");
    list.find("li").eq(1).addClass("on");

    list.stop().animate({marginLeft : "-20%"},500, function(){
        list.find("li").last().prependTo(list);
        list.css({marginLeft: "-40%"});
    });
});
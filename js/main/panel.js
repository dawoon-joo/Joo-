var prev1 = $(".btnPrev1");
var next1 = $(".btnNext1");
var list1 = $(".list1");

next1.on("click", function(e){
    e.preventDefault();

    list1.find("li").removeClass("on");
    list1.find("li").eq(5).addClass("on");

    list1.stop().animate({ marginLeft: "-60%"}, 500, function(){
        list1.find("li").first().appendTo(list1);
        list1.css({ marginLeft: "-40%"});        
    });
});
prev1.on("click", function(e){
    e.preventDefault();
    list1.find("li").removeClass("on");
    list1.find("li").eq(3).addClass("on");

    list1.stop().animate({marginLeft : "-20%"},500, function(){
        list1.find("li").last().prependTo(list1);
        list1.css({marginLeft: "-40%"});
    });
});
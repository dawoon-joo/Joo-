var pos0 = $("#header").offset().top; 
var pos1 = $("#main").offset().top; 
var pos2 = $("#global").offset().top; 
var pos3 = $("#panel").offset().top; 
var pos4 = $("#banner").offset().top; 
var pos5 = $("#concept").offset().top; 



$(window).on("scroll", function(){
    var scroll = $(this).scrollTop(); 
    $("#navi li a").removeClass("on");
    if(scroll >= pos0 && scroll< pos1 ){       
        $("#navi li").eq(0).children("a").addClass("on"); 
    }
    if(scroll >= pos1 && scroll< pos2 ){       
        $("#navi li").eq(1).children("a").addClass("on"); 
    }
    if(scroll >= pos2 && scroll < pos3 ){      
        $("#navi li").eq(2).children("a").addClass("on"); 
    } 
    if(scroll >= pos3 && scroll < pos4){      
        $("#navi li").eq(3).children("a").addClass("on"); 
    }
    if(scroll >= pos4 && scroll < pos5){      
        $("#navi li").eq(4).children("a").addClass("on"); 
    } 
    if(scroll >= pos5){      
        $("#navi li").eq(5).children("a").addClass("on"); 
    }
});

//내비 버튼을 클릭했을 때 
$("#navi li a").on("click", function(e){
    e.preventDefault(); 

    var target = $(this).attr("href");
    var targetPos = $(target).offset().top;              

    $("html, body").animate({
        scrollTop: targetPos
  },1000); 
});
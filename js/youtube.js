// (function($){

// })(jQuery);




function Youtube(){
    this.init();
    this.bindingEvent();
}

Youtube.prototype.init = function(){
    this.frame = $("#vidGallery .inner");
    this.key = "AIzaSyAbsihuuotg-DuSq6se3m8uKEz4j-B5Pg8";
    this.playList ="PLWKqsm200CTmqRv0pQcxtq1snU1_i2inu";
    this.count = 6;
}

Youtube.prototype.bindingEvent = function(){
    this.callDate();
    $("body").on("click",".pic",function(e){
        e.preventDefault();
        var vidId = $(this).attr("href");
        this.createPop(vidId);
        $("body").css({overflow:"hidden"})
    }.bind(this));
    
    $("body").on("click",".pop .close",function(e){
        e.preventDefault();
        $(this).parent(".pop").remove();
        $("body").css({overflow:"auto"})
    });
}

Youtube.prototype.callDate = function(){
    $.ajax({
        url:"https://www.googleapis.com/youtube/v3/playlistItems",
        dataType:"jsonp",
        data:{
            part:"snippet",
            key:this.key,
            playlistId:this.playList,
            maxResults:this.count
        }
    })
    .success(function(data){
        var item = data.items;
        this.createList(item);
    }.bind(this))
    .error(function(err){
        console.log(err);
    })
}

Youtube.prototype.createList = function(items){
    $(items).each(function(index,data){
        console.log(data);
        var txt = data.snippet.title;
        var tit = data.snippet.videoOwnerChannelTitle;
        var date = data.snippet.publishedAt.split("T")[0];
        var imgSrc = data.snippet.thumbnails.high.url;
        var vidId = data.snippet.resourceId.videoId;
        if(txt.length>50) {txt= txt.substr(0, 50)+"...";}
    
        this.frame
            .append(
                $("<article>")
                    .append(
                        $("<a class='pic'>")
                            .attr({href: vidId})
                            .css({backgroundImage:"url("+imgSrc+")"}),
                        $("<div class='con'>")
                            .append(
                                $("<h2>").text(tit),
                                $("<p>").text(txt),
                                $("<span>").text(date),
                                $("<a class='more'>").text("view more"),
                                $("<ul class='sns'>")
                                    .append(
                                        $("<li>")
                                            .append(
                                                $("<a>")
                                                    .append(
                                                        $("<i class='fab fa-instagram-square'></i>")
                                                    )
                                            ),
                                        $("<li>")
                                            .append(
                                                $("<a>")
                                                    .append(
                                                        $("<i class='fab fa-twitter-square'></i>")
                                                    )
                                            ),
                                        $("<li>")
                                            .append(
                                                $("<a>")
                                                    .append(
                                                        $("<i class='fab fa-facebook-square'></i>")
                                                    )
                                            )
                                    )
                            )
                    )
            )
    }.bind(this))
}

Youtube.prototype.createPop = function(vidId){
    $("body")
        .append(
            $("<aside class='pop'>")
                .css({
                    width:"100%",
                    height:"100vh",
                    backgroundColor:"rgba(0,0,0,0.9",
                    position:"fixed",
                    top:"50%", left:"50%",
                    transform:"translate(-50%,-50%)",
                    padding:50,
                    boxSizing:"border-box"
                })
                .append(
                    $("<a class='close'>").text("close")
                        .css({
                            position:"absolute",
                            top:20, right:20,
                            color:"#fff"
                        })
                )
                .append(
                    $("<img src='img/loading.gif'>")
                    .css({
                        width:400,
                        position:"absolute",
                        top:"50%", left:"50%",
                        transform:"translate(-50%, -50%)"
                    })
                )
                .append(
                    $("<div class='con'>")
                        .css({
                            width:"100%",
                            height:"100%",
                            position:"relative",
                            display:"none"
                        })
                        .append(
                            $("<iframe>")
                                .attr({
                                    src:"https://www.youtube.com/embed/"+vidId,
                                    frameborder:0,
                                    allowfullscreen:true,
                                    width:"100%", height:800
                                })
                        )
                )
        )
        setTimeout(function(){
            $(".pop .con").fadeIn(500, function(){
                $(this).prev().remove();
            })
        }.bind(this),1000)
}
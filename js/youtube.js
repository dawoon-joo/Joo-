(function($){
    //디폴트 옵션값
    $.defaults = {      
        count :9
    }

    //제이쿼리 객체에 플러그인 등록 코드
    $.fn.myYoutube = function(option){
        //기본 옵션값이랑 사용자가 지정한 옵션 객체 합침
        var result_opt = $.extend({}, $.defaults, option);

        if(result_opt.key == undefined || result_opt.playList == undefined){
            console.error("key와 playList는 필수입력사항입니다.");
            //location.href="https:://www.플러그인문서.html";
        }

        //인스턴스 복사 this->선택자, result_opt->합쳐진 옵션 객체
        new Youtube(this, result_opt);
        return this;
    }

    function Youtube(el, option){
        this.init(el,option);
        this.bindingEvent();
    } 

    Youtube.prototype.init = function(el, opt){
        this.frame = el; //$("#vidGallery")
        this.key = opt.key;
        this.playList = opt.playList;
        this.count = opt.count;
    }
    Youtube.prototype.bindingEvent= function(){
        this.callData();
    
        $("body").on("click", "article a", function(e){
            e.preventDefault();
            var vidID = $(e.currentTarget).attr("href");
            this.createPop(vidID);
        }.bind(this));
    
        $("body").on("click", ".pop_youtube .close", function(e){
            e.preventDefault();
            this.removePop();
        }.bind(this));
    }
    Youtube.prototype.callData= function(){
        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/playlistItems",
            dataType: "jsonp",
            data: {
                part: "snippet",
                key: this.key,
                playlistId: this.playList,
                maxResults: this.count
            }
        })
        .success(function(data){
            var items = data.items;  
            this.createList(items);
        }.bind(this))
        .error(function(err){
            console.error(err);
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
    Youtube.prototype.createPop= function(vidID){
        $("body")
            .append(
                $("<aside class='pop_youtube'>")
                    .css({
                        width: "100%", height: "100%",
                        position: "fixed", top: 0, left: 0,
                        backgroundColor: "rgba(0,0,0,0.9)",
                        display: "none", boxSizing: "border-box",
                        padding: 100
                    })
                    .append(
                        $("<img src='img/loading.gif'>")
                            .css({
                                width: 200,
                                position: "absolute",
                                top: '50%',
                                left: '50%',
                                transform: "translate(-50%, -50%)"
                            })
                    )
                    .append(
                        $("<div class='con'>")
                            .css({
                                width: "100%",
                                height: "100%",
                                position: "relative",
                                display: "none"
                            })
                            .append(
                                $("<iframe>")
                                    .attr({
                                        src: "https://www.youtube.com/embed/"+vidID,
                                        width: "100%",
                                        height: "100%",
                                        frameborder: 0,
                                        allowfullscreen: true
                                    })
                            )
                    )
                    .append(
                        $("<a href='#' class='close'>")
                            .text("close")
                            .css({
                                position: "absolute", top: 20, right: 20,
                                color: "#fff"
                            })
                    ).fadeIn()
            );// pop append ends
    
            setTimeout(function(){
                $(".pop_youtube .con").fadeIn(500, function(){
                    //$(".pop > img").remove();
                })
            },2000);
    
    }
    Youtube.prototype.removePop= function(){
        $(".pop_youtube").fadeOut(500,function(){
            $(this).remove();
        })
    } 

})(jQuery);





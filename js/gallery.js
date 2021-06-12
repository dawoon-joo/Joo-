//46caa83347cecb3bd94f4d1ccbbb627e

var url = "https://www.flickr.com/services/rest/?method=flickr.interestingness.getList";
var key = "46caa83347cecb3bd94f4d1ccbbb627e"
var url_search = "https://www.flickr.com/services/rest/?method=flickr.photos.search";
var searchBtn = $("#search button");
var searchInput = $("#search input");
var targetEl = "#gallery ul";
var num = 7;
getFlickr(url,num);



$("body").on("click", ".list li a",function(e){
    e.preventDefault();
    var imgSrc = $(this).attr("href");
    createPop(imgSrc);
})

$("body").on("click",".pop span",function(e){
    e.preventDefault();
    $(this).parent().fadeOut(500,function(){
        $(this).remove();
    });
});

searchBtn.on("click",function(e){
    e.preventDefault();
    var tags = searchInput.val();
    if(tags == "") alert("검색어를 입력하세요.");
    getFlickr(url_search, num, tags);
})





function getFlickr(url, num, tags){
    $.ajax({
        url:url,
        dataType:"json",
        data : {
            api_key :key,
            per_page: num,
            format:"json",
            nojsoncallback:1,
            tags: tags
        }
    })
    .success(function(data){
        $(targetEl).empty();
        var item = data.photos.photo;
        console.log(item);
        
        $(item).each(function(index, data){
            var text = this.title;
            if(!this.title) text = "default text";

            $("#gallery .list")
                .append(
                    $("<li>")
                        .append(
                            $("<a>")
                                .attr({
                                    href:"https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_b.jpg"
                                })
                                .append(
                                    $("<img>")
                                    .attr({
                                        src:"https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_m.jpg",
                                        onerror:"javascript:this.parentNode.parentNode:style='display:none;'"
                                    })
                                ),
                                $("<p>").text(text)
                        )
                )
        })


    })
    .error(function(err){
        console.lor("데이터를 불러오는데 실패했습니다.")
    })
}


function createPop(imgSrc){
    $("body").append(
        $("<aside class='pop'>")
            .append(
                $("<img>")
                .attr({src:imgSrc})
            )
            .append(
                $("<span>")
                .text("close")
            )
    )
    $(".pop").fadeIn();
}
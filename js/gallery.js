//46caa83347cecb3bd94f4d1ccbbb627e

$("body").prepend(
    $("<img class='on loading'>").attr("src", "img/loading.gif")
)

function Flickr(){
    this.init();
    this.bindingEvent();
}

Flickr.prototype.init = function(){
    this.url = "https://www.flickr.com/services/rest/?method=flickr.interestingness.getList";
    this.key = "46caa83347cecb3bd94f4d1ccbbb627e"
    this.url_search = "https://www.flickr.com/services/rest/?method=flickr.photos.search";
    this.searchBtn = $("#search button");
    this.searchInput = $("#search input");
    this.targetEl = "#gallery ul";
    this.num = 7;
}

Flickr.prototype.bindingEvent = function(){
    this.getFlickr(this.url, this.key, this.num);

    $("body").on("click", ".list li a",function(e){
        e.preventDefault();
        var imgSrc = $(this).attr("href");
        createPop(imgSrc);
    }.bind(this))
    
    $("body").on("click",".pop span",function(e){
        e.preventDefault();
        $(this).parent().fadeOut(500,function(){
            $(this).remove();
        }.bind(this));
    });
    
    this.searchBtn.on("click",function(e){
        e.preventDefault();
        this.search();
    }.bind(this))
    
    $(window).on("keypress", function(e){
        if(e.keyCode === 13){
            this.search();
        }
    }.bind(this))
}


Flickr.prototype.getFlickr = function(url, key, num, tags){
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
        var item = data.photos.photo;
        this.createList(item);
    }.bind(this))
    .error(function(err){
        console.lor("데이터를 불러오는데 실패했습니다.")
    })
}


Flickr.prototype.createList = function(data){
    var $targetEl = $(this.targetEl.selector);
    $targetEl.empty();
        
    $(data).each(function(index, data){
        var text = data.title;
        if(!data.title) text = "default text";

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
    this.isoLayout();
}


Flickr.prototype.isoLayout = function(){
 //DOM생성 이후 img돔 요소만 찾아서 유사배열로 저장
 var imgs = $(this.targetEl).find("img");
 var count = 0;

  //모든 imgDOM을 반복을 돌림    
 $(imgs).each(function(index, data){

      //해당 DOM의 소스이미지가 완료가 되면 실행되는 onload이벤트 실행
     data.onload = function(){
          //각 소스이미지가 로딩완료되면 카운트값이 1씩 증가
         count++;

          //카운트 값이 전체 이미지갯수와 동일해지면
          //(모든 소스이미지가 로딩이 완료되면)
          //그때 isoLayout함수 호출
         if(count == this.num){
             new Isotope(targetEl, {
                 itemSelector : "#gallery ul li",
                 columnWidth: "#gallery ul li",
                 transitionDuration: "0.5s"
             });
             $("#gallery").addClass("on");
             $(".loading").removeClass("on");
         }
     }
 });
}


Flickr.prototype.search = function(){
    var tags = searchInput.val();
    if(tags == ""){
        alert("검색어를 입력하세요.");
        return;
    } 
    $("#gallery").removeClass("on");
    $(".loading").addClass("on");
    this.getFlickr(this.url_search, this.key, this.num, this.tags);
}

Flickr.prototype.createPop = function(imgSrc){
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


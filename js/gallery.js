//46caa83347cecb3bd94f4d1ccbbb627e

var url = "https://www.flickr.com/services/rest/?method=flickr.interestingness.getList";
var key = "46caa83347cecb3bd94f4d1ccbbb627e"
getFlickr(url, key, 7);

function getFlickr(url, key, num){
    $.ajax({
        url:url,
        dataType:"json",
        data : {
            api_key :key,
            per_page: num,
            format:"json",
            nojsoncallback:1
        }
    })
    .success(function(data){
        var item = data.photos.photo;
        console.log(item);

        $(item).each(function(index, data){
            var text = this.title;
            if(!this.title) text = "default text";

            $("#gallery .inner .list")
                .append(
                    $("<li>")
                        .append(
                            $("<a>")
                                .attr({
                                    href:"https://live.staticflickr.com/"+this.server+"/"+this.id+"_"+this.secret+"_b.jpg"
                                })
                                .append(
                                    $("<img>")
                                    .attr({
                                        src:"https://live.staticflickr.com/"+this.server+"/"+this.id+"_"+this.secret+"_m.jpg",
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
var container = document.querySelector('#map'); //연결할 맵의 선택자
var branch_btns = document.querySelectorAll(".branch li"); //지점보기 버튼 선택자


//처음 로딩완료시 출력될 지도의 경도, 위도
//1. 구글맵에서 검색해서 검도,위도값 구함(위치값이 정밀하지못함)
//2. 카카오맵 api에서 클릭으로 마커표시 샘플코드(위의 위치값을 적용)
//3. 해당 위치에서 우리가 원하는 위치를 정밀하게 마커로 찍어서 표시(위도, 경도값) 구함
var options = {
	center: new kakao.maps.LatLng(37.5130525,127.0582537),
	level: 3
};

var map = new kakao.maps.Map(container, options); 
 
//option -----------------------------------------------------------


var mapTypeControl = new kakao.maps.MapTypeControl();


map.addControl(mapTypeControl, kakao.maps.ControlPosition.BOTTOMRIGHT);


//각각의 본점, 지점의 이름, 위도,경도, 마커이미지, 마커수정위치값, 매칭되는 버튼을 등록
var markerOptions = [
    {
        title:"본점", 
        latlng: new kakao.maps.LatLng(37.5130525,127.0582537),
        imgSrc : 'img/location_pin.png', 
        imgSize: new kakao.maps.Size(70,70),
        imgPos : { offset: new kakao.maps.Point(116,99)},
        button: branch_btns[0]
    },
    {
        title:"지점1", 
        latlng: new kakao.maps.LatLng(37.507025,126.7541541),
        imgSrc : 'img/location_pin.png', 
        imgSize: new kakao.maps.Size(70,70),
        imgPos : { offset: new kakao.maps.Point(116,99)},
        button: branch_btns[1]
    },
    {
        title:"지점2", 
        latlng: new kakao.maps.LatLng(38.1195495,128.4567819),
        imgSrc : 'img/location_pin.png', 
        imgSize: new kakao.maps.Size(70,70),
        imgPos : { offset: new kakao.maps.Point(116,99)},
        button: branch_btns[2]
    }
]; 

for(var i=0; i< markerOptions.length; i++){
    new kakao.maps.Marker({
        map:map,
        position:markerOptions[i].latlng,
        title: markerOptions[i].title, 
        image: new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)
    });

    (function(index){
        markerOptions[index].button.onclick = function(e){         
             e.preventDefault(); 
                        
            for(var k=0; k<markerOptions.length; k++){
                markerOptions[k].button.classList.remove("on"); 
            }
            markerOptions[index].button.classList.add("on"); 
            moveTo(markerOptions[index].latlng); 
        }
    })(i);   
}

window.onresize = function(){
    var active_btn = document.querySelector(".branch li.on");//지점버튼의 활성화 선택자명
    var active_index = active_btn.getAttribute("data-index");//해당 버튼의 data-index속성값   
    console.log(active_index); 
    map.setCenter(markerOptions[active_index].latlng);
}




function moveTo(target){
    var moveLatLon = target; 
    map.setCenter(moveLatLon); 
}
   
var t_on = document.querySelectorAll(".traffic li")[0];//트래픽보기버튼 선택자
var t_off = document.querySelectorAll(".traffic li")[1];//트래픽 숨기기버튼 선택자

t_on.addEventListener("click", function(e){
    e.preventDefault(); 

    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); 
    t_on.classList.add("on"); 
    t_off.classList.remove("on"); 
}); 
t_off.addEventListener("click", function(e){
    e.preventDefault(); 
    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    t_on.classList.remove("on"); 
    t_off.classList.add("on"); 
});

setDraggable(true);
function setDraggable(draggable) {
    // 마우스 드래그로 지도 이동 가능여부를 설정합니다
    map.setDraggable(draggable);    
}


setZoomable(true); //false 
function setZoomable(zoomable) {
    // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
    map.setZoomable(zoomable);    
}
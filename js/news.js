/*
1.즉시실행함수로 생성자함수코드 모두를 감싸준다
2. 플러그인코드를 생성하고 생성자함수의 인스턴스를 생성
3-1. index에서 플러그인 호출구문 작성하고 선택자를 넣는다
3-2. 플러그인 코드에서 this로 매칭
4. 생성자함수에서 selector부분을 $("#Tab1")에 매칭해서 수정
5.option 추가하기 위해서 $.default로 옵션만들고 플러그인안에서 $.extend로 옵션 합치기
6.파라미터에 opt추가하고, 생성자함수에도 option파라미터 추가
*/

(function($){      //.1

    //옵션 5
    $.defaults ={
       active_class :"active"
    }
    //플러그인코드 .2
    $.fn.myTab = function(opt){
       //옵션 객체 합치기 5
       option = $.extend({}, $.defaults, opt)
 
       new Tab(this,option);//3-2
 
       return this;
    }
 
    //파라미터에 option추가
    function Tab(selector, option){
       this.init(selector, option); 
       this.bindingEvent(); 
    }
 
    //4. $(selector) => selector
    //6. option추가
    Tab.prototype.init = function(selector, option){
       this.opt = option; //6.option추가
       this.$frame = selector; 
       this.$btns = this.$frame.find("ul>li"); 
       this.$boxs = this.$frame.find("div>div");
    }
    
    Tab.prototype.bindingEvent = function(){
       var inst = this; // 인스턴스의 this
       inst.$btns.on("click", function(e){
          e.preventDefault();    
          var i = $(this).index(); 
    
          inst.activation(i);     
       });
    }
    //"on"을 this.opt.active_class로 구문바꾸기
    Tab.prototype.activation = function(index){
       this.$btns.removeClass(this.opt.active_class); 
       this.$boxs.removeClass(this.opt.active_class);
       this.$btns.eq(index).addClass(this.opt.active_class);     
       this.$boxs.eq(index).addClass(this.opt.active_class); 
    }
    
 
 })(jQuery);   
 
 
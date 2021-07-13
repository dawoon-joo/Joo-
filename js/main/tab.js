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
 
 
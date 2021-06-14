$("input[type=submit]").on("click", function(e){    
    if( !isTxt("userid", 5) ) e.preventDefault();
    if( !isPwd("pwd1", "pwd2", 5) ) e.preventDefault();    
    if( !isTxt("comments", 20) ) e.preventDefault();
    if( !isCheck("hobby") ) e.preventDefault();
    if( !isCheck("gender") ) e.preventDefault();
    if( !isTxt("email1") ) e.preventDefault();
    if( !isSelect("email2") ) e.preventDefault();
});

function isTxt(name, len){
    if(len==undefined) len=5;
    var txt = $("[name="+name+"]").val();
    var msg = $("[name="+name+"]").attr("placeholder");
    
    it(txt=="")
}
var btnCall = document.querySelector(".btnCall");
var menuMo = document.querySelector(".menuMo");
var wrap = document.querySelector("#header .wrap");



btnCall.onclick = function () {
    wrap.classList.toggle("on");
    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
}

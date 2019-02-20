$(function(){
    var nick = document.querySelectorAll(".cell > .nickname");
    for(var i = 0; i < nick.length; i++){
        nick.item(i).addEventListener("click",function(){
           window.location.href = "http://localhost/campus_resources/userinfo/userinfo.html?nickname="+this.innerHTML.trim();
        });
    }
});
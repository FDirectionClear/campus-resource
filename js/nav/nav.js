$(function(){
    var menu = document.querySelector(".menu");
    if(menu.getAttribute("shouldShow") == "yes"){ // 如果为yes说明了肯定是用户登录之后的
        var menu_style = menu.style.display;
        menu.style.setProperty("display","none");
        document.getElementById("caret").addEventListener("click",function(){ // 点击头像后面的三角，显示toggle显示个人面板
            if(menu.style.display == "none"){
                menu.style.setProperty("display",menu_style);
            }
            else{
                menu.style.setProperty("display","none");                
            }
        });
    } else {
        return false;
    }
});


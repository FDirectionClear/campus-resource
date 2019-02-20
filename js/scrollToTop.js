$(function(){
    var scrollToTop = document.querySelector(".scroll-to-top");
    window.addEventListener("scroll",function(){
        if(document.documentElement.scrollTop >= 100){
            scrollToTop.style.display = "block";
        } else {
            scrollToTop.style.display = "none";
        }
    })
    scrollToTop.addEventListener("click",function(){
        // console.log(document.documentElement);
        console.log(document.documentElement.scrollTop);
        document.documentElement.scrollTop = 0;
    })
});
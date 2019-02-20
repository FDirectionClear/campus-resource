// 注意： 本js是对应主页中简历缩略面板的js，而非公屏的那个。
;$(function(){
    var del = document.querySelectorAll("span.glyphicon-remove.delete");
    for(let i = 0; i < del.length; i++){
        del.item(i).addEventListener("click",function(){
            if(confirm("你确定要删除这份已经上传的简历么？删除后无法找回哦！")){
                $.ajax({
                    method:"post",
                    url:"php/deleteResume.php",
                    context:this,
                    data:{
                        id:$(this).parent()
                                    .find("ul.jinfo")
                                    .children().first()
                                    .text().slice(3).trim()
                    },
                    success:function(response){
                        // alert("删除请求成功,删除的简历id为\n"+response);
                        // $(this).parent().hide(1000);
                        /**JQ效果性能不高，故采用原生变换。 */
                        var overbox = this.parentNode;
                        // overbox.style.setProperty("height","0px");
                        /**
                         * 浮动布局，如果让高度也同时过渡，虽然增加和用户体验，但是在变换的时候却
                         * 会影响排版。暂时取消高度过渡，等找到好的解决办法后再解锁高度过渡。
                         */
                        overbox.style.setProperty("width","0px");
    
                        setTimeout(function(){
                            overbox.addEventListener("transitionend",function(){
                                this.style.setProperty("display","none");
                                alert("删除请求成功,删除的简历id为\n"+response);
                            });
                            
                        },400);
                    }
                });
            } else {
                alert("删除动作取消");
            }            
        });
    }
});

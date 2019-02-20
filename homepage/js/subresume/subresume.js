/**
 * 1、限制用户只能上传图片
 *      可以通过检测文件格式，不符的提示并回复默认头像。
 * 2、判断文件是否村阿紫
 * 3、兼容性判断
 */

;

// function setTitleForJid(){ // 检查jid的title的设置情况
//     Number($("#jid").text()) 
//     ? 
// }


var isSure = { _val:[] },
    _val_ = [];

Object.defineProperties(isSure,{
    val:{
        set(newValue){
            this._val = newValue;
            if(newValue.indexOf(false) == -1){
                $("#submit-to-homepage").removeAttr("disabled");
            } else {
                return;
            }
        }
    }
});


$(function(){ // 初始化向_val_塞入相应模块个_true。
    var len = $(".subtn-container").length;
    for(var i = 0; i < len; i++){
        _val_.push(true);
    }
});



$(function(){ // 基本信息部分，点击选择照片过后的预览功能。
    var container = document.querySelectorAll(".picture");
    for(let i = 0; i < container.length; i++){
        var btn = container[i].querySelector("a.file");
        btn.querySelector("input[type='file']").addEventListener("change",function(){
        var getType = this.files[0].type.split("/")[0];
        // console.log(getType + "||" + this.files[0].name + "||" +this.files[0].size);
        if(getType != "image"){
            alert("你得选一个图片文件！");
        } else {
            if(typeof FileReader === "undefined"){
                alert("您的浏览器不支持图片上传，请升级你的浏览器！");
                return false;
            } 
            var fileReader = new FileReader();
            fileReader.readAsDataURL(this.files[0]);
            fileReader.onload = function(){
                // console.log(fileReader.result);
                container[i].querySelector("img.overlook").src  = fileReader.result;
            } 
        } 
    });
    }
        
});

$(function(){ // 全部模块提交按钮部分，自动将标题与对应模块的内容提交至后台。
    var subtn = document.getElementsByClassName("subtn");
        for(let i = 0; i < subtn.length; i++){
            subtn[i].onclick = function(e){
                e.preventDefault();
                var title = document.getElementById("title").value;
                    jtype = document.getElementById("jtype").innerHTML;
                    ctime = document.getElementById("ctime").innerHTML;
                    jid = document.getElementById("jid").innerHTML;

                var form = this.parentNode;

                if(title == ""){
                    alert("至少得填写标题才能上传吧。。");
                    return false;
                }

                if(typeof FormData === "undefined"){
                    alert("您的浏览器版本过低，请使用版本较高的浏览器");            
                } else {
                    while(form.nodeName.toLowerCase() != "form"){
                        form = form.parentNode;
                    }
                    var formData = new FormData(form);
                    formData.append("title",title); // 简历标题
                    formData.append("jtype",jtype); // 简历类型
                    formData.append("ctime",ctime); // 撤销时间

                    // console.log(Number(jid));

                    Number(jid) || jid == 0 // 简历id，如果现在id能够转换为数字，那么直接传现有id，如果不能，则请求后端分配id。
                    ?  formData.append("jid",jid) : formData.append("jid","makeId"); // 后端接受到数字形式的id则利用id整理数据，如果收到的为"makeId",则另起元组。
                    

                    console.log(formData.get("title"));
                    console.log(formData.get("jtype"));
                    console.log(formData.get("ctime"));
                    console.log(formData.get("jid"));

                    $.ajax({
                        url:"php/subresume.php",
                        data:formData,
                        type:"post",
                        contentType:false,
                        processData:false,
                        success:function(response){

                            /* 接受返回的6位的id，id是字符串形式，且可以为6个0，
                            如果后端判断失败，则返回字符串“保存失败”或者其他不能
                            转换成数字的字符串。
                            * 无论是否是新建的简历草稿，都要返回这个简历的id。
                            */
                           function showSubMitStateTip(isSuccess){
                                // isSuccess接受一个boolean，上传成功传入true，否则是false;
                                // 这里的i来自最上方subtn[i]，往上找。
                                var tip_content = arguments[0] ? "保存成功！" : "保存失败,出现未知错误。。。";
                                $(".subtn-container").eq(i).children(".submit-state-tip").text(tip_content);
                                $(".subtn-container").eq(i).children(".submit-state-tip").css({
                                    display:"block",
                                    animation:"myfirst 1s",
                                })
                                .end().children(".submit-state-tip").on("animationend",function(){
                                    // console.log("CSS3动画表演完毕");
                                    $(this).css({
                                        display:"none",
                                        animation:"none"
                                    })
                                });
                           }
                           
                           function suc(){ // 保存成功处理
                               var jid = document.getElementById("jid");
                                // alert("保存成功！");
                                showSubMitStateTip(true);
                                console.log("新id为:" + response); // response就是一个返回的简历id。
                                jid.innerHTML = response;
                           }
                           function fal(){ // 保存失败处理55
                                // alert("保存失败！");
                                showSubMitStateTip(false);
                                console.log("保存失败，使用原id，请检查相应服务端页面返回格式");
                           }

                            Boolean(Number(response)) || response == 0 
                            ? suc() : fal();

                        },
                        error:function(err){
                            alert("请求出现错误，错误代码为:/n" +err);
                        }
                    });
                }
            }
        }
});

$(function(){ // 点击类似工作经验“是”与“否”，弹出项目经验模块

    function getOffsetTop(element){
        var parent = element.offsetParent;
            sumTop = element.offsetTop;
        while(parent != null){
            sumTop += parent.offsetTop; 
            parent = parent.offsetParent;
        }
        return sumTop;
    }

    var exp_radio = document.querySelectorAll("[name='exp']"),
        exp = { _value : ""};
        cTop = getOffsetTop(document.getElementById("c"));
        b_height = document.getElementById("b").offsetHeight;
        mar = document.defaultView.getComputedStyle(document.getElementById("b"),null).marginTop;


    Object.defineProperties(exp,{
        value:{
            configurable: true,
            set(newValue){
                this._value = newValue;
                newValue == "yes"
                ? $("#c").animate({
                    marginTop:b_height + mar + "px",
                },"fast","swing",()=>{
                    $("#c").css("marginTop",mar + "px");
                    $("#b").fadeIn("fast");
                })
                : $("#b").fadeOut("fast");
            },
            get(){
                return this._value;
            }
        }
    });
    for(var i = 0; i < exp_radio.length; i++){
        exp_radio.item(i).onclick = function(){
            exp.value = this.value;
        }
    }
    
});

$(function(){ // 二级连选简历类型  该功能缺点： 如果文档中存在两个连选按钮，会出现些许问题（比如所有按钮上的文字都会得到修改）。 之后有精力应该进行改进。并且和$("#jtype")有关联，可复用性差。

    function showLevel2(element){
        // 不仅仅是显示了level-2，还给予点击事件，另nav上的类型得到变化。
        // 参数element是一级标题。
        var ul_2 =  element.querySelectorAll("ul.level-2");
        for(let i = 0; i < ul_2.length; i++){
            ul_2[i].style.setProperty("display","block","");

            $(ul_2).eq(i).children("li").find("a").click(function(){
                $("#jtype").text($(this).text());
                $(".type-btn").html($(this).text() + '<span class="caret"></span>');
            });

            siblings(element).map(function(current,index,arr){
                if(current.contains(current.querySelector("ul.level-2"))){
                    current.querySelector("ul.level-2").style.setProperty("display","none","");
                }
                else{
                    return;
                }
            });
        }
        
    }   

    var ul_1 = document.querySelector("ul.level-1");
        li_1 = document.querySelectorAll("ul.level-1 > li"); // 获取的是level1 ul列表中的li

    for(let i = 0; i < li_1.length; i++){
        li_1.item(i).onmouseenter = function(e){
            e.preventDefault;
            this.lastElementChild // 判断是否是分割线，分割线是没有任何子元素的。
             ?  this.lastElementChild.classList.contains("level-2")  // 如果不是分割线，就看看最后一个元素节点包不包含level-2，包含的话就会说明存在二级列表。
                ? showLevel2(this) // 存在二级列表就显示他的二级列表，并且隐藏兄弟的二级列表，并为他的二级列表下的子元素添加相应的的点击事件。
                : $("ul.level-2").hide() // 如果不存在二级标题，就隐藏一切二级标题。
            : false; 
        }

        // 这里可能写的不好
        var pp = li_1.item(i).firstElementChild || "not exist";

        if(pp != "not exist" && pp.firstChild.nodeValue.trim() == "其他"){ // 点击1级中的其他
            $(li_1[i]).click(function(){
                console.log("执行onclick");
                console.log($(this).children(":first-child").text());
                var x = $(this).children(":first-child").text(); // 获取到其他中的文本“其他”
                $(".type-btn").html(x + '<span class="caret"></span>'); 
                $("#jtype").text(x);
            });
        }
        // console.log(li_1.item(i).firstElementChild);
    }    
});

$(function(){ // 实现上下简历标题数据双向绑定


    document.getElementById("title3").onchange = function(){
        var below = this.value;
        document.getElementById("title").value = below;
    }


    document.getElementById("title2").onchange = function(){
        var below = this.value;
        document.getElementById("title").value = below;
    }

    document.getElementById("title").onchange = function(){
        var up = this.value;
        document.getElementById("title2").value = up;
        document.getElementById("title3").value = up;        
    }

});

$(function(){ // 整理撤回时间格式

    var ctime = document.querySelectorAll("select[id^=ctime]");
    for(let i = 0; i < ctime.length; i++){
        var x = ctime[i].value;
        var d = new Date(new Date().valueOf() + x * 86400000); 
        var year = d.getFullYear();
            month = d.getMonth() + 1; // 时分秒月是从0开始的
            day = d.getDate(); // 日是从1开始的 gatDay是获取星期，是从0开始的。
    
        document.getElementById("ctime").innerHTML = year + "/" + month + "/" + day;
        // console.log($("#ctime").html());
    
        ctime[i].onchange = function(){
            // console.log("触发");
            x = this.value;
            d.setTime(new Date().valueOf() + x * 86400000);
            var year = d.getFullYear();
                month = d.getMonth() + 1; // 覆盖之前的各种日期
                day = d.getDate(); 
            document.getElementById("ctime").innerHTML = year + "/" + month + "/" + day;
        }
    
        d.setTime(d.valueOf() + 14 * 86400000);
    }
    
   
    (function(){ // 自动设置 上传时间（今天）
        var dd = new Date(); // 总是今天
        document.getElementById("stime").innerHTML = dd.getFullYear() + "/" + (dd.getMonth() + 1) + "/" + dd.getDate();
    })();
    
    
});

$(function(){
    var subToG = document.querySelectorAll("[data-name = 'submit-to-homepage']"),
        subtn = document.getElementsByClassName("subtn");

    var subToGArr = new Array(), // 容纳的是DOM对象，并非jQ对象
        subBtnArr = new Array(); // 容纳的是DOM对象，并非jQ对象

    for(let i = 0; i < subToG.length; i++){
        subToGArr.push(subToG[i]);
    }
    for(let i = 0; i < $(subtn).filter(":visible").length; i++){
        subBtnArr.push(($(subtn).filter(":visible").eq(i))[0]); 
    }

    subToGArr.forEach(function(current,index,arr){
        current.onclick = function(e){
            e.preventDefault();
            if(document.getElementById("title").value != ""){
                subBtnArr.forEach(function(modleBtn,index,btnList){
                    // 设置不同时长延迟，以保证事件队列中函数的回调间隔，时间间隔初步定为200ms，如果出现网络延迟足够高也许会暴露bug。bug发生率较低。
                    // ！！！一旦发生bug，优先考虑回调时间的调整，事件间隔应该确保每个模块的ajax都能回调结束。（否则难以保证初次填写简历且未经保存直接上传公屏时，会错误保存出多份内容散乱的简历草稿。）
                    // 暂时未作出正在响应时的提示样式，演示时需要注意当最后一个模块弹出提示信息后方继续操作。
                    /**
                     * 改进方案： 使用方式回调控制法来监听各个模块的Ajax的回调结束，
                     *           以此更稳妥精确的保证每个模块Ajax提交只有当上一个模块的Ajax回调完成后执行。
                     * 
                     *           方式回调法理论上可以完全修复现存bug，并作出更完备的提示操作。
                     */
                    var a = setTimeout(function(){
                        modleBtn.click();
                    },200 * index); 
                });
            } else{
                alert("至少得填写标题才能上传！");
                return;
            }
            
        }
    })

});

$(function(){
    var angle_input_arr = new Array();
    var angle_input = document.querySelector(".angle-select").children;            

    function loadingSelectBar(response){
            
        function updateCatecory(){
            angle.length = 0;
            angle_input_arr.map(function(currentVal,index,arr){
                if(currentVal.checked){
                    angle.push(currentVal.value);
                    console.log(angle);   
                }
            });
        }

        var angle = new Array();
        var select_bar_a = document.querySelector(".large-category"),
            select_bar_b = document.querySelector(".small-category");
        var al,bl;


        for(var i = 0; i < angle_input.length; i++){
            angle_input_arr.push(angle_input[i]);
        }

        updateCatecory();
        
        
        
        for(let key in response){
            var l = document.createElement("li");
            l.appendChild(document.createTextNode(key));

            l.onclick = function(){
                window.location.href = "http://localhost/campus_resources/gongping/gongping.html?key="+key; 
            };

            select_bar_a.insertBefore(l,select_bar_a.lastElementChild);

            for(let k in response[key]){
                if(angle.indexOf(response[key][k].angle) != -1){
                    l = document.createElement("li");
                    l.type = key;

                    l.addEventListener("click",function(){
                        window.location.href = "http://localhost/campus_resources/gongping/gongping.html?key="+key+"&k="+response[key][k].name;
                    });

                    l.appendChild(document.createTextNode(response[key][k].name));
                    select_bar_b.appendChild(l);
                }
            }
        }

        al = select_bar_a.getElementsByTagName("li").length;
        bl = select_bar_b.getElementsByTagName("li").length;

        var select_bar_b_display = select_bar_b.parentNode.style.display;
        select_bar_b.parentNode.style.setProperty('display','none','important');
        var select_bar_a_lis = select_bar_a.getElementsByTagName("li");
        var select_bar_b_lis = select_bar_b.getElementsByTagName("li");

        for(let o=1; o<al-1; o++){ // 第一个和最后一个分别对应“全部”和“类别外”,无小类别，顾遍历去除头尾。
            select_bar_a_lis.item(o).onmouseenter = function(){
                $(select_bar_b_lis).show();
                var con = this.innerHTML;
                for(var j=0; j<bl; j++){
                    if(select_bar_b_lis[j].type != con){
                        select_bar_b_lis[j].style.display = "none";
                    }
                }

                $(select_bar_b).parent().show();
            };

            document.onclick = function(e){
                var a = select_bar_b.parentNode.contains(e.target);
                if(!a){
                    select_bar_b.parentNode.style.setProperty('display','none');
                }
            }
            $("#all,#leibiewai").hover(function(){
                select_bar_b.parentNode.style.setProperty('display' ,'none','important');
            });
        }
    }

    myAjax({ // 开始请求获取类别，添加到select-bar
        type:"get",
        url:"php/backCatecory.php",
        success:loadingSelectBar
    });

    function re(){
        console.log("已经执行");
        var select_bar_b = document.querySelector(".small-category");
        while(select_bar_b.hasChildNodes()){
            select_bar_b.removeChild(select_bar_b.firstChild);
        }
        myAjax({ // 开始请求获取类别，添加到select-bar
            type:"get",
            url:"php/backCatecory.php",
            success:loadingSelectBar
        });
    }

    function pe(){
        console.log("以覆盖");
    }
    

    console.log(angle_input_arr.length);
    
    angle_input_arr.map(function(currentVal,index,arr){
        console.log(currentVal);
        currentVal.addEventListener("mouseenter",pe);
    });


});
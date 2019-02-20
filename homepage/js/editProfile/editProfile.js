;$(function(){
    console.warn("上面↑这个错误不用管,是因为有两个id重复了,有时间再找。"); 
    //.修改密码模块，确认两次密码是否相同
    // console.log(document.getElementById("oldpassword"));
    function confirmPassword(){ // 验证两次输入的密码是否相等函数
        var newPass = document.getElementById("newpassword").value;
            confirmPass = document.getElementById("confirmpassword").value;
        
        newPass == confirmPass
        ? document.getElementById("confirmpassword").parentNode.nextElementSibling.innerHTML = "成功"
        : document.getElementById("confirmpassword").parentNode.nextElementSibling.innerHTML = "两次输入密码不相同";

        if(newPass == confirmPass){
            document.getElementById("confirmpassword").parentNode.nextElementSibling.innerHTML = "成功";
            inputT(1);        
        } else {
            document.getElementById("confirmpassword").parentNode.nextElementSibling.innerHTML = "两次输入密码不相同";
            inputF(1);        
        }
    }
    function inputT(index){ // 验证正确对bols造成的改变
        bols[index] = true;
        isComplate.bols = bols;
        console.log(isComplate._bols);
        return false;
    }

    function inputF(index){ // 验证错误对bols造成的改变
        bols[index] = false;        
        isComplate.bols = bols;
        console.log(isComplate._bols);
        return false;
    }
    var isComplate  = { // 只有当isComplate._bols的长度为2且不存在false时解锁按钮。 改进后应该为长度为2且只存在true才行。
        _bols : [],
    };

    var bols = [false,false]; // 第一个是当前密码验证是否正确，第二个两次密码是否相等，只有两个都是true才能解锁button按钮。
    
    Object.defineProperties(isComplate,{ // 定义isComplate访问器属性bols
        bols:{
            set(newValue){
                if(newValue instanceof Array){
                    this._bols = newValue;
                    this._bols.length == 2 
                    ? this._bols.indexOf(false) == -1
                        ? document.getElementById("changepasswordBtn").removeAttribute("disabled")
                        : document.getElementById("changepasswordBtn").setAttribute("disabled","disabled")
                    : false;
                } else {
                    console.warn("给isComplate访问其属性bols设置的值似乎不是一个数组，请检查全局变量bols。");
                }
            },
            get(){
                return this._bols;
            }
        }
    });


    // 进行老密码验证，成功改变bols[0]为true，否则为false。

    document.getElementById("oldpassword").onchange = function(){
        var _this = this;
        // var val = this.value || 
        if(this.value == ""){
            this.parentNode.nextElementSibling.innerHTML = ""
            return;
        }
        this.parentNode.nextElementSibling.innerHTML = "验证中......";
        $.ajax({
            url:"php/changePassword.php",
            type:"post",
            data:{
                oldpassword:_this.value
            },
            success(response){
                // console.log(response);
                if(response == 1){
                    _this.parentNode.nextElementSibling.innerHTML = "密码正确";
                    inputT(0);
                } else {
                    _this.parentNode.nextElementSibling.innerHTML = "密码错误";
                    isComplate.push(false);
                    inputF(0);
                }
            },
            error(err){
                console.log(err);
                inputF(0);
                alert("验证密码出现网络错误！");
            }
        });
        
    };
    document.getElementById("oldpassword").oninput = function(){
        this.parentNode.nextElementSibling.innerHTML = "";
        inputF(1);        
    }


    // 进行新密码两次输入是否相同进行验证，原理同上。

    document.getElementById("newpassword").onchange = function(){
        var b =  Boolean(this.value && document.getElementById("confirmpassword").value);
        console.log(b);
        b ? confirmPassword()
            : false;
        return;
    }
    document.getElementById("newpassword").oninput = function(){
        document.getElementById("confirmpassword").parentNode.nextElementSibling.innerHTML = "";
        inputF(1)
    }
    document.getElementById("confirmpassword").oninput = function(){
        document.getElementById("confirmpassword").parentNode.nextElementSibling.innerHTML = "";
    }
    document.getElementById("confirmpassword").onchange = function(){
        var b =  this.value && document.getElementById("newpassword").value;
        console.log(b);
        b ? confirmPassword()
            : false;
        return;
    }

});


$(function(){ // 实现上传头像离线预览
    $("#select-avatar").change(function(){
         var file = $(this)[0].files[0];
             type = file.type.split("/")[0]
        //  console.log(file.type);
        if(type == "image"){ // 最好后端也做到图片验证
            var fileReader = new FileReader();
            var _this = this;
            fileReader.readAsDataURL(file);
            fileReader.onload = function(){
               $(_this).parents("form[name = 'change-avatar']")
                   .find("img.current-avatar").attr("src",fileReader.result)
               $("#avatar-tip").children("span").text("预览头像");

            }
        } else {
            alert("选择一个图片好吗？！");
        }
         
    });
}); 



// $(function(){
//     document.body.onclick = function(e){
//         console.log(e.target);
//     }
// });
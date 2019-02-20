/*
    opt.type
        url
        data 为空就不写，以免出现错误
        success
 */

function myAjax(opt){
    var xhr = new XMLHttpRequest();
    var data_array = new Array();
    var data,url,requestHeader;
    if(typeof opt.data != "undefined"){
        for(key in opt.data){
            data = key + "=" + opt.data[key];
            data_array.push(data);
        }
        data = data_array.join("&");
    } else {
        data = null;
    }
    
    if(opt.type == "get"){
        url = opt.url + "?" + data;
        data = null;
        xhr.open(opt.type,url);
    }
    else if(opt.type == "post"){
        url = opt.url;
        xhr.open(opt.type,url);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    }
    
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var type = xhr.getResponseHeader("Content-type");
            type.indexOf("json") >= 0
            ? opt.success(JSON.parse(xhr.responseText)) : 
            type.indexOf("xml") >= 0
            ? opt.success(xhr.responseXML) :
            opt.success(xhr.responseText);   
        }
    }
    xhr.send(data);
};
/**
 * 封装找出作为参数节点的所有元素兄弟节点
 * @param {*siblings} ele 一个DOM节点  
 */

function siblings(ele){
    var p = [];
    var parent = ele.parentNode;
    var childrenL = ele.parentNode.childNodes.length;
    for(let i = 0; i < childrenL; i++){
        if(parent.childNodes[i].nodeType == "1" && parent.childNodes[i] != ele){
            p.push(parent.childNodes[i]);
        }
    }
    return p;
}
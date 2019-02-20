# 主页结构说明
    主页的所有子页都在homepage文件夹中
        我的简历  -- homepage.html
                 -- css/homepage.css 
                 -- js/myResume.js

        消息中心  -- ？？

        修改资料 -- editProfile.html
                 -- css/editProfile.css
                  -- js/editProfile.css
        
# 前后端交互说明
    ## 我的简历
    
    在homepage中，点击删除按钮（简历缩略图右上角的小xx），会向服务端传入需要删除的简历的id,key为id，需要返回删除的id即可，输出以字符串形式，实例在php/deleteResume.php。（暂时不做删除成功与否的检验）。

    ## 消息中心
    
    看工时来不来的及，来不及不写。
    
    ## 修改资料

    在editProfile中。




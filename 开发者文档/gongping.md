# 页面加载期间
    ## 一、 页面加载期间select-bar（筛选类别条）会向服务端发送Ajax请求大类别有什么，小类别有什么。
    
        ### 请求成功

        请求成功后，应该返回一个json,以大类别作为key，每个大类别下的小类别组成一个字符串数组，作为value。
        JSON形式如下：
            {
                "大类别1":["1小类别1","1小类别2","1小类别3","1小类别4"],"大类别2":["2小类别1","2小类别2","2小类别3","2小类别4"],
                ......
            }

        ### 请求失败

        请求失败，返回代码-1（Number类型）。
        
    
    
<?php
    /**
     * 打开前两个注释掉的echo即可在控制台network中看到php接到的值。
     * 判断接受值成功后，进行数据库操作，保存成功，返回1或者字符串1，保存失败，返回0或者其他”,
     */
    header("Content-Type:text/html;charset=utf-8");
    // echo var_dump($_FILES);
    // echo var_dump($_POST);
    echo "000000"; // 一定是字符串格式的，如果是数字 045000、000000会变成45和0
?>
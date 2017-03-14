---
title: 解决fedora下webstorm中文字符不显示的问题
tags: [linux, IDE, webstorm, 输入法]
date: 2015-04-19 14:21
---
最近新换了系统(fedra 21)，顺便把webstorm 9换成了10.发现对中文的支持出了问题：
打开文件时目录中的一些汉字会变成‘口’，编辑器中的一些中文字符直接不显示。

通过查阅一些资料发现是字体的原因，解决办法就是安装【文泉驿等宽正黑】字体：

``` bash
sudo yum install -y wqy-zenhei-fonts  
```
<!--more-->
参考：

[http://bigc.at/intellij-idea-font-famliy.orz](http://bigc.at/intellij-idea-font-famliy.orz)
[http://zh.wikipedia.org/wiki/%E7%AD%89%E5%AE%BD%E5%AD%97%E4%BD%93](http://zh.wikipedia.org/wiki/%E7%AD%89%E5%AE%BD%E5%AD%97%E4%BD%93)

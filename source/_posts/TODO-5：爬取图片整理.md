---
title: TODO-5：爬取图片整理
date: 2017-01-06 16：51
---

[TODO-4：nodejs 实现一部漫画爬取](http://benbenye.github.io/2017/01/03/TODO-4%EF%BC%9Anodejs%20%E5%AE%9E%E7%8E%B0%E4%B8%80%E9%83%A8%E6%BC%AB%E7%94%BB%E7%88%AC%E5%8F%96/)
这篇文章写完之后，被[猪头]看到，居然劈头盖脸一顿说：

> 为什么这么烂的代码也敢粘出来？
> 为什么主要逻辑已经实现了，还不把东西抽离出来，做一个成品出来？
> 为什么不工具化？
> ……

哪那么多为什么！
 >人家只是想说一下写爬虫的时候需要的几个基本工具的用法不行吗？
 >我代码这么烂，你就不会跟我说，帮我优化一下吗？
 >我辛辛苦苦码出来的东西，不知道安慰，就知道说不是！

所以今天为了家庭和睦，于是出了抓取漫画工具1.0  ；）

[github 地址](https://github.com/benbenye/crawler)

V1.0比较粗糙，主要支持：
1：默认爬取整部漫画（目前只支持《镇魂街》）
2：查询上次爬取进度
3：查询漫画更新进度

#####默认爬取整部漫画（目前只支持《镇魂街》）
参数：`anything`
log文件名：`name.json`
```bash
bash-3.2$ node --harmony app anything 镇魂街.json
------------总共 180 章节--------------
打log 记录章节列表已成功抓取
write  镇魂街.json ok
打log 记录章节对应的图片链接已成功抓取
write  镇魂街.json ok
打log 记录章节对应的图片已成功抓取
write  镇魂街.json ok
write img: imgfile2/174 一百六十五 天佑/1.jpg
waiting
打log 记录章节对应的图片已成功抓取
write  镇魂街.json ok
write img: imgfile2/174 一百六十五 天佑/2.jpg
waiting
打log 记录章节对应的图片已成功抓取
write  镇魂街.json ok
write img: imgfile2/174 一百六十五 天佑/3.jpg
waiting
打log 记录章节对应的图片已成功抓取
write  镇魂街.json ok
write img: imgfile2/174 一百六十五 天佑/4.jpg
waiting
```
为了不让被爬网站‘起疑’，除了做了一些request header的处理之外，在抓取频率上做了一点手脚，   
做了一个随机秒数的延时，主要为了更近似的模拟人的行为
``` javascript
return new Promise((res, rej) => {
  setTimeout(res, 2000 + Math.random())
});
```

#####查询上次爬取进度
参数：`getLastStatus|gls`
log文件名：`镇魂街.json`
```bash
bash-3.2$ node --harmony app gls 镇魂街.json
[ 0, 4 ]
```

#####查询漫画更新进度
参数： `checkUpdate` 
log文件名：`镇魂街.json`

``` bash
bash-3.2$ node --harmony app checkUpdate 镇魂街.json
上次抓取位置: [ 0, 5 ] 
本地进度: 173 一百六十四 铁牢 
抓取进度: 174 一百六十五 天佑
```


以上是我目前粗略地实现的三个小功能，不过目前因为解析html的代码不好通过参数赋值，还没想到能够定制爬虫的好办法
---
title: TODO-4：nodejs 实现一部漫画爬取
date: 2017-01-03 15:23
---
很早之前一直很喜欢听一些有声评书，当时为了找这些音频也是煞费苦心。但是找的过程中也发现，我每次下载音频的时候都是在重复同样的操作，所以也想过是不是可以用程序实现。那时候并没有很强的意念去实现是这个工具，所以只是停留在了想的层面。

前不久无意发现一部感觉不错的动漫《镇魂街》，看了动画片之后觉得不过瘾，又发现官方的漫画版还挺有看头的，于是又从头开始后撸漫画，但是发现一页一页的翻翻找找好累，所以又想着把这些图片一次性down下来该多爽。
正巧手头有个ng2的项目，于是借助这个框架开始尝试爬取这部漫画，没有广告，没有连接，简单粗暴直接看图。

抓取网页的几个必要工具先罗列一下： 
1. superagent github 地址 代替客户端发起请求； 
2. cheerio github地址 解析html 
3. fs node 的文件系统模块


<!--more-->

首先找个稳定点的网站用来抓取，不然刚研究好怎么解析这个网站下的页面，结果页面不稳定，白费力气。 
解析的思路一定是顺序的，首先要把一部漫画的章节找出来，然后根据每个章节下载里面的图片。

下面说说我在抓取的过程遇到的几个小问题： 
1：编码问题； 
默认情况下superagent是utf-8的编码，但是如果遇到网站的编码不是utf-8就会出现抓取下来的页面都是乱码，自然就不好解析了。 
所以出现这种情况的时候，可以在发起请求的时候添加编码设置，这就涉及到了第四个必要工具：superagent-charset，github地址，防止乱码用的。 
2：请求头的问题； 
一般这种网站都会有防盗链的措施，所以如果随意请求，很快就会被反套路，所以最安全的方案就是用浏览器打开需要抓取的页面，找到相应的网络请求头，全copy下来，不过要特别注意一下有的Referer这个字段是固定的连接，但是有的是根据章节，每个章节不同。 
3：请求‘顺序’还是‘并发’ 
最初使用并发的形式抓取，但是会出现抓取的图片不全的现象。这种情况还不是很清楚什么原因导致的。不过转为顺序并且把每次请求都间隔了一定时间，尽量的模仿实际人工请求，没有出现抓取不全的现象。

下面是主要代码逻辑：

用来统一设置请求头的方法：

```javascript
function makeReuest(option){
    return  request.get(option.url).charset('gbk')
    .set('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
      // .set('Accept-Encoding','gzip, deflate, sdch')
      .set('Accept-Language','zh-CN,zh;q=0.8,en;q=0.6')
      .set('Cache-Control','no-cache')
      .set('Connection','keep-alive')
      .set('Cookie',option.cookie)
      .set('Host',option.host)
      .set('Pragma','no-cache')
      .set('Referer',option.referer)
      // .set('Upgrade-Insecure-Requests','1')
      .set('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36')
      .catch(option.cb);
  }
  ```
所有callback转为promise形式
```javascript
module.exports = function (func, option = {}) {
  return (...arg) => new Promise((resolve, reject) => {
    return func.apply(option.context, [...arg, (err, ...data) => {
      if (err) {
        return reject(err);
      }
      if (option.multiArg) {
        return resolve(data)
      }
      return resolve(data[0]);
    }]);
  })
}
```

写文件逻辑：

```javascript
const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);

writeFileAsync(imgPath, _picRes.body)
        .then(function () {
          console.log('write OK:', imgPath)
        })
        .catch(function () {
          console.log('write err:', imgPath)
          mkdirAsync(path)
            .then(function () {
              return writeFileAsync(imgPath, _picRes.body)
            })
            .then(function () {
               console.log('write file retry finished:', imgPath)
            })
            .catch(function (err) {
              console.log('retry err', err)
              throw  err;
            });
        });
```
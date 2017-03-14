---
title: fedora下yum重新安装npm失败及解决
tags: [linux, yum, npm]
date: 2015-04-28 18:05
---

把npm卸载了，重新安装的时候报错：

``` bash
Error unpacking rpm package npm-1.3.6-6.fc21.noarch
error: unpacking of archive failed on file /usr/lib/node_modules/npm/doc: cpio: rename
..................................
失败:
  npm.noarch 0:1.3.6-6.fc21  
``` 
<!--more-->
运行npm命令报错：

``` bash

module.js:340
    throw err;
          ^
Error: Cannot find module '../lib/npm.js'
    at Function.Module._resolveFilename (module.js:338:15)
    at Function.Module._load (module.js:280:25)
    at Module.require (module.js:364:17)
    at require (module.js:380:17)
    at /usr/lib/node_modules/npm/bin/npm-cli.js:24:11
    at Object.<anonymous> (/usr/lib/node_modules/npm/bin/npm-cli.js:86:3)
    at Module._compile (module.js:456:26)
    at Object.Module._extensions..js (module.js:474:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
```


根据错误提示查看/usr/lib/node_modules/npm/目录：
[错误提示图片](http://img.blog.csdn.net/20150428175940026?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvd216eTEwNjcxMTExMTA=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)
发现用yum卸载的时候并没有删除这个目录，手动删除：

```bash
sudo rm -r -f /usr/lib/node_modules/npm/
```

再安装npm就没问题了。


造成yum卸载不完全的原因应该是之前使用

```bash
sudo npm update -g npm
```

命令升级npm造成了冲突。
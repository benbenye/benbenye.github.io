---
title: fedora wifi频繁断开
tags: [linux, problem]
date: 2015-04-20 17:25
---

在家时没有问题，到公司时 wifi 总是掉线，显示一个问号，需要手动断开重联。

这可能与公司网络太差有关，在网上查了下资料，发现修改下网络参数可以改善这种情况：

```bash
sudo vi /etc/ppp/pppoe-server-options
```
<!--more-->
将lcp-echo-interval 参数改大一些，如：

``` bash
lcp-echo-interval 100
```

需要重启网络服务。


参考：

[http://louisnetwork.blog.sohu.com/164172203.html](http://louisnetwork.blog.sohu.com/164172203.html)
[http://bbs.chinaunix.net/thread-1553531-1-1.html](http://bbs.chinaunix.net/thread-1553531-1-1.html)
[http://hefeng1987-net-163-com.iteye.com/blog/967956](http://hefeng1987-net-163-com.iteye.com/blog/967956)
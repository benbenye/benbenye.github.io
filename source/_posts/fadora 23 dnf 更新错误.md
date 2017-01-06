---
title: fadora 23 dnf 更新错误
date: 2016-07-22 08:29
---

问题： 
执行`sudo dnf update`报错：

``` bash
上次元数据过期检查：0:27:28 前，执行于 Fri Jul 22 07:42:36 2016。 
依赖关系解决。 
错误：该操作将导致移除已启动的内核：kernel-core-4.5.7-202.fc23.x86_64 。
```
<!--more-->
解决方法：

`sudo dnf remove python3-dnf-plugins-core -y`

参考： [https://bugzilla.redhat.com/show_bug.cgi?id=1348766](https://bugzilla.redhat.com/show_bug.cgi?id=1348766)
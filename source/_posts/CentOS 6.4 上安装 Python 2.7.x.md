---
title: CentOS 6.4 上安装 Python 2.7.x
date: 2015-11-30 12:37
tags: [linux, python]
---

0. 去官网下载解压相应版本的源码包，我用的这个：[https://www.python.org/ftp/python/2.7.10/Python-2.7.10.tgz](https://www.python.org/ftp/python/2.7.10/Python-2.7.10.tgz)
0. 安装编译需要的工具：
``` bash
sudo yum groupinstall -y development
```
<!--more-->
0. 编译安装：
``` bash
./configure
make
sudo make altinstall
```

使用 `altinstall` 而不是 `install` 可以防止覆盖系统自带的 `python` 

参考：[https://www.digitalocean.com/community/tutorials/how-to-set-up-python-2-7-6-and-3-3-3-on-centos-6-4](https://www.digitalocean.com/community/tutorials/how-to-set-up-python-2-7-6-and-3-3-3-on-centos-6-4)
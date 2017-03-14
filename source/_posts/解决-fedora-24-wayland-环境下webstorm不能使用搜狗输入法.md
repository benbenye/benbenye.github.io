---
title: 解决 fedora 24 wayland 环境下webstorm不能使用搜狗输入法
tags: [linux, problem]
date: 2017-03-13 19:28:00
author: wmzy
---


更新完系统发现可以使用 Wayland 系统, 于是尝了一下鲜。平时使用的应用基本没有什么兼容问题，唯一的问题是webstorm里无法输入中文了。

在网上找到的说法是 wayland 没有导入相关的环境变量，导致 Java 的 UI 应用无法正常使用 fcitx。
临时的解决办法是在 webstorm 的启动脚本里手动导入相应的环境变量：
```bash
# /usr/local/WebStorm-162.1121.31/bin/webstorm.sh 
export XMODIFIERS=@im=fcitx

```

参考：
[https://fcitx-im.org/wiki/Configure_(Other)](https://fcitx-im.org/wiki/Configure_(Other))
[https://github.com/fcitx/fcitx/issues/230](https://github.com/fcitx/fcitx/issues/230)
[https://wiki.archlinux.org/index.php/Environment_variables](https://wiki.archlinux.org/index.php/Environment_variables)
[https://fedoraproject.org/wiki/%E4%B8%BB%E8%A6%81%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6](https://fedoraproject.org/wiki/%E4%B8%BB%E8%A6%81%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
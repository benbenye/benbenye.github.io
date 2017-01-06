---
title: fedora 21 安装搜狗输入法
date: 2015-06-24 11:07
---
1.添加fedora中文社区软件源

``` bash
sudo wget http://repo.fdzh.org/FZUG/FZUG.repo -P /etc/yum.repos.d/  
```

2.安装搜狗输入法
``` bash
sudo yum install -y sogoupinyin  
```
<!--more-->
3.卸载ibus (可选）
[html] view plain copy
sudo yum autoremove ibus -y  

4.关闭 gnome-shell 对键盘的监听
``` bash
gsettings set org.gnome.settings-daemon.plugins.keyboard active false  
```

5.切换输入法为 fcitx
``` bash
imsettings-switch fcitx  
```

6.配置 xinputrc 链接到 fcitx.con
``` bash
sudo alternatives --config xinputrc  
```

7.设置搜狗输入法开机启动

创建文本文件 【～/.config/autostart/fcitx-ui-sogou-qimpanel.desktop】

输入以下内容并保存：

``` bash
[Desktop Entry]  
Name=Sogou Pinyin  
Name[zh_CN]=搜狗拼音  
GenericName=Sogou Pinyin Input Method  
GenericName[zh_CN]=搜狗拼音输入法  
Comment=a popular pinyin input method  
Comment[zh_CN]=20 年稳定专业的输入法  
MimeType=application/x-sogouskin;application/x-scel;  
Keywords=ime;imf;input;  
Exec=sogou-qimpanel %U  
Icon=fcitx-sogoupinyin  
Terminal=false  
Type=Application  
Categories=System;Utility;  
StartupNotify=false  
X-GNOME-Autostart-Phase=Applications  
X-GNOME-Autostart-Notify=false  
X-GNOME-Autostart-Delay=2  
X-GNOME-AutoRestart=true  
X-KDE-autostart-phase=1  
X-KDE-autostart-after=panel  
```

或者使用图形界面工具gnome-tweak-tool来添加开机启动项。
注：如果忽略第5、7步，系统开机时会报错：

``` bash
unable to keep input method running
Giving up to bring the process up because main input method process for FCITX rapidly died many times.See $XDG_CACHE_HOME/imsettings/log for more details.
```

8.reboot

参考：

http[://www.8dlive.com/post/199.html](://www.8dlive.com/post/199.html)
[https://www.netroby.com/view.php?id=3681](https://www.netroby.com/view.php?id=3681)
[http://repo.fdzh.org/](http://repo.fdzh.org/)
[http://www.cnblogs.com/pengdonglin137/p/3462492.html](http://www.cnblogs.com/pengdonglin137/p/3462492.html)
[https://github.com/FZUG/repo/wiki/Sogou-Pinyin-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98](https://github.com/FZUG/repo/wiki/Sogou-Pinyin-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)
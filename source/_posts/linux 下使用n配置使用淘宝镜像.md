---
title: linux 下使用n配置使用淘宝镜像
date: 2016-10-29 12:16
---

n 是 nodejs 版本管理器，鉴于国内网络环境，作如下配置用起来才会便捷.

``` bash
# ~/.bashrc 或 ~/.zshrc

# 使用淘宝 nodejs 镜像，注意末尾的'/'不能省略
export NODE_MIRROR=https://npm.taobao.org/dist/

# 建议 linux 用户配置 nodejs 安装目录，切换版本不用 root 权限
export N_PREFIX=$HOME/.n
export PATH=$HOME/.n/bin:$PATH
```

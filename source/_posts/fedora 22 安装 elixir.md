---
title: fedora 22 安装 elixir
date: 2016-03-15 19:30
---

0.  安装配置kerl
  1.1 安装kerl
  
  ```bash
  curl -O https://raw.githubusercontent.com/yrashk/kerl/master/kerl
  chmod a+x kerl
  sudo mv kerl /usr/local/bin
  
  curl -O  https://github.com/yrashk/kerl/raw/master/bash_completion/kerl
  sudo mv kerl /etc/bash_completion.d/
  ```
  1.2 安装编译依赖

  ```bash
  sudo dnf install -y gcc ncurses-devel openssl-devel
  ```
  1.3 创建 .kerl 配置文件

  ```bash
  echo 'export KERL_CONFIGURE_OPTIONS="--with-ssl=/usr --enable-smp-support --enable-threads --enable-kernel-poll --enable-sctp --without-javac"' >> .kerlrc
  ```
<!--more-->
0.  使用 kerl 安装 Erlang
  2.1 列出可选release版本
  
  ```bash
  kerl list releases
  ```
  >Getting the available releases from erlang.org...
R10B-0 R10B-10 R10B-1a R10B-2 R10B-3 R10B-4 R10B-5 R10B-6 R10B-7 R10B-8 R10B-9 R11B-0 R11B-1 R11B-2 R11B-3 R11B-4 R11B-5 R12B-0 R12B-1 R12B-2 R12B-3 R12B-4 R12B-5 R13A R13B01 R13B02-1 R13B02 R13B03 R13B04 R13B R14A R14B01 R14B02 R14B03 R14B04 R14B_erts-5.8.1.1 R14B R15B01 R15B02 R15B02_with_MSVCR100_installer_fix R15B03-1 R15B03 R15B R16A_RELEASE_CANDIDATE R16B01 R16B02 R16B03-1 R16B03 R16B 17.0-rc1 17.0-rc2 17.0 17.1 17.3 17.4 17.5 18.0 18.1 18.2.1 18.2
Run "/usr/local/bin/kerl update releases" to update this list from erlang.org

 2.2 构建 & 安装

 ```bash
 kerl build 18.2.1 vanilla_erlang
 kerl install vanilla_erlang ~/.kerl/installations/vanilla_erlang/
 ```
 2.3 激活
```bash
 # 查看安装列表
 kerl list installations
 
 # 激活
 source ~/.kerl/installations/vanilla_erlang/activate
 
 # 验证
 erl --version
 ```

0. 安装kiex
  ```bash
  curl -sSL https://raw.githubusercontent.com/taylor/kiex/master/install | bash -s

  echo 'test -s "$HOME/.kiex/scripts/kiex" && source "$HOME/.kiex/scripts/kiex"' >> ~/.bashrc

  source ~/.bashrc
  ```

0.  使用 kiex 安装 elixir
 
   ```bash
     kiex install stable
     kiex use <version>
     # 验证
     iex --version
   ```

参考： [Installing Erlang using kerl](http://verboseguides.com/2016/01/26/installing-erlang-using-kerl/)
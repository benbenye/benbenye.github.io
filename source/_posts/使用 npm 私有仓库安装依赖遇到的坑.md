---
title: 使用 npm 私有仓库安装依赖遇到的坑
date: 2016-11-17 17:14
---
最近项目部署的时候时常遇到访问 npm 官方仓库网络抽疯的现象，决定尝试一下公司内部新搭建的私有仓库（使用的 [cnpm](https://github.com/cnpm/cnpmjs.org)）。切换个仓库这么简单的事没想到遇到两个大坑，记录一下：

tarball url 指向不正确

问题：用`npm i --registry=https://rnpm.xxxxx.com xxx` 命令安装时，结果却到 r.cnpmjs.org 这个域下面下载tar包。 
原因：仓库的`registryHost`配置错误。

项目部署的时候大部分依赖包还是去官方仓库下载

问题：使用`npm i --registry=https://rnpm.xxxxx.com`命令安装依赖的时候发现`registry`参数似乎不起作用，绝大多数包居然又到官方的仓库去拉取数据（包括 metadata 和 tarball），但奇怪的是居然还有两三个包是正常的到 `rnpm.xxxxx.com` 域去下载数据了。

<!--more-->


原因：因为用 `npm shrinkwrap` 命令锁定了依赖，而 `npm-shrinkwrap.json` 里有个 `resolved`字段，这个字段指定了tarball下载的地址，npm使用这个地址下载了真正的依赖包。
解决办法：目前还没有好的解决办法，暂时先替换掉`resolved`字段里的 url，npm@5之后的版本应该会提供一个优雅的解决方案。 
s替换url的方法：

``` bash
sed -i -- 's/https:\/\/registry\.npmjs\.org/https:\/\/rnpm\.xxxxx\.com/g' npm-shrinkwrap.json
```

其他的方案还有: [shonkwrap rewrite-shrinkwrap-urls](https://www.npmjs.com/package/rewrite-shrinkwrap-urls)

参考： 
[https://github.com/npm/npm/issues/6445](https://github.com/npm/npm/issues/6445)

[https://github.com/npm/npm/issues/6324](https://github.com/npm/npm/issues/6324)

[http://blog.npmjs.org/post/145724408060/dealing-with-problematic-dependencies-in-a](http://blog.npmjs.org/post/145724408060/dealing-with-problematic-dependencies-in-a)

[https://support.sonatype.com/hc/en-us/articles/213465048-Why-does-npm-client-need-access-to-URLs-other-than-my-private-registry-](https://support.sonatype.com/hc/en-us/articles/213465048-Why-does-npm-client-need-access-to-URLs-other-than-my-private-registry-)

[http://stackoverflow.com/questions/33682804/why-does-npm-install-use-the-shrinkwraps-resolved-property](http://stackoverflow.com/questions/33682804/why-does-npm-install-use-the-shrinkwraps-resolved-property)
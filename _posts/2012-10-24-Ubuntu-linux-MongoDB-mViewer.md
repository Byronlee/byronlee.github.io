---
layout: post
title: Ubuntu linux 下MongoDB+mViewer 安装详解 ，唉，弄了好久！
header: Pages
categories: [Linux, Ubuntu, MongoDB]
tags: [jdk, linux, mongodb, mviewer, ubuntu]
---

{% include JB/setup %}

### mongo 非关系型数据库

他的伟大就不说了，它是非关系型数据库中最接近关系型数据库的。

它的图形界面管理，总体来说还是很少，其中做火的一个就是[rockmongo](http://code.google.com/p/rock-php/),但是安装的时候一直有什么包依赖问题，弄烦了，都没有安装起。觉得换一个：[futon4mongo](https://github.com/sbellity/futon4mongo)， 安装起后呢，又不能新建数据库，唉，后来遇到 mViewer，唉，挺漂亮的决定用这个，于是就用起来了，对于mongo的图形管理工具可以参考 ：   [MongoDB管理工具](http://blog.nosqlfan.com/html/213.html)， 现在我们来看 Ubuntu 下MongoDB+mViewer 安装详解

### 安装 mongodb:

1. 添加密钥，在终端运行
  * {% highlight sh %}
    sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
   {% endhighlight  %}

2. 添加源，打开/etc/apt/sources.list，添加
  * {% highlight sh %}
    deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen
    {% endhighlight  %}
   （这一步也可以 创建一个 文件  /etc/apt/sources.list.d/10gen.list 并添加：deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen，但是没有试过，但是是官方给出的）

3. 确保密钥已经加上，运行
  * {% highlight sh %}
     sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
   {% endhighlight  %}

4.   最后更新源，安装
  * {% highlight sh %}
     sudo apt-get update
     sudo apt-get install mongodb-10gen
    {% endhighlight  %}

现在mongodb 就装好了

__注意：__

* mongo的配置文件在：/etc/mongodb.conf 文件里
* mongo的数据文件在：/var/lib/mongodb
* mongo的日志文件在：/var/log/mongodb

### 装图形界面管理工具：mViewer

（java写的，所有必须装jdk：教程见我另一篇博文：[Ubuntu 12.04.1 下安装配置 JDK 7 笔者亲式]({{ site.url }}/blog/2012/10/23/ubuntu-install-jdk )）

下载mViewer 安装包：[https://github.com/Imaginea/mViewer/downloads](https://github.com/Imaginea/mViewer/downloads)  上对应的linux 版本

`官方的这个运行脚本start_mViewer.sh 和那个配置文件脚本mViewer.properties 有问题`，改造方案：

直接删除 mViewer.properties（他是设置端口号的）

把 start_mViewer.sh 里面的内容替换成：

{% highlight sh %}
#!/bin/bash
echo Using Http Port : 8080
java -jar ./winstone-0.9.10.jar --httpPort=8080 --warfile=./mViewer.war
{% endhighlight  %}

保存然后：

{% highlight sh %}
$ ./start_mViewer.sh
{% endhighlight  %}

就可以访问： [http://127.0.0.1:8080/index.html](http://127.0.0.1:8080/index.html)

一般默认情况下直接点Go 就可以了。

### mongo基本使用及配置

一般默认情况下直接点Go 就可以了。但是有的不行，需要配置，在这之前首先要保证你的mongo 已经正常启动：

* 启动： `sudo service mongodb start`
* 关闭： `sudo service mongodb stop`
* 重启： `sudo service mongodb restart`
* 使用mongo终端： `mongo`

通常我们使用 service mongodb start 会报错：

{% highlight sh %}
byronlee@byronlee:~$ service mongodb start
start: Rejected send message, 1 matched rules; type="method_call", sender=":1.58" (uid=1000 pid=5302 comm="start mongodb ") interface="com.ubuntu.Upstart0_6.Job" member="Start" error name="(unset)" requested_reply="0" destination="com.ubuntu.Upstart" (uid=0 pid=1 comm="/sbin/init")
{% endhighlight  %}

__【解决办法】__

需要root权限才可以正常运行： `$ sudo service mongodb start`   就得以下结果：

{% highlight sh %}
byronlee@byronlee:~$ sudo service mongodb start
mongodb start/running, process 5498
{% endhighlight  %}

如果不能正常运行报错中有这么一句：

{% highlight sh %}
exception in initAndListen: 10296 dbpath (/data/db) does not exist, terminating
{% endhighlight  %}

则选择下面的方式之一启动：（我使用第一种 OK，其他没有试过但是是官方给出的）

* `mongod --config /etc/mongodb.conf`  （指定配置文件途径）
* `mongod -f /etc/mongodb.conf`
* `mongos --config /srv/mongodb/mongos.conf`
* `mongos -f /srv/mongodb/mongos.conf`

好像有的时候我们登录mongo 的时候 还是提示 mongo 没有启动， 其实还可以这样指定启动 ：(指定途径）这也是我经常用的方式只要，问题原因是没有配置好，这个还没有研究，等我配置好了，再更新！！

{% highlight sh %}
$ mongod  --dbpath /var/lib/mongodb/data
{% endhighlight  %}

### 参考文献

* MongoDB Configuration Options ：[http://docs.mongodb.org/manual/reference/configuration-options/](http://docs.mongodb.org/manual/reference/configuration-options/)
* Install MongoDB on Ubuntu ：[http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)
* mViewer：[http://imaginea.github.com/mViewer/0.9/](http://imaginea.github.com/mViewer/0.9/)

### 最后推荐：  mongodb 模拟终端:

[http://try.mongodb.org/](http://try.mongodb.org/ ) 模拟终端

ok.唉，弄了好久，不懂英语，翻译也是问题，不过还是看英文文档看懂了！！！！


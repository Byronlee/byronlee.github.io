---
layout: post
title: Ubuntu 12.04.1 下安装配置 JDK 7 笔者亲式
header: Pages
categories: [Ubuntu]
tags: [jdk, ubuntu]
---

{% include JB/setup %}

### 第一步：下载jdk-7-linux-i586.tar.gz （目前发稿前是最新版）

{% highlight sh %}
wget -c http://download.oracle.com/otn-pub/java/jdk/7/jdk-7-linux-i586.tar.gz
 {% endhighlight  %}

(注：如果下载不下来，可以使用其他下载工具，或者直接在官网去找到这个版本下载。)

### 第二步：解压安装

{% highlight sh %}
sudo tar zxvf ./jdk-7-linux-i586.tar.gz  -C /usr/lib/jvm
cd /usr/lib/jvm
sudo mv jdk1.7.0/ java-7-sun
 {% endhighlight  %}

### 第三步：修改环境变量
{% highlight sh %}
vim ~/.bashrc
 {% endhighlight  %}

添加：

{% highlight sh %}
export JAVA_HOME=/usr/lib/jvm/java-7-sun
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH
 {% endhighlight  %}

保存退出，输入以下命令使之立即生效。

{% highlight sh %}
source ~/.bashrc
 {% endhighlight  %}

### 第四步：配置默认JDK版本

由于ubuntu中可能会有默认的JDK，如openjdk，所以，为了将我们安装的JDK设置为默认JDK版本，还要进行如下工作。

执行代码:

{% highlight sh %}
sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/java-7-sun/bin/java 300
sudo update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/java-7-sun/bin/javac 300
sudo update-alternatives --install /usr/bin/jar jar /usr/lib/jvm/java-7-sun/bin/jar 300
sudo update-alternatives --install /usr/bin/javah javah /usr/lib/jvm/java-7-sun/bin/javah 300
sudo update-alternatives --install /usr/bin/javap javap /usr/lib/jvm/java-7-sun/bin/javap 300
 {% endhighlight  %}

执行代码：

{% highlight sh %}
sudo update-alternatives --config java
 {% endhighlight  %}

系统会列出各种JDK版本，如下所示：

{% highlight sh %}
snowdream@snowdream:~$ sudo update-alternatives --config java
 {% endhighlight  %}

有 3 个候选项可用于替换 java (提供 /usr/bin/java)。

{% highlight sh %}
  选择       路径                                    优先级  状态
------------------------------------------------------------
* 0            /usr/lib/jvm/java-6-openjdk/jre/bin/java   1061      自动模式
  1            /usr/lib/jvm/java-6-openjdk/jre/bin/java   1061      手动模式
  2            /usr/lib/jvm/java-6-sun/jre/bin/java       63        手动模式
  3            /usr/lib/jvm/java-7-sun/bin/java           300       手动模式
{% endhighlight  %}


要维持当前值[*]请按回车键，或者键入选择的编号：3

{% highlight sh %}
update-alternatives: 使用 /usr/lib/jvm/java-7-sun/bin/java 来提供 /usr/bin/java (java)，于 手动模式 中。
{% endhighlight  %}

### 第五步：测试

{% highlight sh %}
snowdream@snowdream:~$ java -version
java version "1.7.0"
Java(TM) SE Runtime Environment (build 1.7.0-b147)
Java HotSpot(TM) Server VM (build 21.0-b17, mixed mode)
{% endhighlight  %}

OK，整个过程就安装完了。 开启你的开发之旅吧，呵呵
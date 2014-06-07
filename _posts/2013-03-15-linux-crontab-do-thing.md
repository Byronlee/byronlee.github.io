---
layout: post
title: 【小结】linux的crontab做定时任务
header: Pages
categories: [Archlinux, linux]
tags: [archlinux, linux, crontab]
---

{% include JB/setup %}

所谓的定时任务，就是让系统在规定的时间做做某事，或者循环做某事。linu系统本身就提供这样的服务，这就是cron.

### cron服务介绍

所谓任务，就是我们要执行的个各种终端命令或者数据库的操作或项目命令或者rake任务等等，然后通过cron命令把这些任务保存在/etc/crontab文件里

操作系统会自动的去读取这个文件，然后执行里面的任务。 每个系统用户如果设置了自己的cron，那都会在/var/spool/cron下面有对应用户名的crontab。

无论编写/var/spool/cron目录内的文件还是/etc/crontab文件，都能让cron准确无误地执行安排的任务，区别是/var/spool/cron下各系统用户的crontab文件是对应用户级别的的任务配置，而/var/crontab文件则是对应系统级别的任务配置。

cron服务器每分钟读取一次/var/crontab/cron目录内的所有文件和/etc/crontab文件。

## cron服务的使用

向crontab里面添加一个任务

### 要开启crond 服务：

{% highlight sh %}
$ systemctl  start/enable crond
{% endhighlight %}

// 但是我的不起作用， 就直接 进入到crond 的目录下：/usr/sbin/cron 下去执行 crond  (之前就是没有开启这个服务，任务写好了，也没有报错，就是不执行，弄里了好久，都不知道错在哪里，原来是服务没开，蛋疼！)

可以用 `ps -ef | grep crond` 查看是否开启

### 常见的命令

{% highlight sh %}
$ crontab -l
{% endhighlight %}

浏览当前用户的crontab，即浏览已存在的计划任务列表
{% highlight sh %}
$ crontab -e
{% endhighlight %}
系统默认编辑器是vi, 对emacs用户来说很蛋疼，所以可以通过终端执行命令来改变系统默认编辑器：
{% highlight sh %}
$ export EDITOR=emacs
{% endhighlight %}
编辑当前用户crontab，如之前从未编辑过crontab文件，那么crontab是一个空白文件，我们可以完全手工编写我们所需要的计划任务列表

### 编写任务。 下面详细介绍计划任务列表的写法与语法。

以下是几个例子：
{% highlight sh %}
1)9 9 * * * /usr/local/bin/cvsb
2)3 3 * * 0 /usr/local/bin/qbbak
3)* */6 * * * /usr/local/bin/esbbak
4)20,30 * * * /usr/local/bin/esbak
5)* 23 * * 2-5 /usr/local/bin/esbbak

六个字段对应的含义如下：
  9         9        *        *        *
分钟     小时   日期   月份    星期

1)表示每天早上9点9分执行目录/usr/local/bin/中的cvsb文件
2)表示每周日凌晨3时3分执行目录/usr/local/bin中的qbbak文件
3)表示每6小时执行一次，执行时间从第一次执行起计算，当然也可以自定义执行时间，比如0 */6 * * *那程序就会在整点执行
4)表示在每小时20分和30分时执行
5)表示在星期二到星期五每天的23点执行
在以上任何值中，星号（*）可以用来代表所有有效的值。譬如，月份值中的星号意味着在满足其它制约条件后每月都执行该命令。
{% endhighlight %}

整数间的短线（-）指定一个整数范围。譬如，1-4 意味着整数 1、2、3、4。

用逗号（,）隔开的一系列值指定一个列表。譬如，3, 4, 6, 8 标明这四个指定的整数。

正斜线（/）可以用来指定间隔频率。在范围后加上 / 意味着在范围内可以跳过 integer。譬如，0-59/2 可以用来在分钟字段定义每两分钟。间隔频率值还可以和星号一起使用。例如，*/3 的值可以用在月份字段中表示每三个月运行一次任务。

开头为井号（#）的行是注释，不会被处理。

上面简单介绍了cron的一些基本用法，这个东东的时间组合可不是一般的强～可以复杂到你无法想象，我们只要掌握少许基本就可以满足日常需求了。

### rails 中的使用

要想定时执行rails 项目中contrller 或者model 里的方法，当然 whenever gem包是最好不过的了

`github: https://github.com/javan/whenever `  这是如何写whenever的定时任务

在终端 可以用 命令

{% highlight sh %}
$ whenever --help
{% endhighlight %}

查看有哪些命令， 以便将它们编译和处理

### cron进阶使用

__避免cron产生垃圾文件__

细心的朋友可能会发现系统/var/spool/clientmqueue/目录下往往存有大量文件，原因是系统中有用户开启了cron，而cron中执行的程序有输出内容，输出内容会以邮件形式发给cron的用户，而sendmail（系统自带的邮件服务器）没有启动所以就产生了这些文件。

这时可以使用输出重定向，即在计划任务后加上> /dev/null 2>&1

例： `9 9 * * * /usr/local/bin/cvsb > /dev/null 2>&1`

`2>&1`：把错误重定向到输出要送到的地方。

把命令的执行结果重定向到/dev/null，即把产生的错误抛弃。

__一种经常碰到的情况，需要执行的文件没问题，但通过cron就是死活不能正确执行__

这时我们可以通过输出重定向将cron的执行过程输出到一个文件，通过分析执行过程来寻找错误的原因

例： `9 9 * * * /usr/local/bin/cvsb > /var/log/crontab_log 2>&1`

上例将cron的执行过程输出到一个文本文件crontab_log，这个文件可以随便手动建一个，放在哪都行，重定向目录写对就

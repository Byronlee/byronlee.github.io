---
layout: post
title: Archlinux安装+配置+打造自己的linux环境+小bug解决笔记
header: Pages
categories: [Archlinux, 技术经验]
tags: [archlinux, openbox, feh, systemd]
---

{% include JB/setup %}

### 笔记整理

用archlinx有段时间了，各种零星的笔记记了一大推，很想整理一下，所以整理了笔记，得此文，内容有点多，给个导行读：

__系统：archlinux 　关键词汇：openbox,systemd,sysinit,feh__

### 提纲

* archlinux的安装
* 图形界面的安装和启动
* Archlinux的systemd 启动系统
* 配置时间时区的纠正
* 打造自己的archlinux环境，推荐常用软件
* openbox快捷键定义
* 小巧、强大的图片浏览器：Feh

### 写在前面：

用linux也有段时间了，入手ubuntu，确实，ubunut+xfce打造的系统，用起确实还是可以，简单，美观，经典，而且很像mac系统的操作界面，作为初使用者，这样搭配那是再安逸不过了，可是不够折腾，折腾一段时间后，就感觉很混淆了， 它的配置啊，进程的管理啊等等，估计是我能力有限，就感觉很混乱，可定制性很不好，很多都是它给你做好了，想去研究下原理又找不到途径，结果就是:一般的使用，都还没有出什么大问题，基本的电脑需求能满足，但是出现问题后，就找不到最好的解决方案了，很是恼火，我遇的最明显的问题就是包依赖，我们经常会看到想如下的问题：

__问题一：__

> 下列软件包有未满足的依赖关系：
>
> libtiff4-dev : 依赖: libjpeg-dev
>
> E: 无法修正错误，因为您要求某些软件包保持现状，就是它们破坏了软件包间的依赖关系。

__解决方法：__

{% highlight sh%}
$ sudo apt-get install build-essential libgtk2.0-dev libjpeg62-dev libtiff4-dev libjasper-dev libopenexr-dev cmake python-dev python-numpy libtbb-dev libeigen2-dev yasm libfaac-dev libopencore-amrnb-dev libopencore-amrwb-dev libtheora-dev libvorbis-dev libxvidcore-dev
{% endhighlight %}

把上面的命令分解成一个一个包安装，于是就发现成功了。因为这样安装他会重新卸载一些。

看着就不舒服，在用rails的时候，安装sqlite3数据库，一直就出类似的包依赖问题，至今为解决！！网上没有找到一个完美的解决方案，即使有些包依赖根据网上的方法能解决，那也只是误打误撞（本人菜鸟），还是根本不懂为什么要那样解决！

要解决包的依赖，跟C,C++，编译，宏依赖都还是有关的，这样才好解决问题，但对此目前都还不熟，只能拿他无奈何！

__问题二：__

还有一个蛋疼的问题，就是ubuntu的启动进程的工作方式：　upstart jobs，和传统的　System V initialization混合兼容使用，具体见另外一篇博客：[ubuntu为什么没有/etc/inittab文件? 深究ubuntu的启动流程分析]({{ site.url}}/blog/2012/10/17/ubuntn-why-not-have-initab-file/)　，那个之混乱啊，对进程的控制，很不习惯！！　队友一直强调换系统，于是放弃了ubuntu, 来到了archlinux的世界！！　以下是archlinu官网这样介绍：

> Arch Linux 一个简单、轻量级、适合计算机水平较高用户使用的发行版，是一个独立的开发的采用滚动升级模式的通用i686/x86-64 GNU/Linux 发行版，灵活适用于任何角色。它的开发注重于设计简洁、结构精简、代码优雅。Arch 刚安装后只提供了一个最基本的系统，可以让用户按照自己的喜好，通过仅仅安装自己需要的软件来配置自己的理想的环境。官方没有提供图形界面配置工具，大多数系统配置需要通过从命令行编辑简单的文本文件来配置。基于滚动升级模式，Arch 尽全力保证它的软件是最新的稳定版本

archlinux适合对linux使用有一定经验的人，最好不要作为入学系统，如果你经得起折腾，那你就试试吧　　呵呵

### Archlinux的安装

步骤就按照arichlinx官网的　教程去做，　尽量看英文版的，中文版的跟新好像不是那么及时：

附上链接：

__英文：__ https://wiki.archlinux.org/index.php/Beginners%27_Guide

__中文：__ https://wiki.archlinux.org/index.php/Beginners%27_Guide_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)

下面就中间的个别我遇到的问题记录一下：

找一个U盘，将archlinux的镜像文件写入U盘： 　

__先格式化工具：__

{% highlight sh%}
#umount /dev/sdb1
#注意/dev/后面的设备要根据你的实际情况而定 格式化并建立VFAT文件系统
#mkfs.ext4 /dev/sdb1 最后再mount上就成了,或者把U盘拨了再插上,系统可能会自动mount上,就可以用U盘了
{% endhighlight %}

__U盘再写入工具：__

{% highlight sh%}
sudo dd if=./*.iso  of=/dev/sdc bs=512
{% endhighlight %}

if 后面跟 iso 的路径 of 后面跟 U 盘的路径， 一般都是 /dev/sdc不知道可以用命令: fdisk -l 来查看．　bs是限制速度的，速度过快很可能写入出错，导致写入不正确！从U盘启动就能看见安装界面了，　如果不能看见，那就是没有刻录正确！　要重新刻录！

__分区工具(命令，自带的，根据提示就可完成)：当前安装盘包含如下工具：__

* cgdisk – 仅支持 GPT 分区表。
* cfdisk – 仅支持 MBR 分区表。
* parted – 两者都支持。

我使用使用cfdisk，　用起很不错，也简单，按照提示做就是

{% highlight sh%}
$　cfdisk   //最好用
{% endhighlight %}

__添加包管理器的源的途径__

在　/etc/pacman.d/mirrorlist按照它的格式写在最前面，这是163和清华大学的源，目的在于以后安装软件的时候快！

{% highlight sh%}
Server = http://mirrors.163.com/archlinux/$repo/os/$arch
Server = http://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch
{% endhighlight %}

__网络的配置：__

推荐工具　：netcfg

官网那个教程有点复杂，用这个工具轻易搞定！，只需要熟悉这个工具的配置，还是很容易的

__配置启动加载器__

这就是引导程序，我们经常开机叫我们选系统，就是这个干的事情

推荐使用　Grub　，那个安装教程上有Syslinux　，我用的这个  //目前它在我电脑上还没有把window没有正确识别出来

其他的认真阅读官网，　如果有什么问题，最后有一个老手在旁边指导一下，免得走很多弯路！

### 图形界面的安装和启动

我们按照教程做了后，都是在字符命令界面下工作的，我们需要图形界面，一般都只是用一个窗口管理器`openbox`就可以了

openbox 的安装官网教程：https://wiki.archlinux.org/index.php/Openbox_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)

从字符界面启动图形界面： 我之前很迷惑，因为我看不同的教程有至少有三种启动方式，就是不明白区别在什么地方：
{% highlight sh%}
　　$ startx //第一种
　　$ xinit //第二种
　　$ xinit /usr/bin/openbox //第三种
{% endhighlight %}

对与我这样的菜鸟，就抛根问底了：

xinit只执行xinit程序

startx本身是一个脚本，会调用系统的xinitrc（/etc/X11/xinit/xinitrc）或用户的xinitrc（~/.xinitrc）

如果用startx来启动x，可以把这段代码加入xinitrc，让它执行xinitrc.d下面的脚本

{% highlight sh%}
if [ -d /etc/X11/xinit/xinitrc.d ]; then
for i in /etc/X11/xinit/xinitrc.d/* ; do
if [ -x "$i" ]; then
. "$i"
fi
done
fi
{% endhighlight %}

gdm不会读取执行xinitrc，但会执行`/etc/X11/xinit/xinitrc.d/`下面所有的脚本

换句话说，用startx　来启动图形界面，中途还是自动的会运行xinit程序的！　可以理解为一个包含的关系， xinit /usr/bin/openbox　就指明只开启这个openbox程序,这样启动很多配置文件都读不到，这样我们都一般用startx　来启动，它即包含应该启动的服务也把改读的配置文件给读了.

我们在写配置文件的时候可能对下面几个文件有点分不清，我查了下，做个记录：

{% highlight sh%}
~/.xinitrc是在当前用户startx的时候载入。su切换到其它用户的时候不会运行。
~/.bashrc是开终端的时候载入
~/.*都是当前用户的配置文件。
{% endhighlight %}

__安装一个openbox窗口管理器推荐使用一个登录管理器　`slim` :__

slim　官网安装教程：https://wiki.archlinux.org/index.php/SLiM_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)

最后把slim 设置为开机启动：
{% highlight sh%}
$ sudo systemctl enable slim.server
{% endhighlight %}

就oK! 　systemctl　的讲解见下一个章

### Archlinux的systemd 启动系统

在arch的安装过程中我遇到的最大问题，恰恰与我决定进入的arch的时间有关系。安装使用的是[Arch Linux2012.10.06](https://www.archlinux.org/download/)的安装镜像，而正是这个安装镜像第一次引入 [systemd](https://www.archlinuxcn.org/install-medium-20121006-introduces-systemd/)，默认使用 [systemd 启动系统](https://www.archlinuxcn.org/systemd-is-now-the-default-on-new-installations/)，而不是使用 /etc/rc.conf 文件中的 DAEMONS 数组来启动使用旧的 rc.d 脚本的服务。然而，官方的[新手指南wiki](https://wiki.archlinux.org/index.php/Beginners%27_Guide_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))中依然是按照以前的方式指导的，虽然官方强调这个改变不会影响已有的系统，但是我却因此遇到了很多问题，导致连续装了n次都不得成功，在配置中也出现很多低级机械性的问题！

我反复查找问题才发现包括rc.conf,inittab等一系列的重要的配置文件都没有默认安装，虽然我手写的rc.conf但是显然这还不够。而这些脚本需要用户自己安装 initscripts 软件包，已经不在base和base-devel里默认安装到新系统了。于是我安装base和base-devel后紧接着安装了initscripts问题就解决了，最终结果是按照新手指南安装了一个使用旧的 rc.d 脚本的启动服务的arch系统。

之后，我又根据相关的wiki，使用systemd一一替换掉rc.d来启动系统服务，进一步完成arch的最新改变，这里我是走了弯路了的。

对于这个systemd启动系统推荐两篇完美的解说，附上链接，看了就明白了：

* 第一篇：[设计思路比Upstart更加超前的init系统–systemd](http://linuxtoy.org/archives/more-than-upstart-systemd.html)
* 第二篇：[systemd如何管理进程](http://fedoraproject.org/wiki/Systemd/zh-cn)　　（这篇一定好好的读，讲解堪称完美）
* 第三篇：[archlinux 官网systemd (简体中文)](https://wiki.archlinux.org/index.php/Systemd_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
* 第四篇：[高速启动，现在开始systemd](http://mtoou.info/hing-systemd/)　(这篇文章也值得读)

可以对比阅读原来的SysVinit系统　：archlinux官网　[SysVinit (简体中文)](https://wiki.archlinux.org/index.php/SysVinit_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))

__下面罗列一下最常用的几条命令：__

{% highlight sh%}
$ systemctl is-enabled name.service #查询服务是否开机启动
$ sudo systemctl enable name.service #开机运行服务
$ sudo systemctl disable name.service #取消开机运行
$ sudo systemctl start name.service #启动服务
$ sudo systemctl stop name.service #停止服务
$ sudo systemctl restart name.service #重启服务
$ sudo systemctl reload name.service #重新加载服务配置文件
$ systemctl status name.service #查询服务运行状态
$ systemctl --failed #显示启动失败的服务
{% endhighlight %}

### 配置时间时区的纠正

设置时区,传统的做法是

复制相应的时区文件，替换系统时区文件；

或者创建链接文件 `cp /usr/share/zoneinfo/$主时区/$次时区 /etc/localtime`

在中国可以使用：

{% highlight sh%}
cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
{% endhighlight %}

将当前时间和日期写入BIOS，避免重启后失效

{% highlight sh%}
hwclock -w
{% endhighlight %}

最后我们用date命令查看时间：

{% highlight sh%}
[byronlee@byronlee etc]$ date
2013年 01月 10日 星期四 07:04:09 CST
{% endhighlight %}

这样用的是，cst 时区，与我们的时区，时间是不相吻合的

正确做法：

如果存在`/etc/adjtime`文件和`/etc/localtime` 文件，将它删除，可以用下面命令自动生成 `/etc/adjtime`： UTC(推荐使用):

__注意:__ 硬件时钟使用 UTC 不代表显示时间时使用 UTC.

{% highlight sh%}
# hwclock --systohc --utc
{% endhighlight %}

localtime，不推荐，但 Windows 默认使用此方式

警告: 使用 localtime 可能导致一些无法修复的 bug。但目前还没有取消此设置选项的计划

{% highlight sh%}
# hwclock --systohc --localtime
{% endhighlight %}

### 打造自己的archlinux环境，推荐常用软件

* openbox的图形化设置工具　：obconf
* openbox的图形化菜单编辑工具　：obmenu
* scrot : 截屏工具
* 轻量极　图片查看工具　：　feh
* 思维导图工具　xmind
* 编辑器：emacs / Gvim
* 系统垃圾清理工具（实用）bleachbit
* dia（流程图专用）
* 文档阅读器：evince
* 体播放器：mplayer
* 清凉级查看图片工具，可以设置背景图片：feh //具体使用见下一章节,小巧强大的图片浏览器:Feh
* 文件管理器：nautilus， 界面很好看。适用

### openbox快捷键定义

快捷键定义可以通过openbox本身或者xbindkeys来实现,xbindkeys放到下一章讨论,先说说openbox自带的设置.

在openbox配置文件rc.xml中快捷键定义占了很大一部分篇幅,由于目前obconf还无法对快捷键定制,所以只能自己修改rc.xml

xml的语法非常简单,下面是一个例子(具体的见openbox官方配置教程):

定义C+t 打开终端tolda:

{% highlight sh%}
<keybind key="C-t"> <!--定义一个快捷键win健+v -->
  <action name="Execute"> <!--类型为执行 -->
    <startupnotify>
      <enabled>true</enabled>
      <name>tilda</name> <!--名字 -->
    </startupnotify>
    <command>tilda</command> <!--命令,可以为脚本 -->
  </action>
</keybind>
{% endhighlight %}

### 小巧、强大的图片浏览器：Feh

Feh是一个轻量级、强大、具有很高的可配置性的、命令行操作的图像查看器，同时它也可以用来管理桌面壁纸，特别适合缺少这类特性的独立窗口管理器，如openbox、Fluxbox、awesome(似乎是标配)等。

__图片浏览__

要快速的浏览指定目录里的图像，你可以用以下参数启动feh：

{% highlight sh%}
$ feh -g 640×480 -D 5 -d -S filename /path/to/directory

-g 选项强制图像的显示大小不大于640×480
-D 自动播放时间间隔，单位是秒
-d 显示文件名
-S filename 选项按文件名排列图像
{% endhighlight %}

__制作拼贴画__

要将目录的图片拼成一张大图可以这样：

{% highlight sh%}
$ feh -m -X -y 50 -E 50 -W 500 -o out.jpg /path/to/directory

-m 生成拼贴画
-X 不保留宽高比
-y 缩小后的宽度
-E 缩小后的高度
-W 指定拼贴画的宽度
-o 拼贴画的输出
/path*** 图片来源
{% endhighlight %}

__管理背景图片__

以我用的openbox为例，首先在~下新建文件“.fehbg”，内容为：

{% highlight sh%}
$ feh –bg-scale /path/image.jpg
{% endhighlight %}

然后在`~/.config/openbox/autostart.sh` 添加：

{% highlight sh%}
$ eval `cat ~/.fehbg` &
{% endhighlight %}

也可以在.xinitrc中启动feh。

### 相关链接

* [ArchLinuxWiki Feh (简体中文)](http://wiki.archlinux.org/index.php/Feh_%28%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87%29)
* [小巧强悍的看图工具Feh](http://blog.cathayan.org/item/1956)

想了解更多请 `$feh -help`

OK ,整理完毕！！
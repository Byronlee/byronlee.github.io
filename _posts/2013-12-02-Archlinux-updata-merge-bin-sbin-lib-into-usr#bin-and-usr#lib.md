---
layout: post
title: Archlinux 更新，merge /bin, /sbin,/lib into /usr/bin and /usr/lib
header: Pages
category: linux
tags: [linux, archlinux]
---
{% include JB/setup %}

### 最近对archlinux 更新，最先出现的问题是:

{% highlight html %}
error: failed to commit transaction (conflicting files)
filesystem: /bin exists in filesystem
filesystem: /sbin exists in filesystem
filesystem: /usr/sbin exists in filesystem
Errors occurred, no packages were upgraded.
{% endhighlight %}

上网一查，才，知道，最新版本的arch改动很大，需要一部分手动配合跟更新，将所有非官方包中 /bin, /sbin 或者 /usr/sbin 目录下的文件移动到 /usr/bin 下。

官方指南： https://www.archlinux.org/news/binaries-move-to-usrbin-requiring-update-intervention/

至于为什么作者要这样更新： https://mailman.archlinux.org/pipermail/arch-dev-public/2012-March/022625.html

于是呼就照做了，万幸，更新OK，万幸中的不幸，当重新启动时：

{% highlight html %}
Error: Root device mounted successfully, but /sbin/init does not exist.
Bailing out, you are on your own. Good Luck

[rootfs /]#
{% endhighlight %}

但是查看时他是软连接到busybox的：

{% highlight html %}
# [rootfs /]# ls -la /sbin/init
# => /sbin/init -> busybox
{% endhighlight %}


google了很多，结果：


To make the change permanent, modify the /etc/default/grub file, 首先我是在rootfs下，不能进行任何操作， 又不能安装 systemd-sysvcompat
因为 the systemd-sysvcompat package installed, which provides /usr/bin/init (which is symlinked by /sbin/init). In the meantime, set your init= kernel parameter to /usr/lib/systemd/systemd.

只能选择零时的： edit the grub entry in the grub menu, 我选择的方式在启动Grub的时候 press "e“ 进去grub的编辑状态，在linux那一行 追加 ” init=/usr/lib/systemd/systemd “

但万万都很不幸，问题没有解决。 初步猜想是在更新的时候可能没有更新或者安装 the systemd-sysvcompat package

也有人说，从新从一个安装系统中chroot引导进去，然后安装需要的东西。 但是这个稍微太复杂了点，还没有安装盘........ 难不成真的要重新装？

最近有遇到同样问题的朋友没？ 求分享 ^_^

__【更新，解决方案】：__

问题反思：

之所以会出现这样的问题，是因为 安照官网的步骤去升级，中间有一步好像说"|"这个符号有问题，我pass了，最后升级filesystem的时候就提示error,升级不了。然后点重启，不能，按复位键，就进不去了。
这个步骤就是：

{% highlight html %}
# $ paclist <repo> | awk '; { print $1 } '; | pacman -Ql - | grep '; /s\?bin/\| /usr/sbin/';
{% endhighlight %}

只所以会出现提示 | 这个符号有问题，是我们习惯性的，粘贴copy过去，而忽略了应该把 <repo>换成你的第三方源的名字……

__解决思路：__ 用启动盘chroot进入本地系统重新更新一次。也就是从新找个镜像 挂载当前系统，chroot进去，按照官方的教材一步一步在更新一次

### 方案：

* 用arch启动盘登陆（没有启动盘的从新在官网下载个镜像刻录到U盘，从U盘启动）
挂载你原来装linux的分区到mnt（sda1换成你本地系统根目录所在分区）
{% highlight html %}
# mount /dev/sda1 /mnt
{% endhighlight %}

创建bash的软连接(也可以不做下面的软连接，直接在后面跟上bash的途径，我的是：chroot /mnt /usr/bin/bash)

{% highlight html %}
# ln -s /mnt/usr/bin/bash /mnt/bin/bash
{% endhighlight %}

（因为我的系统默认使用zsh，所以再创建zsh的软连接，没有的忽略此步）

{% highlight html %}
# ln -s /mnt/usr/bin/zsh /mnt/bin/zsh
{% endhighlight %}

* 现在可以chroot入本地系统了

{% highlight html %}# chroot /mnt
{% endhighlight %}

* 清理 /bin /sbin /usr/sbin

非官方源的包查询：

{% highlight html %}
# pacman -Qqo /bin /sbin /usr/sbin | pacman -Qm
{% endhighlight %}

以上这一步骤很重要，如果/bin /sbin /usr/sbin 这些目录里面还有软件，系统是不能更新的，把这些包记下来，统统卸载掉，更新完整后你再装上。

{% highlight html %}
# paclist <repo> | awk '; { print $1 } '; | pacman -Ql - | grep '; /s\?bin/\| /usr/sbin/';
{% endhighlight %}

这个也是，查询好记下来然后卸载掉。<repo>换成非官方源，没有的忽略此步。(不要忘记替换<repo>)

确保/etc/pacman.conf的IgnorePkg或IgnoreGroup里的包没有文件在/bin, /sbin, or /usr/sbin，有的话记下来然后处理好。

确保/bin /sbin /usr/sbin里没有任何遗漏的文件（除了了自己建立的/bin/bash，/bin/zsh之外）：

{% highlight html %}# find /bin /sbin /usr/sbin -exec pacman -Qo -- {} + >/dev/null
{% endhighlight %}

* 由于是chroot进入系统，所以更新时会提示mtab文件错误。

执行如下命令：

{% highlight html %}
# mv /etc/mtab /etc/mmmtab
# cp /etc/fstab /etc/mtab
{% endhighlight %}

更新完毕后再
{% highlight html %}
# mv mmmtab mtab
{% endhighlight %}
即可。

* 更新时会提示签名错误

编辑/etc/pacman.conf，在每个源下都加入SigLevel = Never。过后可以删除。(这个一定要做，不然要提示签名错误)

* 最后 更新系统

{% highlight html %}
# pacman -Su --ignore filesystem,bash
# pacman -S bash
# pacman -Su
{% endhighlight %}

* 删除bin目录，然后建立软链接

{% highlight html %}
# rm -rf /bin
# ln -s /usr/bin /bin
{% endhighlight %}
* 这个时候要做

{% highlight html %}
# pacman -S systemd-sysvcompat
# mkinitcpio -p linux
{% endhighlight %}
不然会报错： Error： devise UUID not fond, Skipping fsck.

* 可以选做（退出chroot后运行），

{% highlight html %}
# pacstrap /mnt base base-devel
{% endhighlight %}
* reboot～

之后重新yaourt -Syu一次，结束。

----------------------------------------------------------

Arch ,我的唯一。

Ruby-china: [http://ruby-china.org/topics/15921](http://ruby-china.org/topics/15921)

---
layout: post
title: Android系统手机隐藏代码-你不知道的事
header: Pages
categories: [Android]
tags: [Android]
---

{% include JB/setup %}

### 不是全部都可以用，但是要看Android系统的编程改了多少

不同厂商的手机都会隐***特的代码，用来查看系统及固件版本，或者进行硬件的测试，当然 Android 手机也不例外，除了好像计算机一样能显示更详细的手机信息外，更可重设为原厂设定，更新相机韧体等。但部份代码要谨慎使用，因为可能令手机失去原有的功能，笔者只是网络转载，出现问题一概恕不负责。

{% highlight html %}

*#*#2664#*#*   触控屏幕测试 (最实用，开发人员理解触屏的位置坐标)

*#*#4636#*#*  显示手机信息、电池信息、电池记录、使用统计数据、WiFi 信息

*#*#7780#*#*  重设为原厂设定，不会删除预设程序，及 SD 卡档案。

*2767*3855#   重设为原厂设定，会删除 SD 卡所有档案。

*#*#34971539#*#*  显示相机相机韧体版本，或更新相机韧体

*#*#7594#*#*  当长按关机按钮时，会出现一个切换手机模式的窗口，包括: 静音模式、飞航模式及关机，你可以用以上代码，直接变成关机按钮。

*#*#273283*255*663282*#*#*  开启一个能让你备份媒体文件的地方，例如相片、声音及影片等

*#*#197328640#*#*启动服务模式，可以测试手机部分设置及更改设定
{% endhighlight %}

### WLAN、 GPS 及蓝牙测试的代码

{% highlight html %}
*#*#232339#*#* 或 *#*#526#*#* 或 *#*#528#*#* – WLAN 测试

*#*#232338#*#* – 显示 WiFi MAC 地址

*#*#1472365#*#* – GPS 测试

*#*#1575#*#* – 其它 GPS 测试

*#*#232331#*#* – 蓝牙测试

*#*#232337#*# – 显示蓝牙装置地址

*#*#8255#*#*启动 GTalk 服务监视器
{% endhighlight %}

### 显示手机软件版本的代码

{% highlight html %}
*#*#4986*2650468#*#* – PDA、 Phone、 H/W、 RFCallDate

*#*#1234#*#* – PDA 及 Phone

*#*#1111#*#* – FTA SW 版本

*#*#2222#*#* – FTA HW 版本

*#*#44336#*#* – PDA 、Phone、 CSC、 Build Time、 Changelist number
{% endhighlight %}

### 各项硬件测试

{% highlight html %}
*#*#0283#*#* – Packet Loopback

*#*#0*#*#* – LCD 测试

*#*#0673#*#* 或 *#*#0289#*#* – Melody 测试

*#*#0842#*#* – 装置测试，例如振动、亮度

*#*#2663#*#* – 触控屏幕版本

*#*#0588#*#* – 接近感应器测试

*#*#3264#*#* – 内存版本
{% endhighlight %}
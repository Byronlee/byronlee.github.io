---
layout: post
title: linux 分屏xrandr命令
header: Pages
categories: [linux]
tags: [linux, xrandr]
---

{% include JB/setup %}

### xrandr命令行可以很方便地切换双屏，常用方式如下

{% highlight sh %}
$ xrandr
{% endhighlight %}
罗列当前系统有的显示器

{% highlight sh %}
$ xrandr --output VGA --same-as LVDS --auto
{% endhighlight %}

打开外接显示器LVDS (最高分辨率)，与笔记本液晶屏幕 VGA 显示同样内容（克隆）

{% highlight sh %}
$ xrandr --output VGA --same-as LVDS --mode 1024x768
{% endhighlight %}

打开外接显示器(分辨率为1024×768)，与笔记本液晶屏幕显示同样内容（克隆）

{% highlight sh %}
$ xrandr --output VGA --right-of LVDS --auto
{% endhighlight %}

打开外接显示器(最高分辨率)，设置为右侧扩展屏幕

{% highlight sh %}
$ xrandr --output VGA --off
{% endhighlight %}

关闭外接显示器

{% highlight sh %}
$ xrandr --output VGA --auto --output LVDS --off
{% endhighlight %}

打开外接显示器，同时关闭笔记本液晶屏幕（只用外接显示器工作）

{% highlight sh %}
$ xrandr --output VGA --off --output LVDS --auto
{% endhighlight %}

关闭外接显示器，同时打开笔记本液晶屏幕 (只用笔记本液晶屏)

（最后两种情况请小心操作，不要误把两个屏幕都关掉了….）

除了使用命令外，GNOME 中自带的“屏幕分辨率”软件功能很强大（系统->首选项->屏幕分辨率），打开和关闭第二个监视器的办法是调整它的分辨率，取消“克隆”就可以设置成扩展屏幕，还可以通过拖动图标位置调整双屏时两个屏幕的相对位置。


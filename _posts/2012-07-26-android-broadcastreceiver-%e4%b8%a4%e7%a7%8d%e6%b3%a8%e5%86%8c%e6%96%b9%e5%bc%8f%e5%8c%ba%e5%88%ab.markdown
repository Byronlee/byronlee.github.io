---
layout: post
status: publish
published: true
title: Android BroadcastReceiver 两种注册方式区别
author: Byronlee
author_login: ginchenorlee
author_email: ginchenorlee@sina.com
wordpress_id: 163
wordpress_url: http://www.ginchenorlee.com/?p=163
date: !binary |-
  MjAxMi0wNy0yNiAwNDoxODo1MSArMDAwMA==
date_gmt: !binary |-
  MjAxMi0wNy0yNiAwNDoxODo1MSArMDAwMA==
categories:
- Android
tags:
- android
- 广播，BroadcastReceiver
- 动态
- 静态
comments: []
---
<p>第一种事静态注册，第二种事动态注册：</p>
<p>静态注册，是使用：</p>
<blockquote><p>registerReceiver("你注册BroadcastReceiver的对象", new IntentFilter(<br />
WifiManager.SCAN_RESULTS_AVAILABLE_ACTION));// 注册广播</p></blockquote>
<p>静态注册是在xml中声明：</p>
<blockquote><p>
  receiver android:name="MyBroadcastReciever"><br />
            intent -filter><br />
                action android:name="ABC"><br />
            /intent>  </p>
</blockquote>
<p>动态注册和静态注册一个BroadcastReceiver的区别：</p>
<p>动态注册较静态注册灵活。实验证明：当静态注册一个BroadcastReceiver时，不论应用程序是启动与否。都可以接受对应的广播。</p>
<p>动态注册的时候，如果不执行unregisterReceiver();方法取消注册，跟静态是一样的。但是如果执行该方法，当执行过以后，就不能接受广播了。</p>

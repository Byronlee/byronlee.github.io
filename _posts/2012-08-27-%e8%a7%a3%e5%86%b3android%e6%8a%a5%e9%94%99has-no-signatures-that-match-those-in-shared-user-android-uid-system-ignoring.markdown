---
layout: post
status: publish
published: true
title: ! ' 解决Android报错“has no signatures that match those in shared user android.uid.system;
  ignoring!”'
author: Byronlee
author_login: ginchenorlee
author_email: ginchenorlee@sina.com
wordpress_id: 212
wordpress_url: http://www.ginchenorlee.com/?p=212
date: !binary |-
  MjAxMi0wOC0yNyAxMDoyMToyNyArMDAwMA==
date_gmt: !binary |-
  MjAxMi0wOC0yNyAxMDoyMToyNyArMDAwMA==
categories:
- 经验分享
- Android
- Android UI
tags:
- android
comments: []
---
<p>今天遇到个很蛋疼的问题，就是在android 虚拟机上运行项目的时候，控制台一直就报错：</p>
<blockquote><p>08-27 01:38:51.053: E/PackageManager(58): Package com.mine<br />
has no signatures that match those in shared user android.uid.system; ignoring!</p></blockquote>
<p>于是网上搜索了一下，什么都是讲的很深奥没有看懂，后来突然搞通了，记录一下：</p>
<p>首先我的项目在手机上运行的，一直很好，没有出什么问题，然后今天在虚拟机上运行，就包这个错，首先来给出解决方案：</p>
<p>你在你打开 项目的 AndroidManifest.xml 文件 在文件的开始 肯定有这样一句代码：</p>
<blockquote><p>&lt;?xml version="1.0" encoding="utf-8"?&gt;<br />
&lt;manifest xmlns:android="http://schemas.android.com/apk/res/android"<br />
package="com.rames.test"<br />
android:versionCode="1"<br />
android:versionName="1.0"</p>
<p><span style="color: #ff0000;">android:sharedUserId="android.uid.shared"</span><br />
&gt;</p></blockquote>
<p>然后你把红色的代码去掉  再运行 OK，就解决这个蛋疼的问题了！！！</p>

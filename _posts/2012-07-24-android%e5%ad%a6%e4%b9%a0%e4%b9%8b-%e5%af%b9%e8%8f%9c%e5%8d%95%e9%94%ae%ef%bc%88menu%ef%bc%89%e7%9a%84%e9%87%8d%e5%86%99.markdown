---
layout: post
status: publish
published: true
title: android学习之--对菜单键（Menu）的重写
author: Byronlee
author_login: ginchenorlee
author_email: ginchenorlee@sina.com
wordpress_id: 122
wordpress_url: http://www.ginchenorlee.com/?p=122
date: !binary |-
  MjAxMi0wNy0yNCAwNjoyMjowNCArMDAwMA==
date_gmt: !binary |-
  MjAxMi0wNy0yNCAwNjoyMjowNCArMDAwMA==
categories:
- Android
tags:
- android
- 菜单
- menu
comments: []
---
<p>//对android 菜单键的重写</p>
<blockquote><p>@Override<br />
public boolean onCreateOptionsMenu(Menu menu){</p>
<p>//条用基类的方法，以便调出系统菜单（如果有的话）<br />
super.onCreateOptionsMenu(menu);<br />
menu.add(0,1,0,“重新开始”).setIcon(R.drawable.reflash);<br />
menu.add(0,2,0,"游戏指南").setIcon(R.drawable.help);<br />
menu.add(0,3,0,"关于游戏").setIcon(R.drawable.info);<br />
menu.add(0,4,0,"不想玩了").setIcon(R.drawable.exit);</p>
<p>//返回值为“true”,表示菜单可见，即显示菜单<br />
return true;<br />
}</p></blockquote>
<p>Menu.add()方法</p>
<p><span style="color: #ff0000;">看一看menu.add方法的参数：</span><br />
<span style="color: #ff0000;"> 第一个int类型的group ID参数，代表的是组概念，你可以将几个菜单项归为一组，以便更好的以组的方式管理你的菜单按钮。</span><br />
<span style="color: #ff0000;"> 第二个int类型的item ID参数，代表的是项目编号。这个参数非常重要，一个item ID对应一个menu中的选项。在后面使用菜单的时候，就靠这个item ID来判断你使用的是哪个选项。</span><br />
<span style="color: #ff0000;"> 第三个int类型的order ID参数，代表的是菜单项的显示顺序。默认是0，表示菜单的显示顺序就是按照add的显示顺序来显示。</span><br />
<span style="color: #ff0000;"> 第四个String类型的title参数，表示选项中显示的文字。</span></p>
<p><span style="color: #ff0000;"><br />
</span> 我们可以通过调用Menu.setItemShown()或者Menu.setGroupShown()方法来显示或隐藏一些菜单项。<br />
这里要注意的一个地方是：菜单项的显示顺序是按代码中添加的顺序来的，也就是说Menu.add()方法只能在菜单的最后面新增一个菜单项。<br />
另外，第一个参数的分组标识，不会改变菜单项的显示顺序。</p>
<p>2.响应菜单项点击<br />
当菜单显示出来后，用户点击菜单中的某一菜单项，我们的菜单需要响应这个点击事件。这个也很简单，通过重载onOptionsItemSelected()方法来实现</p>
<blockquote><p>@Override<br />
public boolean onOptionsItemSelected(MenuItem item){<br />
switch (item.getId()) {<br />
case 0:<br />
showAlert("Menu Item Clicked", "菜单项一", "ok", null, false, null);<br />
return true;<br />
case 1:<br />
showAlert("Menu Item Clicked", "菜单项二", "ok", null, false, null);<br />
return true;<br />
case 2:<br />
showAlert("Menu Item Clicked", "菜单项三", "ok", null, false, null);<br />
return true;<br />
}<br />
return false;<br />
}</p></blockquote>

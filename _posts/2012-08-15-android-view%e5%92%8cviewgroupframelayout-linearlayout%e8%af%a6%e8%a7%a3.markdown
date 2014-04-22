---
layout: post
status: publish
published: true
title: ! '#android# View和ViewGroup,FrameLayout, LinearLayout详解'
author: Byronlee
author_login: ginchenorlee
author_email: ginchenorlee@sina.com
excerpt: ! "Activity是Android程序的显示层，每一个显示窗口都是一个Activity；可是Activity本身无法显示在屏幕上，我们可以把它理解成是一个抽象层，一个壳子；就譬如一个JSP页面，它本身并没有显示出来任何东西，负责显示的是他生成的HTML标签。那么Android里谁才是真正显示出来的部分？－－是View和ViewGroup，而ViewGroup其实也是View的子类。\r\n\r\n<span
  style=\"color: #ff0000;\">有了上述的概念，我们现在可以讲明白一个Activity中的显示元素是如何显示出来的了。首先UI组件是按层次结构来由外到内的方式逐步展示的。要将一个屏幕元素层次树绑定在一个屏幕上显示，Activity会调用它的setContentView()方法并且传入这个层次树的根节点引用。当Activity被激活并且获得焦点时，系统会通知activity并且请求根节点去计算并绘制树，根节点就会请求它的子节点去绘制它们自己。每个树上的ViewGroup节点会负责绘制它的子节点。ViewGroup会计算它的有效空间，布局所有的子显示对象，并最终调用所有的子显示对象的
  Draw()方法来绘制显示对象。各个子显示对象可以向父对象请求它们在布局中的大小和位置，但最终决定各个子显示对象的大小和位置的是父对象。</span>\r\n\r\nAndroid程序借助View和ViewGroup对象来构建用户界面。Android提供了比HTML多得多的，现成的用户界面组件，譬如现在网站上常见的五角星评分效果组件RatingBar。RatingBar的显示效果如下图所示：\r\n\r\n"
wordpress_id: 192
wordpress_url: http://www.ginchenorlee.com/?p=192
date: !binary |-
  MjAxMi0wOC0xNSAxNjozNzozMCArMDAwMA==
date_gmt: !binary |-
  MjAxMi0wOC0xNSAxNjozNzozMCArMDAwMA==
categories:
- Android
- Android UI
tags:
- android
- UI
- FrameLayout
- LinearLayout
- View
- ViewGroup
comments: []
---
<p>Activity是Android程序的显示层，每一个显示窗口都是一个Activity；可是Activity本身无法显示在屏幕上，我们可以把它理解成是一个抽象层，一个壳子；就譬如一个JSP页面，它本身并没有显示出来任何东西，负责显示的是他生成的HTML标签。那么Android里谁才是真正显示出来的部分？－－是View和ViewGroup，而ViewGroup其实也是View的子类。</p>
<p><span style="color: #ff0000;">有了上述的概念，我们现在可以讲明白一个Activity中的显示元素是如何显示出来的了。首先UI组件是按层次结构来由外到内的方式逐步展示的。要将一个屏幕元素层次树绑定在一个屏幕上显示，Activity会调用它的setContentView()方法并且传入这个层次树的根节点引用。当Activity被激活并且获得焦点时，系统会通知activity并且请求根节点去计算并绘制树，根节点就会请求它的子节点去绘制它们自己。每个树上的ViewGroup节点会负责绘制它的子节点。ViewGroup会计算它的有效空间，布局所有的子显示对象，并最终调用所有的子显示对象的 Draw()方法来绘制显示对象。各个子显示对象可以向父对象请求它们在布局中的大小和位置，但最终决定各个子显示对象的大小和位置的是父对象。</span></p>
<p>Android程序借助View和ViewGroup对象来构建用户界面。Android提供了比HTML多得多的，现成的用户界面组件，譬如现在网站上常见的五角星评分效果组件RatingBar。RatingBar的显示效果如下图所示：</p>
<p><a id="more"></a><a id="more-192"></a></p>
<p><a href="http://android.yaohuiji.com/wp-content/uploads/2010/07/image28.png"><img style="border: 0px;" title="image" src="http://android.yaohuiji.com/wp-content/uploads/2010/07/image_thumb27.png" alt="image" width="540" height="361" border="0" /></a></p>
<p><strong>二、常用Layout介绍</strong></p>
<p><span style="color: #ff0000;">ViewGroup是个特殊的View，它继承于Android.view.View。它的功能就是装载和管理下一层的View对象或ViewGroup对象，也就说他是一个容纳其它元素的的容器。ViewGroup是布局管理器（layout）及view容器的基类。 ViewGroup中，还定义了一个嵌套类ViewGroup.LayoutParams。这个类定义了一个显示对象的位置、大小等属性，view通过LayoutParams中的这些属性值来告诉父级，它们将如何放置。</span></p>
<p><a href="http://android.yaohuiji.com/wp-content/uploads/2010/07/image29.png"><img title="image" src="http://android.yaohuiji.com/wp-content/uploads/2010/07/image_thumb28.png" alt="image" width="571" height="333" border="0" /></a></p>
<p>ViewGroup是一个抽象类，所以真正充当容器的是他的子类们。我们在这里将介绍 帧布局FrameLayout，线性布局LinearLayout，绝对布局AbsoluteLayout，相对布局RelativeLayout，表格布局TableLayout等几个常用布局</p>
<p><strong>1、帧布局 FrameLayout：</strong></p>
<p>是最简单的一个布局对象。<span style="color: #ff0000;">在他里面的的所有显示对象爱你过都将固定在屏幕的左上角，不能指定位置，但允许有多个显示对象，只是后一个会直接覆盖在前一个之上显示，会把前面的组件部分或全部挡住。</span>下图的例子里，FrameLayout中放了3个ImageView组件，第一个是蓝色的，第二个是绿色的，第三个是树状图（透明的png格式）。ImageView就相当于Html中的img标签，接下来会讲到这个组件。</p>
<p>下面看一个FrameLayout的例子：</p>
<blockquote><p>&lt;?xml version=”1.0″ encoding=”utf-8″?&gt;</p>
<p>&lt;FrameLayout android:id=”@+id/FrameLayout01″<br />
android:layout_width=”fill_parent” android:layout_height=”fill_parent”<br />
xmlns:android=”<a href="http://schemas.android.com/apk/res/android%22">http://schemas.android.com/apk/res/android”</a>&gt;</p>
<p>&lt;ImageView android:id=”@+id/ImageView01″ android:src=”@drawable/p1″<br />
android:layout_width=”wrap_content” android:layout_height=”wrap_content”&gt;&lt;/ImageView&gt;</p>
<p>&lt;ImageView android:id=”@+id/ImageView02″ android:src=”@drawable/p2″<br />
android:layout_width=”wrap_content” android:layout_height=”wrap_content”&gt;&lt;/ImageView&gt;</p>
<p>&lt;ImageView android:id=”@+id/ImageView03″ android:src=”@drawable/p3″<br />
android:layout_width=”wrap_content” android:layout_height=”wrap_content”&gt;&lt;/ImageView&gt;</p>
<p>&lt;/FrameLayout&gt;</p>
<p>注意看 三张图片的 左上角的 顶点 在一个位置！</p></blockquote>
<p><a href="http://android.yaohuiji.com/wp-content/uploads/2010/07/image37.png"><img style="border: 0px;" title="image" src="http://android.yaohuiji.com/wp-content/uploads/2010/07/image_thumb36.png" alt="image" width="540" height="361" border="0" /></a><br />
(FrameLayout的显示效果)</p>
<p><strong>2、线性布局 LinearLayout：</strong></p>
<p>线性布局是所有布局中最常用的类之一，也是RadioGroup, TabWidget, TableLayout, TableRow, ZoomControls类的父类。LinearLayout可以让它的子元素垂直或水平的方式排成一行（不设置方向的时候默认按照垂直方向排列）。</p>
<p>下面看一个LinearLayout的例子：别被例子的长度吓住，仔细看一下其实就是一个LinearLayout中放5个TextView标签而已，TextView相当于Html标签中的Label。</p>
<blockquote><p>&lt;?xml version=”1.0″ encoding=”utf-8″?&gt;<br />
&lt;LinearLayout xmlns:android=”<a href="http://schemas.android.com/apk/res/android%22">http://schemas.android.com/apk/res/android”</a><br />
android:orientation=”vertical”<br />
android:layout_width=”fill_parent”<br />
android:layout_height=”fill_parent”<br />
android:gravity=”center_horizontal”<br />
&gt;<br />
&lt;TextView<br />
android:layout_width=”fill_parent”<br />
android:layout_height=”wrap_content”<br />
android:text=”给小宝宝起个名字：”<br />
android:textSize=”20px”<br />
android:textColor=”#0ff”<br />
android:background=”#333″</p>
<p>/&gt;<br />
&lt;TextView<br />
android:layout_width=”wrap_content”<br />
android:layout_height=”wrap_content”<br />
android:text=”遥遥是男孩的小名”<br />
android:textSize=”20px”<br />
android:textColor=”#0f0″<br />
android:background=”#eee”<br />
android:layout_weight=”3″<br />
/&gt;<br />
&lt;TextView<br />
android:layout_width=”wrap_content”<br />
android:layout_height=”wrap_content”<br />
android:text=”瑶瑶是女孩的小名”<br />
android:textColor=”#00f”<br />
android:textSize=”20px”<br />
android:background=”#ccc”<br />
android:layout_weight=”1″<br />
/&gt;</p>
<p>&lt;TextView<br />
android:layout_width=”fill_parent”<br />
android:layout_height=”wrap_content”<br />
android:text=”海因是男孩的大名”<br />
android:textColor=”#f33″<br />
android:textSize=”20px”<br />
android:background=”#888″<br />
android:layout_weight=”1″<br />
/&gt;<br />
&lt;TextView<br />
android:layout_width=”fill_parent”<br />
android:layout_height=”wrap_content”<br />
android:text=”海音是女孩的大名”<br />
android:textColor=”#ff3″<br />
android:textSize=”20px”<br />
android:background=”#333″<br />
android:layout_weight=”1″<br />
/&gt;<br />
&lt;/LinearLayout&gt;</p></blockquote>
<p>下图是显示效果：</p>
<p><a href="http://android.yaohuiji.com/wp-content/uploads/2010/07/image38.png"><img style="border: 0px;" title="image" src="http://android.yaohuiji.com/wp-content/uploads/2010/07/image_thumb37.png" alt="image" width="540" height="361" border="0" /></a></p>
<p>学习参考：<a href="http://android.yaohuiji.com/archives/196#comments">http://android.yaohuiji.com/archives/196#comments</a></p>

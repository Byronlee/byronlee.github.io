---
layout: post
status: publish
published: true
title: ! '#android#  用程序代码编写linearlayout布局 '
author: Byronlee
author_login: ginchenorlee
author_email: ginchenorlee@sina.com
wordpress_id: 206
wordpress_url: http://www.ginchenorlee.com/?p=206
date: !binary |-
  MjAxMi0wOC0xNiAwNjoxMDo1NSArMDAwMA==
date_gmt: !binary |-
  MjAxMi0wOC0xNiAwNjoxMDo1NSArMDAwMA==
categories:
- Android
- Android UI
tags:
- android
- LinearLayout
comments: []
---
<p>先上代码：</p>
<blockquote><p>m_LinearLayout = new LinearLayout(this);//创建LinearLayout布局对象<br />
m_LinearLayout.setOrientation(LinearLayout.VERTICAL);//设置布局LinearLayout的属性<br />
m_LinearLayout.setBackgroundColor(android.graphics.Color.BLACK);<br />
/*创建ListView对象*/<br />
m_ListView = new ListView(this);<br />
LinearLayout.LayoutParams param = new LinearLayout.LayoutParams(LinearLayout.<br />
LayoutParams.FILL_PARENT,LinearLayout.LayoutParams.WRAP_CONTENT);<br />
m_ListView.setBackgroundColor(Color.BLACK);<br />
/*添加m_ListView到m_LinearLayout布局*/<br />
m_LinearLayout.addView(m_ListView,param);<br />
setContentView(m_LinearLayout);//设置显示m_LinearLayout布局</p></blockquote>
<p>说明：</p>
<blockquote><p><span style="color: #ff0000;">首先，创建线性布局对象</span><br />
LinearLayout layout = new LinearLayout(this);//为本Activity创建一个线性布局对象<br />
//并且设置它的属性 android:layout_width 与 android:layout_height 都为 FILL_PARENT<br />
LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.FILL_PARENT，ViewGroup.LayoutParams.FILL_PARENT);<br />
<span style="color: #ff0000;">然后，为本Activity创建一个TextView，代码如下</span><br />
TextView textView = new TextView(this);<br />
<span style="color: #ff0000;">然后设置TextView的属性</span><br />
textView.setText(R.string.hello);<br />
textView.setId(34);<br />
<span style="color: #ff0000;">对于布局方面的属性这样来设置</span><br />
LinearLayout.LayoutParams textviewParams = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.FILL_PARENT,<br />
ViewGroup.LayoutParams.WRAP_CONTENT);<br />
<span style="color: #ff0000;">接着在线性布局对象中加入这个TextView</span><br />
layout.addView(textView,textviewParams);//加入的同时，也就设置了TextView相对于布局对象的布局属性 android:layout_width 与 android:layout_height<br />
<span style="color: #ff0000;">最后一步，设置本Activity的顶级界面为线性布局</span><br />
setContentView(layout,layoutParams); //同时也就设置了布局对象的android:layout_width 与 android:layout_height<br />
至此，简单的手写代码编写界面介绍完毕，其他复杂的界面都可依次类推！</p></blockquote>

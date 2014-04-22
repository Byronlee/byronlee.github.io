---
layout: post
status: publish
published: true
title: 获取EditText控件的值getText().toString()为空。报错空指针
author: Byronlee
author_login: ginchenorlee
author_email: ginchenorlee@sina.com
wordpress_id: 180
wordpress_url: http://www.ginchenorlee.com/?p=180
date: !binary |-
  MjAxMi0wNy0yOSAxMjoyNTo1OSArMDAwMA==
date_gmt: !binary |-
  MjAxMi0wNy0yOSAxMjoyNTo1OSArMDAwMA==
categories:
- Android
tags:
- android
- 布局
- 位置
- 低级错误
comments: []
---
<p>今天遇到一个很蛋疼的问题，</p>
<blockquote><p>public void onCreate(Bundle savedInstanceState) {<br />
super.onCreate(savedInstanceState);<br />
<span style="color: #ff0000;">name=(EditText)findViewById(R.id.username);</span><br />
<span style="color: #ff0000;"> pass=(EditText)findViewById(R.id.password);</span><br />
<span style="color: #ff0000;"> setContentView(R.layout.main);</span><br />
buttonlogo=(Button) findViewById(R.id.login);<br />
buttonlogo.setOnClickListener(this);</p>
<p>}</p>
<p>public void onClick(View v) {<br />
// TODO Auto-generated method stub<br />
if(v.getId()==R.id.login){</p>
<p>Log.v(TAG, "执行到此处");<br />
<span style="color: #ff0000;">username=name.getText().toString().trim(); //报错</span><br />
userpass=pass.getText().toString().trim();<br />
if(username.equals("")||userpass.equals("")){<br />
Toast.makeText(WowoyuanActivity.this, "用户名或密码不能为空！", Toast.LENGTH_SHORT).show();<br />
}else{<br />
loginwowoyuan(username,userpass);<br />
//Toast.makeText(WowoyuanActivity.this, "登录成功！", Toast.LENGTH_SHORT).show();<br />
}<br />
}</p></blockquote>
<p>运行后 总是报错说是空指针， 并把错误指向<span style="color: #ff0000;">：username=name.getText().toString().trim();</span> 这句代码，于是就很纳闷了，这个很简单的逻辑 怎么出错了？ 最后自己醒悟，唉，原来是<span style="color: #ff0000;"> setContentView(R.layout.main);</span> 放错位置了。 一定要在布局代码以后去操作这些控件。所以 只需要 做以下改正就ok</p>
<blockquote><p>public void onCreate(Bundle savedInstanceState) {<br />
super.onCreate(savedInstanceState);</p>
<p><span style="color: #ff0000;">setContentView(R.layout.main);</span><br />
<span style="color: #ff0000;"> name=(EditText)findViewById(R.id.username);</span><br />
<span style="color: #ff0000;"> pass=(EditText)findViewById(R.id.password);</span></p>
<p>buttonlogo=(Button) findViewById(R.id.login);<br />
buttonlogo.setOnClickListener(this);</p>
<p>}</p></blockquote>
<p>问题得以解决！！ 很是蛋疼的低级错误。</p>

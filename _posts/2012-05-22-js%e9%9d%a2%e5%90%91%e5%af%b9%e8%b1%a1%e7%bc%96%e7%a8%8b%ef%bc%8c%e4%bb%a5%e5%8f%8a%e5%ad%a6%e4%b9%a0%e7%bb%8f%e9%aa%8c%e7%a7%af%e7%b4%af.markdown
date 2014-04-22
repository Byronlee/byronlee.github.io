---
layout: post
status: publish
published: true
title: js面向对象编程，以及学习经验积累
author: Byronlee
author_login: ginchenorlee
author_email: ginchenorlee@sina.com
wordpress_id: 17
wordpress_url: http://www.ginchenorlee.com/?p=17
date: !binary |-
  MjAxMi0wNS0yMiAwODo0ODowMSArMDAwMA==
date_gmt: !binary |-
  MjAxMi0wNS0yMiAwODo0ODowMSArMDAwMA==
categories:
- 前台开发
- js面向对象
tags: []
comments: []
---
<p>先大家看一段简单的代码，就一目了然：这是我习惯的写法</p>
<pre>//构造函数
function Animal(name, sound, age) {
    this.name = name;
    this.sound = sound;
    this.age = age;
}

//类属性
Animal.description = 'animal';

//类静态方法
Animal.descript = function() {
    document.write('This is a 
<pre>输入的结果是：</pre>
<p>This is a 'animal' class!<br />
My name is:dog.--wang<br />
My name is:cat.--miao<br />
My sound is:wang wang!!!<br />
My sound is:miao miao!!!<br />
Name = dog; Age = 5<br />
Name = cat; Age = 3</p>
<p>&nbsp;</p>
<p>首先要理解js的prototype　属性：</p>
<p>prototype　最主要 的作用，就是当你new 多个对象的时候，prototype　里面的内容不会被多次创建，之创建一次，被多个对象公共使用，这在很大程度上节约了内存，优化了代码。</p>
<p>每个函数对象都具有一个子对象prototype，因为函数也可以表示类，所以prototype表示一个类的成员的集合。当new 一个对象时，prototype对象的成员都会被实例化成对象的成员。当new多个对象时不会重复创建。</p>
<p>&nbsp;</p>
<p>//但是在JS写类的时候注意几点：</p>
<p>&nbsp;</p>
<p>1、在类中不能有多个引用，那样的话JS是不能得到值的，例如：</p>
<p>function DivObj(ID){<br />
//得到Div对象<br />
this.ObjElement=document.getElementById(ID);<br />
//把当前的外联样式等赋值给界面Style<br />
this.GetStyle=function(){<br />
this.Style=this.NewStyle;<br />
};<br />
//界面样式<br />
this.Style=this.ObjElement.style<br />
//外联样式<br />
this.NewStyle=this.ObjElement.currentStyle;<br />
//外联样式的类名<br />
this.ElementClass=this.ObjElement.className;<br />
//改变外联样式类名<br />
this.ObjClass=function(ClassName){<br />
this.ObjElement.className=ClassName;<br />
};<br />
}</p>
<p>在类中，已经有对象ObjElement，得到的是DIV这个对象，你要是想得到它的width不能用this.ObjElement.style.width得到width，这样的话会报错，应该把this.ObjElement.style定义一个属性，然后再进行获取，如上，获取他的width为this.Style.width.</p>
<p>2、若是外联样式，也就是说用class从样式表中得到的样式，要是获取的话就不能用Style了，因为style是界面中的，不能获取外联样式，要是得到外联样式的话在IE中就应高用currentStyle得到样式，也可以用如上的方式把外联样式赋值给style，这样就能更加方便了。</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
' + this.description + '
<pre>输入的结果是：</pre>
<p>This is a 'animal' class!<br />
My name is:dog.--wang<br />
My name is:cat.--miao<br />
My sound is:wang wang!!!<br />
My sound is:miao miao!!!<br />
Name = dog; Age = 5<br />
Name = cat; Age = 3</p>
<p>&nbsp;</p>
<p>首先要理解js的prototype　属性：</p>
<p>prototype　最主要 的作用，就是当你new 多个对象的时候，prototype　里面的内容不会被多次创建，之创建一次，被多个对象公共使用，这在很大程度上节约了内存，优化了代码。</p>
<p>每个函数对象都具有一个子对象prototype，因为函数也可以表示类，所以prototype表示一个类的成员的集合。当new 一个对象时，prototype对象的成员都会被实例化成对象的成员。当new多个对象时不会重复创建。</p>
<p>&nbsp;</p>
<p>//但是在JS写类的时候注意几点：</p>
<p>&nbsp;</p>
<p>1、在类中不能有多个引用，那样的话JS是不能得到值的，例如：</p>
<p>function DivObj(ID){<br />
//得到Div对象<br />
this.ObjElement=document.getElementById(ID);<br />
//把当前的外联样式等赋值给界面Style<br />
this.GetStyle=function(){<br />
this.Style=this.NewStyle;<br />
};<br />
//界面样式<br />
this.Style=this.ObjElement.style<br />
//外联样式<br />
this.NewStyle=this.ObjElement.currentStyle;<br />
//外联样式的类名<br />
this.ElementClass=this.ObjElement.className;<br />
//改变外联样式类名<br />
this.ObjClass=function(ClassName){<br />
this.ObjElement.className=ClassName;<br />
};<br />
}</p>
<p>在类中，已经有对象ObjElement，得到的是DIV这个对象，你要是想得到它的width不能用this.ObjElement.style.width得到width，这样的话会报错，应该把this.ObjElement.style定义一个属性，然后再进行获取，如上，获取他的width为this.Style.width.</p>
<p>2、若是外联样式，也就是说用class从样式表中得到的样式，要是获取的话就不能用Style了，因为style是界面中的，不能获取外联样式，要是得到外联样式的话在IE中就应高用currentStyle得到样式，也可以用如上的方式把外联样式赋值给style，这样就能更加方便了。</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
 class!&lt;br&gt;');
}

//实例后对象方法
Animal.prototype = {
    sayName:function(str) {
                document.write('My name is:' + this.name + str + '&lt;br&gt;');
            },
    shout:function() {
              document.write('My sound is:' + this.sound + '!!!&lt;br&gt;');
          },
    sayInfo:function() {
                document.write('Name = ' + this.name + '; Age = ' + this.age + '&lt;br&gt;');
            }
};

//测试类
Animal.descript();
var dog = new Animal('dog', 'wang wang', 5);
var cat = new Animal('cat', 'miao miao', 3);
dog.sayName('.--wang');
cat.sayName('.--miao');
dog.shout();
cat.shout();
dog.sayInfo();
cat.sayInfo();</pre>
<pre>输入的结果是：</pre>
<p>This is a 'animal' class!<br />
My name is:dog.--wang<br />
My name is:cat.--miao<br />
My sound is:wang wang!!!<br />
My sound is:miao miao!!!<br />
Name = dog; Age = 5<br />
Name = cat; Age = 3</p>
<p>&nbsp;</p>
<p>首先要理解js的prototype　属性：</p>
<p>prototype　最主要 的作用，就是当你new 多个对象的时候，prototype　里面的内容不会被多次创建，之创建一次，被多个对象公共使用，这在很大程度上节约了内存，优化了代码。</p>
<p>每个函数对象都具有一个子对象prototype，因为函数也可以表示类，所以prototype表示一个类的成员的集合。当new 一个对象时，prototype对象的成员都会被实例化成对象的成员。当new多个对象时不会重复创建。</p>
<p>&nbsp;</p>
<p>//但是在JS写类的时候注意几点：</p>
<p>&nbsp;</p>
<p>1、在类中不能有多个引用，那样的话JS是不能得到值的，例如：</p>
<p>function DivObj(ID){<br />
//得到Div对象<br />
this.ObjElement=document.getElementById(ID);<br />
//把当前的外联样式等赋值给界面Style<br />
this.GetStyle=function(){<br />
this.Style=this.NewStyle;<br />
};<br />
//界面样式<br />
this.Style=this.ObjElement.style<br />
//外联样式<br />
this.NewStyle=this.ObjElement.currentStyle;<br />
//外联样式的类名<br />
this.ElementClass=this.ObjElement.className;<br />
//改变外联样式类名<br />
this.ObjClass=function(ClassName){<br />
this.ObjElement.className=ClassName;<br />
};<br />
}</p>
<p>在类中，已经有对象ObjElement，得到的是DIV这个对象，你要是想得到它的width不能用this.ObjElement.style.width得到width，这样的话会报错，应该把this.ObjElement.style定义一个属性，然后再进行获取，如上，获取他的width为this.Style.width.</p>
<p>2、若是外联样式，也就是说用class从样式表中得到的样式，要是获取的话就不能用Style了，因为style是界面中的，不能获取外联样式，要是得到外联样式的话在IE中就应高用currentStyle得到样式，也可以用如上的方式把外联样式赋值给style，这样就能更加方便了。</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

---
layout: post
title: JavaEE中servlet的构造函数和init方法的区别
header: Pages
categories: [java, 技术经验]
tags: [java]
---

{% include JB/setup %}

### 今天突然看见servlet的构造函数，于是就在网上找了些解释

疑问：构造函数用来初始化类，可是servlet初始化却是init方法，可servlet本质上也是java类，那它的构造方法和init函数到底是什么关系？

### 上网搜索了一下，得到以下结论

首先，构造函数是有的，虽然我们通常不写servlet的构造函数，但是就像任何一个普通的java类一样，编译器会自动给你生成一个默认构造函数；

其次，构造函数和init方法都会被web容器调用，而且是先调用构造函数，然后调用init方法

最后，貌似容器只会调用默认构造函数，所以如果你自己写了带参数的构造函数（系统就不会自动生成默认构造函数），容器初始化servlet就会出错……

__所以__ ：任何时候都不推荐自己写构造函数来初始化servlet类，哪怕你自己提供不带参数的构造函数……
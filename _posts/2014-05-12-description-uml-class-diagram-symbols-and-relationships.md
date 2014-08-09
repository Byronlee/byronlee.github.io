---
layout: post
title: UML类图符号与各种关系的说明以及举例
header: Pages
categories: [技术经验, UML]
tags: [UML]
---
{% include JB/setup %}

_[注]主要以java为例做讲解_

### UML中描述对象和类之间相互关系的方式对比说明：

* 依赖（Dependency）
  * 代表符号 ： ![](https://github.com/Byronlee/byronlee.github.io/blob/master/images/yinai_jian.png?raw=true)
  * 元素A的变化会影响元素B，但反之不成立，那么B和A的关系是依赖关系，B依赖A；类属关系和实现关系在语义上讲也是依赖关系，但由于其有更特殊的用途，所以被单独描述。uml中用带箭头的虚线表示Dependency关系，箭头指向被依赖元素
* 关联（Association）
  * 代表符号 ： ![](https://github.com/Byronlee/byronlee.github.io/blob/master/images/guanlian_jian_2.png?raw=true) 根据不同版本,有的带箭头: ![](https://github.com/Byronlee/byronlee.github.io/blob/master/images/guanlian_jian_1.png?raw=true)
  * 元素间的结构化关系，是一种弱关系，被关联的元素间通常可以被独立的考虑。uml中用实线表示Association关系，如果带箭头则箭头指向被依赖元素
* 聚合（Aggregation）
  * 代表符号 ： ![](https://github.com/Byronlee/byronlee.github.io/blob/master/images/zuhe_jian_2.png?raw=true) 根据不同版本,有的带箭头:
![](https://github.com/Byronlee/byronlee.github.io/blob/master/images/juhe_jian_1.png?raw=true)
  * 关联关系的一种特例，表示部分和整体（整体 has a 部分）的关系。UML中 uml中用带空心菱形头的实线表示，菱形头指向整体,如果带箭头,箭头指向部分
* 组合（Composition）
  * 代表符号 ： ![](https://github.com/Byronlee/byronlee.github.io/blob/master/images/zuhe_jian_1.png?raw=true) 根据不同版本,有的带箭头:
![](https://github.com/Byronlee/byronlee.github.io/blob/master/images/juhe_jian_2.png?raw=true)
  * 组合是聚合关系的变种，表示元素间更强的组合关系。如果是组合关系，如果整体被破坏则个体一定会被破坏，而聚合的个体则可能是被多个整体所共享的，不一定会随着某个整体的破坏而被破坏。uml中用带实心菱形头的实线表示Composition关系，菱形头指向整体,如果带箭头,箭头指向部分
* 泛化（Generalization）
  * 代表符号 ： ![](https://github.com/Byronlee/byronlee.github.io/blob/master/images/fanhua_jian.png?raw=true)
  * 通常所说的继承（特殊个体 is kind of 一般个体）关系，不必多解释了。uml中用带空心箭头的实线线表示Generalization关系，箭头指向一般个体
* 实现（Realization）
  * 代表符号 ： ![](https://github.com/Byronlee/byronlee.github.io/blob/master/images/shixian_jian.png?raw=true)
  * 元素A定义一个约定，元素B实现这个约定，则B和A的关系是Realize，B realize A。这个关系最常用于接口。uml中用空心箭头和虚线表示Realize关系，箭头指向定义约定的元素


**特点与联系**
_其中依赖（Dependency）的关系最弱，而关联（Association），聚合（Aggregation），组合（Composition）表示的关系依次增强。换言之关联，聚合，组合都是依赖关系的一种，聚合是表明对象之间的整体与部分关系的关联，而组合是表明整体与部分之间有相同生命周期关系的聚合。_

而关联与依赖的关系用一句话概括下来就是，依赖描述了对象之间的调用关系，而关联描述了对象之间的结构关系。

### 每种关系在具体代码中的体现以及UML图

1. 依赖（Dependency）:虚线箭头表示
  * 依赖关系是类与类之间的联结
  * 依赖总是单向的。（#add 注意，要避免双向依赖。一般来说，不应该存在双向依赖。）
  * 依赖关系在 Java 或 C++ 语言中体现为**局部变量**、**方法的参数** 或者对 **静态方法**的调用
  * 符号：虚线加箭头
  * uml图:
  * ![依赖关系UML图](http://pic002.cnblogs.com/images/2012/285763/2012061315032141.jpg)
  * 代码:
  * {% highlight java %}
     class Person{
        void buy(Car car){
          ...
     }
    }
    {% endhighlight %}

2. 关联（Association）：实线箭头表示
  * 关联关系是类与类之间的联结，它使一个类知道另一个类的属性和方法
  * 关联可以是双向的，也可以是单向的（#add还有自身关联）。双向的关联可以有两个箭头或者没有箭头，单向的关联有一个箭头
  * 在 Java 或 c++ 中，关联关系是通过使用**成员变量**来实现的
  * 符号：实线箭头
  * uml图:
  * ![关联关系UML图](http://pic002.cnblogs.com/images/2012/285763/2012061315034351.jpg)
  * 代码:
  * {% highlight java %}
    class 徒弟{
    };
    class 唐僧{
        protected: list<徒弟> tdlist;
    };
    {% endhighlight %}


3. 聚合（Aggregation）：带空心菱形头表示
  * 聚合关系是关联关系的一种，是强的关联关系
  * 聚合是整体和部分之间的关系，例如汽车由引擎、轮胎以及其它零件组成
  * 聚合关系也是通过成员变量来实现的。但是，关联关系所涉及的两个类处在同一个层次上，而聚合关系中，两个类处于不同的层次上，一个代表整体，一个代表部
  * 在 Java 或 c++ 中，关联关系是通过使用**成员变量**来实现的
  * 关联与聚合仅仅从 Java 或 C++ 语法上是无法分辨的，必须考察所涉及的类之间的逻辑关系
  * 符号：带空心菱形头
  * uml图:
  * ![聚合关系UML图](http://pic002.cnblogs.com/images/2012/285763/2012061315041541.jpg)
  * 代码:
  * {% highlight java %}
   class 引擎{
   };
   class 轮胎{
   };
   class 汽车{
     protected:引擎 engine;
     protected:轮胎 tyre[4];
   };
  {% endhighlight %}

4. 组合Composition）,有的叫合成：带实心菱形头的实线表示
  * 组合关系也是关联关系的一种，是比聚合关系还要强的关系
  * 它要求普通的聚合关系中 **整体与部分有着相同的生命周期**
  * 在 Java 或 c++ 中，关联关系是通过使用**成员变量**来实现的
  * **被组合部分一般在实例化整体对象的时候传入**
  * 符号：带实心菱形头的实线
  * uml图:
  * ![组合关系UML图](http://pic002.cnblogs.com/images/2012/285763/2012061315044438.jpg)
  * 代码:
  * {% highlight java %}
   class 肢{
   };
   class 人{
     protected:  肢   limb[4];
   };
  {% endhighlight %}

5. 泛化（Generalization）：带空心箭头的实线线表示
  * 表示类与类之间的继承关系
  * 表示一个被泛化的元素和一个更具体的元素之间的关系
  * 在Java中，用extends关键字来直接表示这种关系
  * 符号：带空心箭头的实线表示
  * uml图:
  * ![泛化关系UML图](https://github.com/Byronlee/byronlee.github.io/blob/master/images/fanhua_uml.jpg?raw=true)
  * 代码:
  * {% highlight java %}
  public class shape{
   }
  public class rectangle extends shape {
  }
  public class circle extends  shape{
  }
  {% endhighlight %}

6. 实现（Realization）：空心箭头和虚线表示
  * 两个实体之间的一个合同
  * 换言之，一个实体定义一个合同，而另一个实体保证履行该合同
  * 对Java应用程序进行建模时，实现关系可直接用implements关键字来表示
  * 符号：空心箭头和虚线表示
  * uml图:
  * ![实现关系UML图](https://github.com/Byronlee/byronlee.github.io/blob/master/images/shixian_uml.jpg?raw=true)
  * 代码:
  * {% highlight java %}
   interface animal{
   }
  public class cat implements animal {
  }
  public class dog implements  animal{
  }
  {% endhighlight %}

### 借鉴一张大图来全面表示他们之间的关系


![全图](http://www.yongfa365.com/UploadFiles/image/2010-10-24/%E5%A4%A7%E8%AF%9D%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E7%B1%BB%E5%9B%BE.PNG)

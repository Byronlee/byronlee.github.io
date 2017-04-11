---
layout: post
title: 对ruby中的class 《 object以及class_eval和instance_eval的探讨
header: Pages
categories: [技术经验, Ruby]
tags: [Ruby, 元编程]
---
{% include JB/setup %}

## 他们主要特点

* class 《 object : 给当前对象object(可能是类本身,或者实例对象)添加 singleton_method
* object.instance_eval : 给当前对象object(可能是类本身,或者实例对象)添加 singleton_method 与class 《 object相似
* Object.class_eval : 相当于(但实事不是)打开当前Object(只能是类) 给他添加 __实例方法__,具体原理看下面分析

## 他们具体的区别

### class 《 object

__object 可能是类本身,或者实例对象__

* object 是一个实例对象,则添加的方法只对该实例对象生效
* {% highlight ruby%}
  a = Array.new
  class 《 a
     def size
        puts super
        "Hello,World"
     end
  end
  puts a.size =======>
  0
  "Hello,World"
  # 另一个实例对象无效
  b = Array.new
  puts b.size =========>
  0
  {% endhighlight %}

* object 是一个类,则可以理解为给该类添加了一个类方法
* {% highlight ruby%}
  1.9.3-p374 :025 > class A
  1.9.3-p374 :026?>   end
   => nil
  1.9.3-p374 :027 > class 《 A
  1.9.3-p374 :028?>   def f
  1.9.3-p374 :029?>     p "2"
  1.9.3-p374 :030?>     end
  1.9.3-p374 :031?>   end
   => nil
  1.9.3-p374 :032 > A.f
  "2"
   => "2"
  1.9.3-p374 :033 > A.new.f
  NoMethodError: undefined method `f' for #<A:0x00000002db3790>
  {% endhighlight %}

### object.instance_eval

首先从名字可以得到的信息是，instance_eval的调用者receiver必须是一个实例instance，而在instance_eval block的内部，self即为receiver实例本身
同样，因为类class本身也是Class类的一个实例，instance_eval也可以用在类上，这个时候就可以在其中定义该类的singleton_method，即为该类的类方法
所以object 可能是类本身,或者实例对象

* object 是一个实例对象,则添加的方法只对该实例对象生效
*  {% highlight ruby%}
  1.9.3-p374 :044 > class A
  1.9.3-p374 :045?>   end
   => nil
  1.9.3-p374 :046 >  a = A.new
   => #<A:0x00000002defdf8>
  1.9.3-p374 :047 > a.instance_eval do
  1.9.3-p374 :048 >     def c
  1.9.3-p374 :049?>     p "2"
  1.9.3-p374 :050?>     end
  1.9.3-p374 :051?>   end
   => nil
  1.9.3-p374 :052 > A.c
  NoMethodError: undefined method `c' for #<A:0x00000002db3790>
  1.9.3-p374 :054 > d = A.new
   => #<A:0x00000002e0eb40>
 1.9.3-p374 :055 > d.c
  NoMethodError: undefined method `c' for #<A:0x00000002e0eb40>
  1.9.3-p374 :053 > a.c
  "2"
   => "2"

  {% endhighlight %}
* object 是一个类,则可以理解为给该类添加了一个类方法

*  {% highlight ruby%}
  1.9.3-p374 :035 > class A
  1.9.3-p374 :036?>   end
   => nil
  1.9.3-p374 :037 > A.instance_eval do
  1.9.3-p374 :038 >     def u
  1.9.3-p374 :039?>      p "2"
  1.9.3-p374 :040?>     end
  1.9.3-p374 :041?>   end
   => nil
  1.9.3-p374 :042 > A.u
  "2"
   => "2"
  1.9.3-p374 :043 > A.new.u
  NoMethodError: undefined method `u' for #<A:0x00000002de15a0>
{% endhighlight %}

所以
假如我像下面这样定义:

{% highlight ruby%}
  Array.instance_eval do
    def hint
     "hello"
    end
  end
{% endhighlight %}
本质上相当于这样的代码:

{% highlight ruby%}
  class Array
    def self.hint
      "hello"
    end
  end

  #同时,也可以是这样
  class Array
  end

  def Array.hint
     "hell0"
  end

  #当然,也可以是这样
  class Array
    class 《 self
      def hint
        "hello"
      end
    end
  end
{% endhighlight %}

###class_eval

class_module是从Module中得到的，所以class_module的接受者必须是个类 换句话说class_eval的调用者receiver必须是一个类，而在class_eval block的内部，self即为receiver类本身。
我们知道在混合编程(mix)中，include 某个Module时，该Module的所有实例方法只能由子类的实例所调用（相当于多了继承于Module），故class_eval定义之后，只能是Array的所有的实例调用，Array自己调用会出错（肯定的，假如Array自己调用不出错的话，这个方法就是静态方法了）
所以 Object.class_eval 实质就是给当前这个类添加了  __实例方法__

{% highlight ruby%}
class A
end

a = A.new
a.method1
#=> NoMethodError: undefined method `method1' for #<A:0x10043ff70>

A.class_eval do
  self  # => A
  # current class => A
  def method1
    puts 'this is a instance method of class A'
  end
end

a.method1
#=> this is a instance method of class A

A.method1
#=> NoMethodError: undefined method `method1' for A:Class

{% endhighlight %}
### 总结

* class 《 object : 其实就是操作的object eigenclass
* object.instance_eval : 其实就是操作的object eigenclass
* Object.class_eval : 其实修改的是Object的类体

---
layout: post
title: 聊聊ruby中的block, proc和lambda,深入学习
header: Pages
categories: [Ruby, 技术经验]
tags: [ruby, lamdba, proc]
---

{% include JB/setup %}

### 在ruby-china　看见这样一篇文章, 此文为转载

做为热身，从一些简单的例子开始

{% highlight ruby %}
def f1
  yield
end

def f2(&p)
  p.call
end

def f3(p)
  p.call
end

f1 { puts "f1" }

f2 { puts "f2" }

f3(proc{ puts "f3"})

f3(Proc.new{puts "f3"})

f3(lambda{puts "f3"})
{% endhighlight %}

若你用的是ruby1.9及以上的版本，还可以这样

{% highlight ruby %}
f3(-> {puts "f3"})
{% endhighlight %}

上面是block, proc和lambda的一些基本用法。

### block

先说说block, ruby中的block是方法的一个重要但非必要的组成部分，我们可以认为方法的完整定义类似于，

{% highlight ruby %}
def f(零个或多个参数, &p)
  ...
end
{% endhighlight %}

注意&p不是参数，&p类似于一种声明，当方法后面有block时，会将block捕捉起来存放到变量p中，如果方法后面没有block，那么&p什么也不干。

{% highlight ruby %}
def f(&p)
end

f(1)  #=> 会抛出ArgumentError: wrong number of arguments (1 for 0)异常

f()  #=> 没有异常抛出

f() { puts "f"} #=> 没有异常抛出
{% endhighlight %}

从上面代码的运行结果可以知道&p不是参数

{% highlight ruby %}
def f(a)
  puts a
end

f(1) { puts 2}  #=> 没有异常抛出，输出1
{% endhighlight %}

所以任何方法后面都可以挂载一个block，如果你定义的方法想使用block做点事情，那么你需要使用yield关键字或者&p

{% highlight ruby %}
def f1
  yield
end

def f2(&p)
  p.call
end
{% endhighlight %}

此时f1, f2执行时后面必须挂一个block，否则会抛出异常，f1抛出`LocalJumpError: no block given (yield)`的异常,f2抛出`NoMethodError: undefined method ‘call’ for nil:NilClass`的异常, ruby提供了block_given?方法来判断方法后面是否挂了block，于是我们可以这样修改f1和f2，

{% highlight ruby %}
def f1
 yield if block_given?
end

def f2(&p)
  p.call if block_given?
end
{% endhighlight %}

这样的话,f1和f2后面无论挂不挂block都不会抛异常了。

我们再来看看f2修改前抛出的`NoMethodError: undefined method ‘call’ for nil:NilClass`异常，这种说明当f2后面没有挂block的时候p是nil，那么我们给f2挂个block，再打印出p，看看p究竟是什么，

{% highlight ruby %}
def f2(&p)
  puts p.class
  puts p.inspect
  p.call
end

f2 {} # 输出Proc和类似<Proc:0x007fdc72829780@(irb):21>
{% endhighlight %}

这说明p是一个Proc实例对象，在ruby中，&还可以这么用，`[1,2] & [2,3]` 或者 `puts true if 1 && 1` 或者在某个类中将它作为一个方法名。

很多ruby老鸟会写类似下面的代码,

{% highlight ruby %}
["1", "2", "3"].map(&:to_i)
{% endhighlight %}

其效果和`["1", "2", "3"].map {|i| i.to_i }`一样, 但简洁了许多，并且更加拉风

这里的魔法在于符号&会触发`:to_i`的`to_proc`方法, to_proc执行后会返回一个proc实例， 然后&会把这个proc实例转换成一个block,我们需要要明白map方法后挂的是一个block，而不是接收一个proc对象做为参数。`&:to_i`是一个block，block不能独立存在，同时你也没有办法直接存储或传递它，必须把block挂在某个方法后面。

`:to_i`是 Symbol 类的实例, Symbol 中的to_proc方法的实现类似于，

{% highlight ruby %}
class Symbol
  def to_proc
    Proc.new {|obj| obj.send(self) }
  end
end
{% endhighlight %}


同理我们可以给自己写的类定义to_proc方法,然后使用&耍下酷，比如，

{% highlight ruby %}
class AddBy

  def initialize(num = 0)
    @num = num
  end

  def to_proc
    Proc.new {|obj| obj.send('+', @num)}
  end

end

add_by_9 = AddBy.new(9)
puts [1,2,3].map(&add_by_9) #输出 [10, 11, 12]
{% endhighlight %}

在ruby中, block有形,它有时候是这样

{% highlight ruby %}
 do |...|
   ...
 end
{% endhighlight %}

有时候是这样

{% highlight ruby %}
{|...| ...}
{% endhighlight %}

或者类似` &p, &:to_i, &add_by_9`之类，但是它无体，无体的意思就是说block无法单独存在，必须挂在方法后面，并且你没有办法直接把它存到变量里，也没有办法直接将它作为参数传递给方法，所以当你想存储，传递block时，你可以使用proc对象了，

{% highlight ruby %}
 p = Proc.new(&:to_i)
 p = Proc.new {|obj| obj.to_i }
 p = Proc.new do |obj|
   obj.to_i
 end
 p = proc(&:to_i)
 p = proc {|obj| obj.to_i}
 p = proc do |obj|
   obj.to_i
 end

def make_proc(&p)
  p
end

p = make_proc(&:to_i)
p = make_proc do |obj|
  obj.to_i
end
p = make_proc {|obj| obj.to_i }
{% endhighlight %}

虽然我在开发中经常用到block，但是我很少显式地去使用Proc或proc去实例化block，比如我几乎没有写过这样的代码,

{% highlight ruby %}
  f(Proc.new {|...| ...})

  f(proc {|...| ...})

  p =  Proc.new {|...| ...} #然后在某个地方p.call(...)或者将p传递给某个方法，比如f(p)
{% endhighlight %}

在使用block时，我会忽略proc的存在，我将proc定位为一个幕后的工作者。我经常写类似下面的代码，

{% highlight ruby %}
  def f(...)
    ...
    yield
    ...
  end

  def f(..., &p)
    ...
    p.call
    ...
  end

  def f(..., &p)
    instance_eval &p
    ...
  end

  def f(..., &p)
    ...
    defime_method m, &p
    ...
  end
{% endhighlight %}

有些新手会写类似下面的一执行就会报错的代码

{% highlight ruby %}
  def f(..., &p)
    instance_eval p
  end

  def f(..., p)
    instance_eval p.call
  end
{% endhighlight %}

也有这样写的,

{% highlight ruby %}
  def f(..., &p)
    instance_eval do
      p.call
    end
  end
{% endhighlight %}

或者

{% highlight ruby %}
 def f(...)
    instance_eval do
      yield
    end
  end
{% endhighlight %}


我甚至写过类似下面的代码，

{% highlight ruby %}
  def f(...)
    instance_eval yield
  end
{% endhighlight %}

我们经常在该挂block的时候，却把proc对象当参数传给方法了， 或者不明白&p就是block可以直接交给方法使用，我曾经也犯过这样的错误就是因为没有把block和proc正确的区分开来, &p是block, p是proc，不到万不得已的情况下不要显式地创建proc，每当我对block和proc之间的关系犯糊涂时，我就会念上几句。

### 再来聊聊yield和&p，我们经常这样定义方法，

{% highlight ruby %}
 def f(...)
    yield(...)
  end

  def f(..., &p)
    p.call(...)
  end
{% endhighlight %}

yield和call后面都可以接参数，如果你是这样定义方法

{% highlight ruby %}
   def f(...)
     yield 1, 2
   end
{% endhighlight %}


那么可以这样执行代码,

{% highlight ruby %}
   f(...) do |i, j|
     puts i
     puts j
   end
{% endhighlight %}

但是这样做也不会有错,

{% highlight ruby %}
  f(...) do
    ...
  end
{% endhighlight %}

p.call(…)的情况类似, 也就是说block和proc都不检查参数(其实通过proc方法创建的proc在1.8是严格检查参数的，但是在1.9及以上的版本是不检查参数的)，为什么block和proc不检查参数呢?其实这个很好理解，因为在实际应用中你可能需要在一个方法中多次调用block或者proc并且给的参数个数不一样，比如,

{% highlight ruby %}
  def f()
    yield 0
    yield 1, 2
  end

  def ff(&p)
    p.call 0
    p.call 1, 2, 3
  end

  f do |a1, a2, a3|
    puts a1
    puts a2
     puts a3
  end
{% endhighlight %}

由于方法后面只能挂一个block，所以要实现上面的代码功能，就不能去严格检查参数了。

转入正题，这两种方式效果差不多，都能很好地利用block。使用yield，看起来简洁，使用&p，看起来直观，并且你可以将&p传给其他方法使用。
但是在 ruby1.8 的版本你不应像下面这样做,

{% highlight ruby %}
  def f1(...)
    eval("yield")
  end
{% endhighlight %}

可以

{% highlight ruby %}
 def f2(..., &p)
    eval("p.call")
  end
f1(...) {}  # 会抛异常
f2(...) {}  # 正常运行
{% endhighlight %}

当然上面这种用法很少见，但是却被我碰到了，我经常写一些方法去请求外部的api，有时这些外部的api不是特别稳定，时不时会遇到一些bad respoense, timeout错误，针对这些错误，应该立即重发报文重试，对于其他异常就直接抛异常。于是我写了一个try方法来满足这个需求，


{% highlight ruby %}
  def try(title, options = { }, &p)
    tried_times = 0
    max_times = options[:max_times] || 3
    exceptions = options[:on] || Exception
    exceptions = [exceptions] if !exceptions.is_a?(Array)
    rescue_text = <<-EOF
      begin
        p.call
      rescue #{exceptions.join(',')} => e
        Rails.logger.info("#{title}发生异常#{e}")
        if (tried_times += 1) < max_times
          Rails.logger.info("开始重试#{title}--第#{tried_times}次重试")
          retry
        end
        raise e
      end
    EOF
    eval rescue_text
  end

try('某某api', :max_times => 2, :on => [Net::HTTPBadResponse, Timeout::Error]) do
  open(api_url)
end
{% endhighlight %}

最开始我用的是yield，结果在 ree 下执行try方法时会报错，后来改成使用&p就通过了。

通过试验发现在 ruby1.9 及以上版本已经没有这种差异了。

做个小结, block和proc是两种不同的东西, block有形无体，proc可以将block实体化, 可以把&p看做一种运算，其中&触发p的to_proc方法，然后&会将to_proc方法返回的proc对象转换成block 。

其中proc对象的to_proc方法返回自身。

{% highlight ruby %}
  p = proc {}
  p.equal? p.to_proc  # 返回true
{% endhighlight %}

### lambda

lambda是匿名方法, lambda和proc也是两种不同的东西，但是在ruby中lambda只能依附proc而存在，这点和block不同，block并不依赖proc。

{% highlight ruby %}
  l = lambda {}
  puts l.class
{% endhighlight %}

在 ruby1.8 中输出的信息类似`#Proc:0x0000000000000000irb)`

在 ruby1.9 及以上版本输出的信息类似`#Proc:0x007f85548109d0irb):1(lambda)@(`

注意 1.9 及以上版本的输出多了 (lambda)，从这里可以理解ruby的设计者们确实在有意的区分lambda和proc，并不想把lambda和proc混在一起,如同ruby中没有叫Block的类，除非你自己定义一个，ruby中也没有叫Lambda的类

于是将lambda对象化的活儿就交给了Proc，于是令人头大的情况出现了，当你用lambda弄出了一个匿名方法时，发现它是一个proc对象，并且这个匿名方法能干的活，proc对象都能做，于是我们这些码农不淡定了，Proc.new {}这样可以,proc {}这样也没有问题, lambda {}这样做也不错, ->{}这个还是能行

我平时吃个饭都为吃什么左右为难，现在一下子多出了四种差不多的方案来实现同一件事情，确实让人不好选择，特别是有些码农还有点小洁癖，如果在代码里一会儿看到proc{}, 一会儿看到lambda{},这多不整洁啊，让人心情不畅快。在这里我们认定lambda 或者 -> 弄出的就是一个匿名方法，记做 l, 即使它披着proc的外衣，proc或者Proc.new创建的就是一个proc对象,记做 p 在ruby各个版本中, l 和 p 是有一些差别的。

定义一些方法，


{% highlight ruby %}
def f0()
  p = Proc.new {return 0}
  p.call
  1
end

def f1()
  p = proc { return 0 }
  p.call
  1
end

def f2()
  l = lambda { return 0}
  l.call
  1
end

def f3(p)
  instance_eval &p
  1
end

class A
end

def f4(p)
  A.class_eval &p
  1
end

p1 = Proc.new { }
p2 = proc {}
l  = lambda {}

def f5()
  yield 1, 2
end

f5 {}
f5 {|i|}
f5 {|i,j|}
f5 {|i,j,k|}
{% endhighlight %}

lambda和proc之间的区别除了那个经常用做面试题目的经典的return之外，还有一个区别就是lambda不能完美的转换为block(这点可以通过f3和f4执行的过程得证)，而proc可以完美的转换为block,注意，我说的lambda指的是用lambda方法或者->符号生成的proc，当然和方法一样lambda是严格检查参数的，这个特点也和proc不一样。

从上面的数据对比来看，在1.8版本，lambda和proc方法生成的proc对象的行为是一致的，但在1.9以上和jruby的版本中,lambda和proc的不同处增多，可以认为ruby的设计者们并不想把lambda和proc混同为一件事物。如我前面所讲，proc的主要作用是对象化block和lambda，并且proc在行为上更接近于block。

retrun的几个试验

{% highlight ruby %}
def f0()
  p = Proc.new { return 0}
  p.call
  1
end

def f1()
  l = lambda { return 0}
  l.call
  1
end

f0 # 返回0
f1 # 返回1
{% endhighlight %}

如果你能够理解proc在行为上更像block，lambda其实就是方法只不过是匿名的，那么你对上面的结果不会感到惊讶。

如果把f0,f1做一些修改，就更容易理解上面的结果了。

{% highlight ruby %}
def f0()
  return 0
  1
end

def f1()
  def __f1
    return 0
  end
  __f1
  1
end

f0 # 返回0
f1 # 返回1
return只能在方法体里执行，

p = Proc.new { return 0 }
l = lambda { return 0 }

p.call # 报LocalJumpError
l.call # 返回0
{% endhighlight %}

构造p的时候我没有使用proc {return 0}，因为在 ruby1.8 中, proc {return 0}的行为和lambda一样，比如在ruby1.8 中，

{% highlight ruby %}
def f(p)
  p.call
  1
end

p = proc { return 0 }
l = lambda { return 0 }

f(p)  # 返回1
f(l)  # 返回1

p.call # 返回0
l.call # 返回0

def f(p)
  p.call
  1
end

p = Proc.new { return 0 }
l = lambda.new { return 0}

f(p)  # 报LocalJumpError
f(l)  # 返回1
{% endhighlight %}

我感觉proc中的return能记住proc生成时其block的位置，然后无论proc在哪里调用，都会从proc生成时其block所在位置处开始return，有下面的代码为证:

{% highlight ruby %}
def f(p)
  p.call
  1
end

def f2()
  Proc.new { return 0 }
end

def f3()
  lambda { return 0 }
end

p = f2()
l = f3()

f(p)  # 报LocalJumpError: unexpected return，from (irb):29:in `f2'
f(l)  # 返回1
{% endhighlight %}

我在1.8, ree, jruby, 1.9, 2.0各版本都测试过，结果一样。

再看看下面的代码,

{% highlight ruby %}
def f0(&p)
  p.call
  1
end

def f1()
  yield
  1
end

f0 { return 0}  # LocalJumpErrorw
f1 { return 0}  # LocalJumpErrorw

f0(&Proc.new{return 0}) # LocalJumpError
f0(&lambda{return 0})   # 返回1

def f2(&p)
  p
end

def f3()
  p = f2 do
    return 0
  end
  p.call
  1
end

f3 # 返回0
{% endhighlight %}

我们重点看看f3中的proc p，它虽然是从f2中生成返回的，但是p生成时其block是处在在f3的方法体内，这个类似于，

{% highlight ruby %}
def f3()
  p = Proc.new { return 0}
  p.call
  1
end
{% endhighlight %}

所以执行f3时，没有异常抛出，返回0。

### 总结

当你想写出类似于`f do …; end` 或者 `f {…}` 的代码时，请直接使用block,通过yield, &p就能达到目的，当你想使用proc时，其实此时绝大部分的情况是你实际想用lambda,请直接使用lambda{}或者->{}就可以了，

尽量不要显示地使用`Proc.new{}` 或者 proc{}去创建proc。

废话说了一大堆，其实我最想说的是: 用block，用lambda，不要用proc，让proc做好自己的幕后工作就好了

### 原文链接：http://ruby-china.org/topics/10414
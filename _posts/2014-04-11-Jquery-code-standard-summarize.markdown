---
layout: post
title: jQuery代码学习规范总结
header: Pages
categories: [技术经验, jQuery]
tags: [jQuery, 代码规范]
---
{% include JB/setup %}

### 提纲

* 如何开始Jquery代码
* 如果为Jquery开发插件
* 注意事项

### 如何开始Jquery代码

我们常看见的代码的都开始如下：

{% highlight js%}
(function($){
  ...
})(jQuery)
{% endhighlight %}

实际上是匿名函数，不懂得朋友可以继续往下看

这里实际上是匿名函数 

{% highlight js%}
function(arg){...}
{% endhighlight %}

这就定义了一个匿名函数，参数为arg 

而调用函数时，是在函数后面写上括号和实参的，由于操作符的优先级，函数本身也需要用括号，即：

{% highlight js %}
(function(arg){...})(param)
{% endhighlight %}

这就相当于定义了一个参数为arg的匿名函数，并且将param作为参数来调用这个匿名函数 

而`(function($){...})(jQuery)`则是一样的，之所以只在形参使用$，是为了不与其他库冲突，所以实参用jQuery

上面的代码与下面一样：
{% highlight js %}
var fn = function($){....}; 
fn(jQuery); 
{% endhighlight %}

这样写的好处在于：

* 防止你在应用多个Jquery库的时候，各个库对$符号的定义不一样，这样可以有效的防止冲突
* 将自己的Js代码放置在特定的作用域下，避免全局变量的混乱，引起不必要的麻烦

### 如果为Jquery开发插件

__首先来解读一个方法：extend__

Jquery的扩展方法extend是我们在写插件的过程中常用的方法，该方法有一些重载原型，在此，我们一起去了解了解。

__Jquery的扩展方法原型是:__　　　
{% highlight js %}
 extend(dest,src1,src2,src3...);
{% endhighlight %}

它的含义是将src1,src2,src3...合并到dest中,返回值为合并后的dest,由此可以看出该方法合并后，是修改了dest的结构的。如果想要得到合并的结果却又不想修改dest的结构，可以如下使用：
{% highlight js %}
  var newSrc=$.extend({},src1,src2,src3...)//也就是将"{}"作为dest参数。
{% endhighlight %}

这样就可以将src1,src2,src3...进行合并，然后将合并结果返回给newSrc了。如下例：
{% highlight js %}
var result=$.extend({},{name:"Tom",age:21},{name:"Jerry",sex:"Boy"})
{% endhighlight %}

那么合并后的结果
{% highlight js %}
result={name:"Jerry",age:21,sex:"Boy"}
{% endhighlight %}

也就是说后面的参数如果和前面的参数存在相同的名称，那么后面的会覆盖前面的参数值。

__省略dest参数__

上述的extend方法原型中的dest参数是可以省略的，如果省略了，则该方法就只能有一个src参数，而且是将该src合并到调用extend方法的对象中去，如：
{% highlight js %}
 $.extend(src)
{% endhighlight %}

该方法就是将src合并到jquery的全局对象中去，如：
{% highlight js %}
 $.extend({
     hello:function(){alert('hello');}
  });
{% endhighlight %}

就是将hello方法合并到jquery的全局对象中。

_[注意]_ ```$.fn.extend(src)```　该方法将src合并到jquery的实例对象中去，如:

{% highlight js %}
 $.fn.extend({
    hello:function(){alert('hello');}
 });
{% endhighlight %}

就是将hello方法合并到jquery的实例对象中。

下面例举几个常用的扩展实例：
{% highlight js %}
  $.extend({net:{}});
{% endhighlight %}

这是在jquery全局对象中扩展一个net命名空间。
{% highlight js %}
  $.extend($.net,{
   hello:function(){alert('hello');}
  })
{% endhighlight %}

这是将hello方法扩展到之前扩展的Jquery的net命名空间中去。

__Jquery的extend方法还有一个重载原型：__
{% highlight js %}
extend(boolean,dest,src1,src2,src3...)
{% endhighlight %}

第一个参数boolean代表是否进行深度拷贝，其余参数和前面介绍的一致，什么叫深层拷贝，我们看一个例子：
{% highlight js %}
var result=$.extend( true,  {},  
    { name: "John", location: {city: "Boston",county:"USA"} },  
    { last: "Resig", location: {state: "MA",county:"China"} } ); 
{% endhighlight %}
我们可以看出src1中嵌套子对象```location:{city:"Boston"},src2```中也嵌套子对象```location:{state:"MA"}```,第一个深度拷贝参数为true，那么合并后的结果就是： 
{% highlight js %}
result={name:"John",last:"Resig",
        location:{city:"Boston",state:"MA",county:"China"}}
{% endhighlight %}
也就是说它会将src中的嵌套子对象也进行合并，而如果第一个参数boolean为false，我们看看合并的结果是什么，如下：
{% highlight js %}
var result=$.extend( false, {},  
   { name: "John", location:{city: "Boston",county:"USA"} },  
   { last: "Resig", location: {state: "MA",county:"China"} }  
  );
{% endhighlight %}
那么合并后的结果就是:
{% highlight js %}
result={name:"John",last:"Resig",location:{state:"MA",county:"China"}}
{% endhighlight %}
以上就是$.extend()在项目中经常会使用到的一些细节。

#### jQuery为开发插件提拱了两个方法，分别是：

* ```jQuery.fn.extend(object);```
* ```jQuery.extend(object);```

其中,通过上面所了解，可以知道：
 
* jQuery.extend(object); 为扩展jQuery类本身.为类添加新的方法。

* jQuery.fn.extend(object); 给jQuery对象添加方法。

fn 是什么东西呢。查看jQuery代码，就不难发现。
{% highlight js %}
jQuery.fn = jQuery.prototype = {
  init: function( selector, context ) {//....　
  //......
};
{% endhighlight %}

原来 ```jQuery.fn = jQuery.prototype.```对prototype肯定不会陌生啦。

虽然 javascript　没有明确的类的概念，但是用类来理解它，会更方便。

jQuery便是一个封装得非常好的类，比如我们用 语句　$("#btn1") 会生成一个 jQuery类的实例。

jQuery.extend(object);　为jQuery类添加添加类方法，可以理解为添加静态方法。如：
{% highlight js %}
$.extend({

　　add:function(a,b){return a+b;}

});
{% endhighlight %}
便为　jQuery　添加一个为 add　的　“静态方法”，之后便可以在引入 jQuery　的地方，使用这个方法了，
{% highlight js %}
$.add(3,4); //return 7
{% endhighlight %}

```jQuery.fn.extend(object); 对jQuery.prototype```进得扩展，就是为jQuery类添加“成员函数”。jQuery类的实例可以使用这个“成员函数”。

比如我们要开发一个插件，做一个特殊的编辑框，当它被点击时，便alert 当前编辑框里的内容。可以这么做：

{% highlight js %}
$.fn.extend({        
        
   alertWhileClick:function(){        
       
       $(this).click(function(){        
       
            alert($(this).val());        
        });        
        
    }        
        
});        
        
$("#input1").alertWhileClick(); //页面上为：<input id="input1" type="text"/>    
{% endhighlight %}

$("#input1")　为一个jQuery实例，当它调用成员方法 alertWhileClick后，便实现了扩展，每次被点击时它会先弹出目前编辑里的内容。

真实的开发过程中，当然不会做这么小白的插件，事实上jQuery提拱了丰富的操作文档，事件，CSS ,Ajax、效果的方法，结合这些方法，便可以开发出更加 Niubility 的插件。

### 注意事项

* ```jQuery(function(){ }); ```全写为
  * {% highlight js %}
    jQuery(document).ready(function(){ 
  });
  {% endhighlight %}
    * 意义为在DOM加载完毕后执行了ready()方法。
* jQuery(function(){　});用于存放操作DOM对象的代码，执行其中代码时DOM对象已存在。不可用于存放开发插件的代码，因为jQuery对象没有得到传递，外部通过jQuery.method也调用不了其中的方法（函数）。
* (function(){　})(jQuery)；用于存放开发插件的代码，执行其中代码时DOM不一定存在，所以直接自动执行DOM操作的代码请小心使用。


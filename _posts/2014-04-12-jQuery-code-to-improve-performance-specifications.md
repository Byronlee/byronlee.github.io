---
layout: post
title: jQuery提升性能的代码规范
header: Pages
---
{% include JB/setup %}

### 提纲

* 总是从#id继承
* Class前加tag名
* 缓存jQuery对象
* 善于使用jQuery连缀的写法
* 使用子查询
* 尽量减少直接 操作(Manipulation)DOM
* 使用时间委托(别名.冒泡)
* 消除无用的查询
* 延迟加载到 $(window).load

### 总是从#id继承

jQuery最快的选择器是ID ($('#someid')). 因为直接对应JavaScript方法, getElementById().

看看class是怎么选的 ($('sometag.someclass')).
{% highlight js%}
function getElementsByClassName(n) {
    var el = [],
        _el = document.getElementsByTagName('*');
    for (var i=0; i<_el.length; i++ ) {
        if (_el[i].className == n ) {
            el[el.length] = _el[i];
        }
    }
    return el;
}
{% endhighlight %}

比如我们要选择单个元素如，选择一个button,我们html代码：

{% highlight html%}
<div id="content">
    <form method="post" action="/">
        <h2>Traffic Light</h2>
        <ul id="traffic_light">
            <li><input type="radio" class="on" name="light" value="red" /> Red</li>
            <li><input type="radio" class="off" name="light" value="yellow" /> Yellow</li>
            <li><input type="radio" class="off" name="light" value="green" /> Green</li>
        </ul>

        <input class="button" id="traffic_button" type="submit" value="Go" />
    </form>
</div>
{% endhighlight %}

慢的写法:
{% highlight js%}
var traffic_button = $('#content .button');
{% endhighlight %}
直接选中按钮更快:
{% highlight js%}
var traffic_button = $('#traffic_button');
{% endhighlight %}

再比如我们要选择多个元素：

多个元素的选择，就是DOM的遍历和循环，这种实现方式比较慢。为了优化性能，__应该总是从最近的带ID的父元素继承__:
{% highlight js%}
var traffic_lights = $('#traffic_light input');
{% endhighlight %}

### Class前加tag名

jQuery中第二快的是tag选择器 ($('head')).同样，也是对应一个纯粹的JS方法， getElementsByTagName()

例如我们的html代码：
{% highlight html%}
<div id="content">

    <form method="post" action="/">
        <h2>Traffic Light</h2>
        <ul id="traffic_light">
            <li><input type="radio" class="on" name="light" value="red" /> Red</li>

            <li><input type="radio" class="off" name="light" value="yellow" /> Yellow</li>
            <li><input type="radio" class="off" name="light" value="green" /> Green</li>
        </ul>

        <input class="button" id="traffic_button" type="submit" value="Go" />
    </form>
</div>
{% endhighlight %}

应该在class前都加上tag(最好继承自一个ID):
{% highlight js%}
var active_light = $('#traffic_light input.on');
{% endhighlight %}

__[Note]__: class选择器是jQuery中效率最低的选择器；在IE下他遍历整个DOM. 尽各种可能避免这么写. 绝不能在ID前加tag名。

如下，因为它会先遍历所有的<div> 元素，匹配id为‘content’ :

{% highlight js%}
var content = $('div#content');
{% endhighlight %}

同样，多个id继承是很冗余的做法:
{% highlight js%}
var traffic_light = $('#content #traffic_light');
{% endhighlight %}

### 缓存jQuery对象

养成使用变量保存jQuery对象的习惯，如下:

{% highlight js%}
$('#traffic_light input.on).bind('click', function(){...});
$('#traffic_light input.on).css('border', '3px dashed yellow');
$('#traffic_light input.on).css('background-color', 'orange');
$('#traffic_light input.on).fadeIn('slow');
{% endhighlight %}

应该是, 先用局部变量保存对象，再进行其他操作:

{% highlight js%}
var $active_light = $('#traffic_light input.on');
$active_light.bind('click', function(){...});
$active_light.css('border', '3px dashed yellow');
$active_light.css('background-color', 'orange');
$active_light.fadeIn('slow');
{% endhighlight %}

__Tip__: 既然我们使用的是jQuery库，通常使用$作为标志，变量以$开头。 记住, 绝不使用同样的jQuery选择器 超过一次


__如果你想再程序的其他地方使用jQuery的结果，或者函数不止一次执行，缓存到一个全局范围的对象中__

通过定义一个全局变量，可以在其他函数中调用它:

{% highlight js%}
//定义一个全局变量 (比如 window 对象)
window.$my =
{
    // 初始化多次使用的条件
    head : $('head'),
    traffic_light : $('#traffic_light'),
    traffic_button : $('#traffic_button')
};

function do_something()
{
    // 在这里引用保存的变量
    var script = document.createElement('script');
    $my.head.append(script);

    // 函数中，可以继续添加全局的jQuery变量
    $my.cool_results = $('#some_ul li');
    $my.other_results = $('#some_table td');

    // 仍然可以使用jQuery连缀
    $my.other_results.css('border-color', 'red');
    $my.traffic_light.css('border-color', 'green');
}
{% endhighlight %}

### 善于使用jQuery连缀的写法

上面的代码也可以写成这样:

{% highlight js%}
var $active_light = $('#traffic_light input.on');$active_light.bind('click', function(){...})
    .css('border', '3px dashed yellow')
    .css('background-color', 'orange')
    .fadeIn('slow');
{% endhighlight %}

这样做的好处是更少更简洁的代码.

### 使用子查询

jQuery能在一个集合中继续使用选择器.这样减少了性能开销，因为已经将父元素保存在变量中。

比如html代码如下：
{% highlight html%}
<div id="content">
    <form method="post" action="/">
        <h2>Traffic Light</h2>
        <ul id="traffic_light">

            <li><input type="radio" class="on" name="light" value="red" /> Red</li>
            <li><input type="radio" class="off" name="light" value="yellow" /> Yellow</li>
            <li><input type="radio" class="off" name="light" value="green" /> Green</li>

        </ul>
        <input class="button" id="traffic_button" type="submit" value="Go" />
    </form>
</div>
{% endhighlight %}
我们可以先查询和缓存父元素，真正使用的是它的两个子元素.

{% highlight js%}
var $traffic_light = $('#traffic_light'),
    $active_light = $traffic_light.find('input.on'),
    $inactive_lights = $traffic_light.find('input.off');
{% endhighlight %}

__[Tip]__: 你可以同时声明多个局部变量，用逗号分隔，节约敲键盘的次数!

### 尽量减少直接 操作DOM

基于的思想是，需要保存在内存中的到底是什么， 再 更新 DOM. 这不是一个jQuery的最佳实践，但却是最有效的js代码.

直接操作DOM元素十分缓慢. 例如，你需要动态创建列表元素，别这么做:

{% highlight js%}
var top_100_list = [...], // assume this has 100 unique strings
    $mylist = $('#mylist'); // jQuery selects our <ul> element

for (var i=0, l=top_100_list.length; i<l; i++)
{
    $mylist.append('<li>' + top_100_list[i] + '</li>');
}
{% endhighlight %}

而应该是，在操作DOM之前，先创建列表元素的字符串:
{% highlight js%}
var top_100_list = [...], //假设有100个元素
    $mylist = $('#mylist'), //先选择 <ul>
    top_100_li = ""; // 用来存储list元素

for (var i=0, l=top_100_list.length; i<l; i++)
{
    top_100_li += '<li>' + top_100_list[i] + '</li>';
}
$mylist.html(top_100_li);
{% endhighlight %}
更快的做法， 在插入前把这些元素封装到单独的父节点中:
{% highlight js%}
var top_100_list = [...], // assume this has 100 unique strings
    $mylist = $('#mylist'), // jQuery selects our <ul> element
    top_100_ul = '<ul id="#mylist">'; // This will store our entire unordered list

for (var i=0, l=top_100_list.length; i<l; i++)
{
    top_100_ul += '<li>' + top_100_list[i] + '</li>';
}
top_100_ul += '</ul>'; // Close our unordered list

$mylist.replaceWith(top_100_ul);
{% endhighlight %}
如果你按照上面的方法，仍然担心性能问题:

* 试试jQuery的 clone() 方法. 它创建了节点数的拷贝.
* 使用 DOM DocumentFragments（一个轻量文档对象，文档树的一部分，或者是将要被插入到文档树的文档对象。
* 非常适合“剪切粘贴”的操作）. creator of jQuery points out,性能比直接操作DOM更好

### 使用时间委托(别名.冒泡)

除非特别指出，每一个事件（如点击鼠标，悬停等），JavaScript都会沿着DOM树“冒泡“到父元素。

这是很有用的一个特性，当许多元素（或节点）都要调用同一个函数。

不应该将一个事件监听功能绑定到多个节点，这是非常低效的，你可以把它绑定到它们的父元素，这样只要绑定一次，辨别出触发事件的节点就可以啦。

例如，假设我们正在开发一个有许多输入框的表单，并在选中时添加/删除一个class。像这样的绑定是低效的:
{% highlight js%}
$('#myList li).bind('click', function(){
    $(this).addClass('clicked');
    // do stuff
});
{% endhighlight %}

应该在父级监听点击事件:
{% highlight js%}
$('#myList).bind('click', function(e){
    var target = e.target, // e.target grabs the node that triggered the event.
        $target = $(target);  // wraps the node in a jQuery object
    if (target.nodeName === 'LI') {
        $target.addClass('clicked');
        // do stuff
    }
});
{% endhighlight %}
当你发现自己绑定同一个事件监听器的到许多相同的节点，你正在降低代码的性能.

### 消除无用的查询

如果没有找到任何匹配的元素，虽然jQuery将失败的查询处理地很好，它仍然需要花费时间来寻找他们。

如果整个网站需要一个全局的JavaScript，大部分人会用$(document).ready(function(){ // all my glorious code })实现。

最有效的办法是使用内联的初始化功能，让模板页面能完全控制JavaScript的执行时间和地点。

例如，在您的“文章“的模板页面，在body前写入下面的代码：

{% highlight js%}
<body>
  <script type="text/javascript">
    mylib.article.init();
  </script>
</body>
{% endhighlight %}
如果您的模板中包含了很多模块，虽然单个页面可能用也可能不用，但是由于某些原因，可以模块后立即初始化函数。
html代码：
{% highlight html%}
<ul id="traffic_light">
    <li><input type="radio" class="on" name="light" value="red" /> Red</li>

    <li><input type="radio" class="off" name="light" value="yellow" /> Yellow</li>
    <li><input type="radio" class="off" name="light" value="green" /> Green</li>
</ul>
<script type="text/javascript">
  mylib.traffic_light.init();
</script>
{% endhighlight %}
全局的js库格式如下:
{% highlight js%}
var mylib =
{
    article_page :
    {
        init : function()
        {
            // Article page specific jQuery functions.
        }
    },
    traffic_light :
    {
        init : function()
        {
            // Traffic light specific jQuery functions.
        }
    }
}
{% endhighlight %}

### 延迟加载到 $(window).load

大多数页面都可以看到 $(document).ready

如果你发现网页载入时停滞， 可能问题就在$(document).ready上. 通过 将函数绑定到$(window).load中，减少CPU使用率。

二者的差别在于：

* $(document).ready(fn)发生在"网页本身的HTML"载入后就触发，
* $(window).load(fn)则会等到"网页HTML标签中引用的图档、内嵌物件(如Flash)、IFrame"等拉哩拉杂的东西都载入后才会触发。

{% highlight js%}
$(window).load(function(){
    // jQuery functions to initialize after the page has loaded.
});
{% endhighlight %}

适用场景：像拖拽 (drag and drop)这些功能,结合了视觉效果(effects)和动画(animation)效果,预先获取隐藏的图像等等.

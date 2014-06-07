---
layout: post
title: 几段有意思的ruby代码
header: Pages
categories: [Ruby]
tags: [ruby]
---

{% include JB/setup %}

### ruby 冲击波：

{% highlight sh %}
x = 0
loop do
  puts '-' * ((1 + Math.sin(x += 0.1)) * 20)
  sleep 0.01
end
{% endhighlight %}

### 一道 Ruby 水平自测题

{% highlight sh %}
class Class
  def to_proc
    proc {|x,y| new x, y }
  end
end

[[1, "a"], [2, "b"], [3, "c"]].map(&amp;Array)    # =&gt; 请使用 Ruby 1.9 以上版本, 说出你的答案.
{% endhighlight %}

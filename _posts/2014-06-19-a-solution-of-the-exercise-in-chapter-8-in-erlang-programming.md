---
layout: post
title: 《Erlang程序设计》第八张十一小节习题解答
header: Pages
categories: [技术经验, Erlang, 读书笔记]
tags: [Erlang, 《Erlang程序设计》]
---
{% include JB/setup %}

### 世界是并发的，Erlang为并发而生

如果希望将程序的行为设计得与真实世界物体的行为相一致，那么程序就应该具有并发结构。

Herb Sutter本人曾表示，如果一个语言不能够以优雅可靠的方式处理并行计算的问题，那它就了去看21世纪的生存权。

作为一名程序员，随着工作经验的增长，如果足够幸运的话，终有一日，我们都将会直面大型系统的挑战，最初的手忙脚乱总是难免的。
经历过最初的迷茫之后，你会惊讶发发现这是一个完全不同的“生态系统”。要在这样的环境中生存，我们的代码需要具备一些之前我们相当陌生
或者闻所未闻的“生存技能”，容错，分布，负载均衡，这些词会频繁的出现在搜索列表之中，经过几轮各种方案的轮番上阵之后，我们会开始反思这
一系列问题的来龙去脉，重新审视整个系统架构，寻找瓶颈所在。你可能会和我一样，最终将目光停留在那些之前被认为是无懈可击的优秀代码上。
开始琢磨：究竟是什么让它们在新的环境中“水土不服”，妨碍其更加有效的利用越来越膨胀的计算资源？

Erlang为并发而生，20多年前，它的创建者们就意识到了这一个问题，从而辗转到一条与众不同的路。

Erlang采用消息模型，进程之间不共享任何数据！ 完全避免锁的概念！

它用进程+消息模型来建模现实世界中多人协作的场景，一个进程就是一个人，人与人之间并不存在任何共享内存，每个人有每个人的记忆，动作，习惯。
彼此之间的协作完全通过消息（说话，手势，做表情，等等）交互来完成，这正是我们每个人生而知之的并发模型。

软件模拟现实世界协作和交互的场景--这也是所谓的COP(面向并发编程)思想。

对于Erlang这种有些怪异的小众语言来说，是否真的会成为“下一个JAVA”？实难预测，但有有一点，已经毫无疑问，那就是，不管“下代语言”是什么，
它至少会像Erlang一样，处理好与并发相关的一系列问题（或者说做的更好）。

下面附上第8章11小节习题的自己解决方案！  ^_^

### 第一小题

__题目:__  编写一个函数start(AnAtom,Fun)来把spawn(Fun)的结果注册为AnAtom。当两个并行的进行同时执行到
start/2函数时，要确保代码能够正常工作。也就是说，这两个进程其中一个成功执行，而另一个必须执行失败。

__解决方案：__

{% highlight erlang%}
%% test.erl

-module(test).
-export([run/0]).

run() ->
    start(an_atom, fun() -> io:format("hello, world, this is first call\n") end),
    start(an_atom, fun() -> io:format("hello, world, this is second call\n") end).

start(AnAtom, Fun) ->
    try register(AnAtom, spawn(Fun)) of
	true ->
	    Fun()
    catch
	_:_ ->
	    io:format("Sorry,registered field, because the Atom name has been registered!")
    end.

{% endhighlight %}

__运行结果:__

{% highlight erlang%}
1> c(test).
{ok,test}
2> test:run().
hello, world, this is first call
hello, world, this is first call
Sorry,registered field, because the Atom name has been registered!hello, world, this is second call
ok
3>
{% endhighlight %}

### 第二小题

__题目:__  编写一个环形基准测试。在一个环形创建N个进程。然后沿着环发送一条消息M次，最后总共发送N*M条消息。在N和M的不同取值下测试整个过程会消耗多长时间。

__解决方案：__

{% highlight erlang%}
%% test.erl

-module(test).
-export([run/2]).

% N is stand for N porcesses
% M is stabd for send M times message

run(N, M) ->
    begin_tick(),
    work(N, M),
    end_tick().

begin_tick() ->
    statistics(runtime),
    statistics(wall_clock).

end_tick() ->
    {_, Time1} = statistics(runtime),
    {_, Time2} = statistics(wall_clock),
    io:format("Total time : ~p(~p) ~n", [Time1 * 1000, Time2 * 1000]).

create_pid_list(0, L) -> L;
create_pid_list(N, L) -> create_pid_list(N-1, [spawn(fun loop/0) | L]).

post_m_times_to_pid_list(_, 0) -> void;
post_m_times_to_pid_list(L, M) ->
    [H ! msg(H, M) || H <-L ],
    post_m_times_to_pid_list(L, M-1).

msg(Pid, Times) ->
    io:format("The ~p Pid leave ~p times send messages that hello word!~n", [Pid, Times]),
    ["hello word", Pid, Times].

loop() ->
    receive
        Any ->
            io:format("Msg arrived: ~p~n", [Any]),
            loop()
    end.

work(N, M) ->
    L = create_pid_list(N, []),
    post_m_times_to_pid_list(L,M).

{% endhighlight %}

__运行结果:__

{% highlight erlang %}
1> c(test).
{ok,test}
2> test:run(2,3).
The <0.384.0> Pid leave 3 times send messages that hello word!
The <0.383.0> Pid leave 3 times send messages that hello word!
Msg arrived: ["hello word",<0.384.0>,3]
The <0.384.0> Pid leave 2 times send messages that hello word!
Msg arrived: ["hello word",<0.383.0>,3]
The <0.383.0> Pid leave 2 times send messages that hello word!
Msg arrived: ["hello word",<0.384.0>,2]
The <0.384.0> Pid leave 1 times send messages that hello word!
Msg arrived: ["hello word",<0.383.0>,2]
The <0.383.0> Pid leave 1 times send messages that hello word!
Msg arrived: ["hello word",<0.384.0>,1]
Total time : 0(1000)
Msg arrived: ["hello word",<0.383.0>,1]
ok
3>
{% endhighlight %}
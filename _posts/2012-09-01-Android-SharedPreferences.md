---
layout: post
title: Android轻量级数据存储类SharedPreferences
header: Pages
categories: [Android]
tags: [android, SharedPreferences]
---
{% include JB/setup %}

### SharedPreferences是什么

SharedPreferences是Android中存储简单数据的一个工具类。可以想象它是一个小小的Cookie，它通过用键值对的方式把简单数据类型（boolean、int、float、long和String）存储在应用程序的私有目录下(data/data/包名/shared_prefs/)自己定义的xml文件中。

它提供一种轻量级的数据存储方式，通过eidt()方法来修改里面的内容，通过Commit()方法来提交修改后的内容。

做软件开发应该都知道，很多软件会有配置文件，里面存放这程序运行当中的各个属性值，由于其配置信息并不多，如果采用数据库来存放并不划算，因为数据库连接跟操作等耗时大大影响了程序的效率，因此我们使用键值这种一一对应的关系来存放这些配置信息。SharedPreferences正是Android中用于实现这中存储方式的技术。

SharedPreferences的使用非常简单，能够轻松的存放数据和读取数据。SharedPreferences只能保存简单类型的数据，例如，String、int等。一般会将复杂类型的数据转换成Base64编码，然后将转换后的数据以字符串的形式保存在 XML文件中，再用SharedPreferences保存。

### 重要方法：

{% highlight java %}
public abstract boolean contains (String key) ：检查是否已存在该文件，其中key是xml的文件名。

edit()：为preferences创建一个编辑器Editor,通过创建的Editor可以修改preferences里面的数据，但必须执行commit()方法。

getAll()：返回preferences里面的多有数据。

getBoolean(String key, boolean defValue)：获取Boolean型数据

getFloat(String key, float defValue)：获取Float型数据

getInt(String key, int defValue)：获取Int型数据

getLong(String key, long defValue)：获取Long型数据

getString(String key, String defValue)：获取String型数据

registerOnSharedPreferenceChangeListener(SharedPreferences.OnSharedPreferenceChangeListener listener)：注册一个当preference发生改变时被调用的回调函数。

unregisterOnSharedPreferenceChangeListener(SharedPreferences.OnSharedPreferenceChangeListener listener)：删除当前回调函数。

clear()：清除内容。

commit()：提交修改

remove(String key)：删除preference
{% endhighlight %}

### 使用SharedPreferences

使用SharedPreferences保存key-value对的步骤如下：

* 使用Activity类的getSharedPreferences方法获得SharedPreferences对象，其中存储key-value的文件的名称由getSharedPreferences方法的第一个参数指定。
* 使用SharedPreferences接口的edit获得SharedPreferences.Editor对象。
* 通过SharedPreferences.Editor接口的putXxx方法保存key-value对。其中Xxx表示不同的数据类型。例如:字符串类型的value需要用putString方法。
* 通过SharedPreferences.Editor接口的commit方法保存key-value对。commit方法相当于数据库事务中的提交（commit）操作。

### 具体代码的书写流程为


* 存放数据信息
  1. 打开Preferences，名称为setting，如果存在则打开它，否则创建新的Preferences
    * {% highlight java %}
      SharedPreferences settings = getSharedPreferences(“setting”, 0);
      // 这个地方对参数好好的介绍一下：
       public SharedPreferences getSharedPreferences(String name, int mode)
    name： 是指文件名称，不需要加后缀.xml,系统会自动为我们添加上。
    一般这个文件存储在/data/data/<package name>/shared_prefs下(这个面试常问到)
    mode：是指定读写方式，其值有三种，分别为：
    Context.MODE_PRIVATE 或者0：指定该SharedPreferences数据只能被本应用程序读、写
    Context.MODE_WORLD_READABLE：指定该SharedPreferences数据能被其他应用程序读，但不能写
    Context.MODE_WORLD_WRITEABLE：指定该SharedPreferences数据能被其他应用程序读写。
    {% endhighlight %}
  2. 让setting处于编辑状态
    * {% highlight java %}
        SharedPreferences.Editor editor = settings.edit();
      {% endhighlight %}
  3. 存放数据
    * {% highlight java %}
      editor.putString(“name”,”ATAAW”);
      editor.putString(“URL”,”ATAAW.COM”);
      {% endhighlight %}
  4. 完成提交
    * {% highlight java %}
       editor.commit();
      {% endhighlight %}

* 读取数据信息
  1. 获取Preferences
    * {% highlight java %}
       SharedPreferences settings = getSharedPreferences(“setting”, 0);
      {% endhighlight %}
  2. 取出数据
    * {% highlight java %}
      String name = settings.getString(“name”,”默认值”);
      String url = setting.getString(“URL”,”default”);
      {% endhighlight %}

以上就是Android中SharedPreferences的使用方法，其中创建的Preferences文件存放位置可以在Eclipse中查看：
{% highlight java %}
DDMS->File Explorer /<package name>/shared_prefs/setting.xml
{% endhighlight %}
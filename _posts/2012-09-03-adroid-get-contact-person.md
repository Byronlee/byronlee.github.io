---
layout: post
title: android:获取联系人原理（姓名和电话
header: Pages
categories: [Android]
tags: [android]
---
{% include JB/setup %}

### Adroid 联系人

最近在弄安卓联系人， 网上有很多资料，但是都很冗杂，经过自己的深层摸索，写下自己的学习心得

__讲2点：__

* android 里面的 联系人数据库 的存储 模式，对 联系人数据库的 字段介绍
* 几种常用的查询联系人的 方式 直接给 代码

## android 联系人数据库存储模式，对联系人数据库字段介绍

Android中的联系人都保存在一个SQLite数据库中，有兴趣的可以使用adb直接push出来看一下里面的表和视图的结构，你也可以在网上下载Root explorer 文件浏览器，在里面你可以直接打开 这个数据库文件，然后你对它的字段和结构一目了然，你帮助你升入了解有很大的帮助，建议你看看相关字段，然后你查询的时候 出现的字段就一目了然了！

它的路径为：

{% highlight sh %}
/data/data/com.android.providers.contacts/databases/contacts2.db
{% endhighlight  %}

在联系人数据库中，保存的都是一些小的数据表，即与把所有数据保存成一个表不同，它会对联系人的资料模块化，然后分成多个表保存。

表与表之间使用id相关联起来，这样做的目的是尽量减小数据表的规模，提高数据检索的速度，因为我们检索的时候不是每次都需要读取所有的联系人资料的，这样可以更灵活的选择我们所关心的内容，提高检索速度，

虽然分开的保存数据，可以提高检索的速度，但是也给我们带来了一些不便，就是需要把这些分开的表再重新联合起来，组成我们所需要的完整的数据。好在这些，android已经替我们准备好了，它在数据库里面建了一些视图，呵呵，视图就是虚拟表。并且，android也提供了很多接口，通过ContentResolver().query方法，传入不同的URI即可访问相应的数据集。

在联系人数据库里面联系人和电话号码是分别存在两个表里面的，因为存在一个联系人拥有几个号码的情况，所以android为联系人和手机号码分别单独创建了相应的视图。

联系人信息的视图里面只保存与联系人相关的资料，例如姓名，是否有手机号码等。

而手机号码资料则是每一个电话号码为一条记录，如果有一个联系人有3个号码，则里面会出现3个该联系人的记录，号码分别为他的三个号码。

如果是需要读取联系人信息，传入的URI为：`ContactsContract.Contacts.CONTENT_URI`

如果是需要读取手机号码信息传入的URI为：`ContactsContract.CommonDataKinds.Phone.CONTENT_URI`

__一定不要忘记，读取联系人信息 不要忘记加 权限__

{% highlight sh %}
<!– 添加操作联系人的权限 –>
<uses-permission android:name=”android.permission.READ_CONTACTS” />
<uses-permission android:name=”android.permission.WRITE_CONTACTS” />
{% endhighlight  %}

下面再看看query函数的原型，只读取关心的字段，应该可以提高一点速度
{% highlight sh %}
query(Uri uri, String[] projection, String selection,

String[] selectionArgs, String sortOrder)

projection：是需要读取的字段

selection：是数据检索的条件

selectionArgs：是数据检索条件的参数

sortOrder：是排序的字段
{% endhighlight  %}

解释一下：假如一条sql语句如：`select *  from anyTable where var=’const’`

那么anyTable就是uri，＊就是`projection，selection`是`“var=?”，selectionArgs` 写成这样：`new String[]{‘const‘｝`

至于最后一个就简单了，就是排序方式。

在android联系人表里面一个两个比较有意思的字体`sort_key`和`sort_key_alt`，它里面保存的是联系人名字的拼音字母

例如联系人名字是“李明”，则sort_key保存的是“LI李MING明”，这样如果是按sort_key或sort_key_alt排序的话，就可以实现按汉字的拼音字母排序了

先去用Root explorer 文件浏览器打开contacts2.db 数据库，看看里面的字段有助于你理解现在查询是 输入的选择条件

### 几种常用的查询联系人的 方式 直接给 代码


1. 查询所有联系人（姓名+number)
  * {% highlight java %}
Cursor cursor = getContentResolver().query(ContactsContract.
Contacts.CONTENT_URI,null, null, null, null);
while(cursor.moveToNext()){
  String id = cursor.getString(cursor.getColumnIndex(
  ContactsContract.Contacts._ID));
  String name = cursor.getString(cursor.getColumnIndex(
  ContactsContract.Contacts.DISPLAY_NAME));
  Log.d("TAG" , "Name is : "+name);
  int isHas = Integer.parseInt(cursor.getString(cursor.
                        getColumnIndex(ContactsContract.Contacts.HAS_PHONE_NUMBER)
                   )
              );
  if(isHas>0){
     Cursor c = getContentResolver().query(ContactsContract.
     CommonDataKinds.
     Phone.CONTENT_URI,null,
     ContactsContract.CommonDataKinds.Phone.CONTACT_ID+" = " + id,null,null);
     while(c.moveToNext()){
        String number = c.getString(c.getColumnIndex(ContactsContract.
        CommonDataKinds.Phone.NUMBER));
        Log.d("TAG " , "Number is : "+number);
     }
    c.close();
  }
}
cursor.close();
{% endhighlight  %}

2. 根据关键字来模糊查询联系人（关键字）（ 根据确定的姓名 或者电话号码来查询也是一样的）
  * {% highlight java %}
String key = "李";
String[] projection = { ContactsContract.PhoneLookup.DISPLAY_NAME,
                        ContactsContract.CommonDataKinds.Phone.NUMBER };
Cursor cursor = this.getContentResolver().query(
                     // Which columns to return.
                     ContactsContract.CommonDataKinds.Phone.CONTENT_URI,projection,
                    // 这是模糊查询
ContactsContract.PhoneLookup.DISPLAY_NAME+" LIKE"+
" '%"+key+"%'"
, // WHERE clause.
//（如果你根据具体的条件来查询也可以这样写：）
// ContactsContract.CommonDataKinds.Phone.NUMBER + " = '"
//+ number + "'", // WHERE clause.    // 这是根据电话号码来查询
// ContactsContract.Contacts.DISPLAY_NAME + " = '"
//+ name+ "'", // WHERE clause.    // 这是根据姓名来查询
null, // WHERE clause value substitution
null); // Sort order.
if (cursor == null) {
  Log.v("tag", "getPeople null");
}
Log.d("tag", "getPeople cursor.getCount() = " + cursor.getCount());
for (int i = 0; i < cursor.getCount(); i++) {
  cursor.moveToPosition(i);
  String uname = cursor.getString(cursor.
  getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME));
  Log.v("TAG" , "Name is : "+uname);
  String number = cursor.getString(cursor.
  getColumnIndex(ContactsContract.CommonDataKinds.
  Phone.NUMBER));
  Log.v("TAG " , "Number is : "+number);
}
cursor.close();
{% endhighlight  %}

3. 删除联系人
  * {% highlight java %}
 context.getContentResolver().delete(Uri.
 parse(ContactsContract.
 RawContacts.CONTENT_URI.toString() +"?" +
 ContactsContract.CALLER_IS_SYNCADAPTER+" = true"),
 ContactsContract.RawContacts._ID + " > 0", null);
{% endhighlight  %}

ok!
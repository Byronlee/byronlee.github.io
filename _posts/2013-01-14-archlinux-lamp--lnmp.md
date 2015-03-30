---
layout: post
title: 2013年1月14日Archlinux搭建LAMP环境或者LNMP环境
header: Pages
categories: [Archlinux]
tags: [archlinux, lamp, lnmp]
---

{% include JB/setup %}

### 开始的开始

用Archlinux搭建个全能的环境出来，其实很简单，不过也比较繁琐，由于archlinux系统和各个软件的版本升级，配置各有不同，网上看了，很多，都因为不是最新版本系统就耗费了我大量的时间，再加之看的时候自己的粗心大意，把字看错，英语单词意思的不重视，走了很多弯路，所以，记录一下。

其实lamp与lnmp的搭建是互通的，我们想用apach的时候把nginx服务关掉把apach服务开启就是，反之想用nginx的时候把apach关掉,把nginx开启即可．其他的php,phpmyadmin等都是通用的．

__系统：__　archlinux 最新版，截至发稿是：2013年1月14

最新版的都是systemd 启动进程，网上很多都是syslinux系统，终端运行　pstree可知

具体区别见另外一篇博客:[Archlinux安装+配置+打造自己的linux环境+小bug解决笔记]({{site.url}}/blog/2013/01/18/archlinux-huan-jiang-bug/ ) 中的［Archlinux的systemd 启动系统］

__软件版本：__　都是最新，　apach phpmyadmin mysql nigix

### 首先安装LAMP环境

使用下面的命令：
{% highlight sh%}
$ sudo  pacman -S apache mysql php php-apache php-gd php-mcrypt phpmyadmin openssh
{% endhighlight %}

解释下吧,apache mysql php php-apache都不用说了，最基本的软件包，其中php-gd是php的gd图形库，php-mcrypt是phpmyadmin的需求的一个加密函数库，openssh是ssh软件包，用来使用ssh软件来操作。

( 注意：［一般不用］安装上之后先修改下”/etc/hostname”和“/etc/hosts”的主机名，因为apache启动的时候要解析，如果不正确那启动服务很慢，)

### 开始配置apache和php支持

apache配置：参考：https://wiki.archlinux.org/index.php/LAMP_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)

apache的配置文件`/etc/httpd/conf/httpd.conf`(这与老版本的配置文件名称不一样了，里面的内容　一定详细的读一下，如果你是一个新手，一定去读一下内容，虽然是英文，但是意思还是很容易懂，读了会对你apach的配置格局有一个大概的了解，不要为了配置而去配置，要懂为什么有这样的配置，要理解每一句配置语句的作用)

### 支持php

在apache的配置文件/etc/httpd/conf/httpd.conf　中添加模块到指定位置（配置文件中有提示）

{% highlight php%}
"LoadModule php5_module modules/libphp5.so"
{% endhighlight %}

引入extra下的php配置文件，（extra　下的配置文件是不能自动加载的，需要像下面的一样引入进去）
{% highlight php%}
"Include conf/extra/php5_module.conf"
{% endhighlight %}
然后重启启动下httpd服务就可以支持php了（不配置是不支持php的）. 启动和开机自启动的命令如下:
{% highlight sh %}
$ sudo systemctl enable httpd

$ sudo systemctl start httpd

$ sudo systemctl enable mysqld

$ sudo systemctl start mysqld
{% endhighlight %}

重启的话就将start修改成restart就可以了，另外apache默认www的工作路径是”/srv/http(apache的配置文件里有说明)” 建立phpinfo文件测试。在/srv/http/下新建一个文件 test.php 写入如下内容：
{% highlight php%}
<?php phpinfo(); ?>
{% endhighlight %}

重启apach:
{% highlight sh %}
$ sudo systemctl restart httpd
{% endhighlight %}

就可以看见如内容了：

<img style="width:100%" src="/assets/images/phpinfor.png">

### 安装phpmyadmin

__参考：__　https://wiki.archlinux.org/index.php/Phpmyadmin

复制一份phpmyadmin配置文件到apache额外配置文件目录extra下:
{% highlight sh %}
$ sudo cp /etc/webapps/phpmyadmin/apache.example.conf /etc/httpd/conf/extra/httpd-phpmyadmin.conf
{% endhighlight %}

然后再将这个phpmyadmin的配置文件的链接引入到apach 的配置文件httpd.conf中(在httpd.conf中加入如下代码，与前面引入php的额外配置文件一样)：
{% highlight sh %}
"Include conf/extra/httpd-phpmyadmin.conf"
{% endhighlight %}

然后检查你的 `/etc/httpd/conf/extra/httpd-phpmyadmin.conf` 因该是下面的内容:
{% highlight php %}
Alias /phpmyadmin "/usr/share/webapps/phpMyAdmin"
        <Directory "/usr/share/webapps/phpMyAdmin">
                AllowOverride All
                Options FollowSymlinks
                Order allow,deny
                Allow from all
                php_admin_value open_basedir "/srv/:/tmp/:/usr/share/webapps/:/etc/webapps:/usr/share/pear/"
        </Directory>
{% endhighlight %}
现在配置就好了，其次修改`php.ini`使phpmyadmin支持mysql: 在`/etc/php/php.ini`　中去掉这两句的注释:　（否则http://localhost/phpmyadmin是不能正常访问的）
{% highlight php %}
extension=mysqli.so
extension=mcrypt.so
{% endhighlight %}

最后重启下httpd服务就可以使用http://localhost/phpmyadmin访问:

<img style="width:100%" src="/assets/images/phpmysql.jpg">

之后如果出现一下情况而不能正常访问：

{% highlight html%}
Access forbidden!

You don’t have permission to access the requested object. It is either read-protected or not readable by the server. If you think this is a server error, please contact the webmaster.

Error 403

localhost
Fri Jan 11 23:54:47 2013
Apache/2.2.23 (Unix) PHP/5.4.10 mod_ssl/2.2.23 OpenSSL/1.0.1c DAV/2
{% endhighlight %}

请编辑`/usr/share/webapps/phpMyAdmin`下的.htaccess将`”deny from all”`注释掉，最后重启下httpd服务就可以使用了。　

如果还不能访问，就查看apach 的配置文件httpd.conf　将里面的　`deny from all`　全都注释掉！

### 登录phpmyadmin

如果在登录的过程中出现　`#1045 无法登录 MySQL 服务器`　

或许出现以下错误情况：`phpmyadmin:#1045 无法登录 MySQL 服务器。Access denied for user ‘root’@’localhost’ (using password: YES)`

说明你的用户名或密码有误

首先查看你的用户名或密码（mysql的用户名和密码）输入正确没有，注意大小写，　如果还没有设置或记不清

__解决方法：__ 这时可以尝试使用mysql 默认的root账号的空密码登陆数据库。

如果使用空密码登陆时又出现：`空密码登录被禁止 (参见 允许空密码) 的错误`。则要修改`/phpmyadmin/libraries/config.default.php` 文件，找到下面两行
{% highlight php%}
$cfg['Servers'][$i]['nopassword'] = false;
$cfg['Servers'][$i]['AllowNoPassword'] = false;
{% endhighlight %}
将两个false改为true，同时设置 `$cfg['Servers'][$i]['password'] = ”`；通过这样设置配置文件后phpmyadmin 就会允许以空密码方式登录mysql数据库了。

若重新以空密码方式登录phpmyadmin有时仍无法登陆，请清除cookie或关闭原来的phpmyadmin 登录窗口，重新使用空密码登录。

若这时候仍然显示空密码登陆被禁止，试试随便输入几个字符当作密码看是否能够登陆成功。 或者改变一下文件
{% highlight php%}
/etc/webapps/phpmyadmin/config.inc.php

/usr/share/webapps/phpMyAdmin/config.inc.php
{% endhighlight %}
中的
{% highlight php%}
　$cfg['Servers'][$i]['AllowNoPassword'] = false;
{% endhighlight %}
设为 true !　就可以，最后登录成功后，在mysql的user表中删除除root以外所有用户。

### LAMP环境就搭建好了,现在搭建LNMP环境：

网上有集成安装LNMP，官网：[http://lnmp.org](http://lnmp.org)，　但是它只支持：CentOS/RadHat、Debian/Ubuntu VPS(VDS)，没有archlinux的，其实它就是写好了安装的脚本，要分开安装也不是很难，只需要安装nginx，把配置写好，并启动它，关闭之前的apach服务器就可以了 安装配置Nginx：
{% highlight sh%}
$ sudo pacman -S nginx php-fpm

$ sudo systemctl stop httpd      //停止apach

$ sudo  systemctl enable nginx  //将nginx设为开机启动

$ sudo  systemctl start nginx　　//开启nginx服务

$ sudo systemctl enable php-fpm
{% endhighlight %}
停止apache然后启用nginx，之后是配置nginx支持php，修改nginx配置文件(/etc/nginx/nginx.conf)：
{% highlight sh%}
 gzip  on;
        location / {
            root   /srv/http;
            autoindex on;
            index  index.html index.htm index.php;
        }
        location ~ \.php$ {
            root           /srv/http;
            fastcgi_pass   unix:/var/run/php-fpm/php-fpm.sock;
            fastcgi_index  index.php;
            fastcgi_param  SCRIPT_FILENAME /srv/http$fastcgi_script_name;
            include        fastcgi_params;
        }
{% endhighlight %}
就贴上修改过的内容，其他的就不贴了。
nginx的phpmyadmin配置
{% highlight sh%}
$sudo ln -s /usr/share/webapps/phpMyAdmin/ /srv/http/phpmyadmin
$sudo chown -R http:http /usr/share/webapps/phpMyAdmin/
{% endhighlight %}
修改php.ini然后再open_basedir中追加
{% highlight sh%}
":/usr/share/webapps/:/etc/webapps/"
{% endhighlight %}
然后
{% highlight sh%}
$ sudo systemctl restart nginx
{% endhighlight %}
最后在nginx.conf文件中添加phpmyadmin 的配置：
{% highlight sh%}
server {
         location /phpmyadmin {
                 root    /srv/http/phpmyadmin;
                 index   index.html index.htm index.php;
         }

         location ~ \.php$ {
                 root            /srv/http/phpmyadmin;
                 fastcgi_pass    unix:/var/run/php-fpm/php-fpm.sock;
                 fastcgi_index   index.php;
                 fastcgi_param   SCRIPT_FILENAME /srv/http/phpmyadmin/$fastcgi_script_name;
                 include         fastcgi_params;
         }
 }
{% endhighlight %}

这就基本完成了安装配置，访问localhost就可以看见页面了

### 可能问题

访问php页面提示`An Error Occurred`

访问php页面的时候出现下述错误:
{% highlight html%}
An error occurred.

Sorry, the page you are looking for is currently unavailable.
Please try again later.

If you are the system administrator of this resource then you should check the error log for details.

Faithfully yours, nginx.
{% endhighlight %}

最常见的原因是`php-fastcgi`或`php5-fpm`服务没有正常运行:
{% highlight sh%}
$ sudo systemctl start php-fpm
{% endhighlight %}
OK, 配置完毕！
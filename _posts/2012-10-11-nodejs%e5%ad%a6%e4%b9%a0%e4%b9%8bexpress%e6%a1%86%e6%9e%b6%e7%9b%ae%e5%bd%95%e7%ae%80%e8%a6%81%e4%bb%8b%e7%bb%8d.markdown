---
layout: post
status: publish
published: true
title: NodeJS学习之Express框架目录简要介绍
author: Byronlee
author_login: ginchenorlee
author_email: ginchenorlee@sina.com
wordpress_id: 297
wordpress_url: http://www.ginchenorlee.com/?p=297
date: !binary |-
  MjAxMi0xMC0xMSAwMjoxNDoxNyArMDAwMA==
date_gmt: !binary |-
  MjAxMi0xMC0xMSAwMjoxNDoxNyArMDAwMA==
categories:
- 经验分享
- NodeJS
- Express框架
tags:
- Express
- nodeJS
comments: []
---
<p>Express目录介绍：<br />
目录/文件 说明<br />
<span style="color: #ff0000;">./                  ：</span>根目录，我们的node.js代码都会方这个目录<br />
<span style="color: #ff0000;">package.json ：</span>npm依赖配置文件， 类似ruby中的Gemfile, java Maven中的pom.xml文件. 一会需要在这里添加 markdown-js 项目依赖<br />
<span style="color: #ff0000;">app.js            ：</span>项目的入口文件<br />
<span style="color: #ff0000;">public/</span><br />
<span style="color: #ff0000;"> javascript/</span><br />
<span style="color: #ff0000;"> stylesheets/</span><br />
<span style="color: #ff0000;"> images/          ：</span>都为存放静态资源文件, jquery/prettify.js等静态库会方这里，当然自己编写的前端代码也可以放这里<br />
<span style="color: #ff0000;">views/              :</span>模板文件, express默认采用jade, 当然，你也可以使用自己喜欢的haml,JES, coffeeKup, jQueryTemplate等模板引擎<br />
node_modules/:存放npm安装到本地依赖包，依赖包在package.json文件中声明，使用npm install指令安装</p>
<p>&nbsp;</p>

---
layout: post
title: 安静的脑补 | 微信登陆中的那些坑
header: Pages
categories: [安静的脑补, 技术经验]
tags: [产品, 安静的脑补]
---
{% include JB/setup %}

### 在讲这个坑之前，先来讲讲另外一个坑

那就是尝试新技术，最开始报了很大的心态是，学习新技术，然后就引用了 Google 的Polymer，和 大家常用的 AugularJS, 结果就是，Polymer不成熟的框架，会花掉很多时间去cover bug, 完善Feature，和已有的框架衔接不灵活，等等，项目半个多月丝毫没有任何突破性进展。结果就是决定放弃使用这几个技术，但还是保持使用Material Design的设计风格，之后才有了进度。


### 再说登陆

再说回来，登陆，最开始，使用微信登陆这个宗旨是没有改变的。但是微信接入登陆的过程是很麻烦的，一大堆的认证就算了，还需要各种认证收费。接入微信登陆，至少得两个认证： 一个是公众号的认证，300，还有就是开发者认证 300，

后面通过各种查阅和实验得知，通过微信的事件二维码来可以自己实现一个扫码登陆的过程，这样可以减少开发者认证的300快，但是支持事件二维码必须是认证的服务号， 没有办法，那就只有认证了，然后折腾找各种方案，最终服务号认证通过。获得的公众号的事件二维码的API，然后，自己YY，整个登陆扫码过程。

这个过程其实也很简单，微信扫码后，会向我们的服务器推送一条事件消息，告知是谁在扫码，并把二维码中的自定义的数据传给服务器，那么我们服务就可以得知哪个用户在扫码，然后设置该用户的session，让他登陆。

这里有个小问题就是，微信的请求到了服务器，设置了当前用户的session, 当前用户怎么在浏览器端，刷新获取这个session呢？ 也就是来自不同服务器的请求，共享一个session！ 怎么共享？有人说，session有id, 共享这个session object 等等，但是这都是不科学的，也是不安全的，你既然能这样做，别人为啥不能？不安全。

解决这个问题，也很简单，我们只需要把这个session 中的user_id ,存在一个第三方的地方，比如我们存在了redis缓存中，那么这个地方的key在用户第一次打开这个网页的时候就已经预设好了，这样前后端都这都这个key， 当后端收到微信请求时，将user_id 存入到事先设定好的key当中，然后通知前段页面刷新【可以使用faye的消息订阅/发布模式】，刷新时去读取事先设定key下的值，然后来登陆用户。这样就可以完成用户扫服务号的事件二维码，实现登陆！

### 大致实现过程：

第一步：在网页加载前预设key, 我们存在cookies中，方便前端使用

```ruby

class ApplicationController < ActionController::Base
  before_action :authorization
  def authorization
    cookies[:auth_token] = SecureRandom.hex(32) if cookies[:auth_token].blank?
  end
end

```

第二步：同时我们把这个key放入到事件二维码中，用户扫码后，服务器端也会收到这个key，用户就可以扫码这个二维码了

```ruby

  def login_qr_code_image_url
    "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=#{WeixinClient.ticket(cookies[:auth_token])}"
  end

```

第三步：用户扫码后，服务端，收到请求,我们解析出是谁在扫码，并把他的id存在key中，同时通知前端来刷新

```ruby

class Weixin::MessagesController < ActionController::Base
  skip_before_filter :verify_authenticity_token
  skip_authorization_check

  def create
    @xml = params
    Rails.logger.info "received message from wechat: #{@xml}"
    Rails.logger.info "开始通知前段，后台已经收到数据"
    broadcast
    Rails.logger.info "login_event_key为: #{login_event_key}"
    return render text: Settings.logined_reply.call(@xml) if $cache.read([:ajdnb, login_event_key]).present?
    @user = User.find_or_create(@xml["FromUserName"], 'QR_code')
    $cache.write([:ajdnb, login_event_key], @user.id)
    render text: Settings.login_reply.call(@xml)
  end

  def broadcast
    channel = Settings.login_callback_channel.call(login_event_key)
    Rails.logger.info "channel 为: #{channel}, host为：#{Settings.faye_host}"
    client = Faye::Client.new(Settings.faye_host + '/faye')
    client.publish(channel, {})
  end

  private

  def login_event_key
    @xml["EventKey"].gsub("qrscene_", "")
  end

```

第四步：Javascript监听后台的发布广播事件

```javascript

     var faye;
     faye = new Faye.Client('http://' + window.location.host + '/faye')
     faye.subscribe("/login/" + document.cookie.split("=")[1], function(data) {
       window.location.href="/weixin_sign_in_callback";
     });

```

第五步：Javascript监听到后，会请求到服务端，根据key,找出user。并登陆

```ruby

  def weixin_sign_in_callback
    redirect_to :back if user_signed_in?
    session[:user_id] ||= $cache.read([:ajdnb, cookies[:auth_token]])
    user = User.find(session[:user_id])
    sign_in(user)
    redirect_to after_sign_in_path_for(user)
  end

```

一切OK，上线，OMG， 慢！消息丢失率太高！

基本已废除！，没有办法，便只有再交钱，做开发者认证，使用微信自己家的服务，后来就接入了现在的微信官方登陆

__web端__，使用open weixin 扫码登陆，

__移动端__，使用微信的mp.weixin, 打开网页就登陆

这也是微信登陆最恶心的地方，web端和移动端是两套方案，不统一！！

到目前认证费都已经交了八百多了

不管信不信，反正是够折腾的，不过过程很辛苦，但是很美妙，这是我喜欢的过程，此文也可以是，了解微信登陆方案的人一个前车之鉴，不过庆幸的是，现在一切OK，登陆也是挺快的，登陆效果，我还是挺满意的。

### 此文只为祭奠微信登陆中的那些坑儿

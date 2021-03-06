---
layout: post
title: 设计模式概述
header: Pages
category: 设计模式
tags: [设计模式]
---
{% include JB/setup %}

  设计模式（Design pattern）是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结。使用设计模式是为了可重用代码、
让代码更容易被他人理解、保证代码可靠性。 毫无疑问:

  * 设计模式于己于他人于系统都是多赢的；
  * 设计模式使代码编制真正工程化；
  * 设计模式是软件工程的基石脉络，如同大厦的结构一样。

### 7大设计原则

* 开-闭原则(Open-Closed Principle, OCP):
  * 一个软件实体应当对扩展开发,对修改关闭.说的是,再设计一个模块的时候,应当使这个模块可以在不被修改的前提下被扩展.换言之,应当可以在不必修改源代码的情况下改变这个模块的行为，在保持系统一定稳定性的基础上，对系统进行扩展。这是面向对象设计（OOD）的基石，也是最重要的原则。

* 里氏代换原则(Liskov Substitution Principle,常缩写为.LSP)
  * 由Barbar Liskov(芭芭拉.里氏)提出，是继承复用的基石。
  * 严格表达:如果每一个类型为T1的对象o1,都有类型为T2的对象o2,使得以T1定义的所有程序P在所有的对象o1都代换称o2时,程序P的行为没有变化,那么类型T2是类型T1的子类型.

* 依赖倒置原则(Dependence Inversion Principle),要求客户端依赖于抽象耦合.
  * 表述:抽象不应当依赖于细节,细节应当依赖于抽象.(Program to an interface, not an implementaction)

* 接口隔离原则(Interface Segregation Principle, ISP)
  * 一个类对另外一个类的依赖是建立在最小的接口上。
  * 使用多个专门的接口比使用单一的总接口要好.根据客户需要的不同,而为不同的客户端提供不同的服务是一种应当得到鼓励的做法.就像"看人下菜碟"一样,要看客人是谁,再提供不同档次的饭菜.
  * 胖接口会导致他们的客户程序之间产生不正常的并且有害的耦合关系.当一个客户程序要求该胖接口进行一个改动时,会影响到所有其他的客户程序.因此客户程序应该仅仅依赖他们实际需要调用的方法.

* 合成/聚合复用原则(Composite/Aggregate Reuse Principle,CARP)
  * 在一个新的对象里面使用一些已有的对象,使之成为新对象的一部分;新的对象通过这些向对象的委派达到复用已有功能的目的.这个设计原则有另一个简短的表述:要尽量使用合成/聚合,尽量不要使用继承.

* 迪米特法则(Law of Demeter LoD)又叫做最少知识原则(Least Knowledge Principle,LKP),就是说,一个对象应当对其他对象有尽可能少的了了解.

* 单一职责原则(Simple responsibility pinciple SRP)
 * 就一个类而言,应该仅有一个引起它变化的原因,如果你能想到多于一个的动机去改变一个类,那么这个类就具有多于一个的职责.应该把多于的指责分离出去,分别再创建一些类来完成每一个职责.


__常说的OO五大原则就是指其中的__

* 单一职责原则
* 开放闭合原则
* 里氏替换原则
* 依赖倒置原则
* 接口隔离原则


### 设计模式归类
设计模式一共23种,虽然多,但是主要分三个类型:创建型(5)、结构型(11)和行为型(7)

__其中创建型有：__

* Singleton，单例模式
  * 主要内容: 保证一个类只有一个实例，并提供一个访问它的全局访问点
  * 应用场景：一个无状态的类使用单例模式节省内存资源。

* Abstract Factory，抽象工厂
  * 主要内容: 提供一个创建一系列相关或相互依赖对象的接口，而无须指定它们的具体类。
  * 应用场景：一系列相互依赖的对象有不同的具体实现。提供一种“封装机制”来避免客户程序和这种“多系列具体对象创建工作”的紧耦合。

* Factory Method，工厂方法
  * 主要内容:  定义一个用于创建对象的接口，让子类决定实例化哪一个类，Factory Method使一个类的实例化延迟到了子类。
  *
应用场景：由于需求的变化，一个类的子类经常面临着剧烈的变化，但他却拥有比较稳定的接口。使用一种封装机制来“隔离这种易变对象的变化”，工厂方法定义一个用于创建对象的接口，让子类来确定创建哪一个具体类的对象，将对象的实例化延迟。

* Builder，建造模式
  * 主要内容: 将一个复杂对象的构建与他的表示相分离，使得同样的构建过程可以创建不同的表示。
  * 应用场景：一个类的各个组成部分的具体实现类或者算法经常面临着变化，但是将他们组合在一起的算法却相对稳定。提供一种封装机制
将稳定的组合算法于易变的各个组成部分隔离开来。

* Prototype，原型模式
  * 主要内容：用原型实例指定创建对象的种类，并且通过拷贝这些原型来创建新的对象。
  * 应用场景：用new创建一个对象需要非常繁琐的数据准备或者权限


__行为型有：__

* Iterator，迭代器模式
  * 主要内容：提供一个方法顺序访问一个聚合对象的各个元素，而又不需要暴露该对象的内部表示。
  * 应用场景：迭代。

* Observer，观察者模式
  * 主要内容: 定义对象间一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知自动更新。
  * 应用场景： 某个实例的变化将影响其他多个对象。

* Template Method，模板方法
  *
主要内容：定义一个操作中的算法的骨架，而将一些步骤延迟到子类中，TemplateMethod使得子类可以不改变一个算法的结构即可以重定义该算法的某些特定步骤。
  * 应用场景：一个操作的步骤稳定，而具体细节的改变延迟的子类

* Command，命令模式
  * 主要内容：将一个请求封装为一个对象，从而使你可以用不同的请求对客户进行参数化，对请求排队和记录请求日志，以及支持可撤销的操作。
  * 应用场景：将命令者与执行者完全解耦。

* State，状态模式
  * 主要内容：允许对象在其内部状态改变时改变他的行为。对象看起来似乎改变了他的类。
  * 应用场景：一个对象的内部状态改变时，他的行为剧烈的变化。

* Strategy，策略模式
  * 主要内容：定义一系列的算法，把他们一个个封装起来，并使他们可以互相替换，本模式使得算法可以独立于使用它们的客户。
  *  应用场景：

* China of Responsibility，职责链模式
  * 主要内容：使多个对象都有机会处理请求，从而避免请求的送发者和接收者之间的耦合关系
  * 应用场景:

* Mediator，中介者模式
  * 主要内容 ：用一个中介对象封装一些列的对象交互。
  * 应用场景 :

* Visitor，访问者模式
  * 主要内容：表示一个作用于某对象结构中的各元素的操作，它使你可以在不改变各元素类的前提下定义作用于这个元素的新操作。
  * 应用场景:

* nterpreter，解释器模式
  * 主要内容 ：给定一个语言，定义他的文法的一个表示，并定义一个解释器，这个解释器使用该表示来解释语言中的句子。
  * 应用场景:

* Memento，备忘录模式
  * 主要内容：在不破坏对象的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。
  * 应用场景:

__结构型有:__

* Composite，组合模式
  * 主要内容：将对象组合成树形结构以表示部分整体的关系，Composite使得用户对单个对象和组合对象的使用具有一致性。
  * 应该场景:

* Facade，外观模式
  * 主要内容：为子系统中的一组接口提供一致的界面，fa?ade提供了一高层接口，这个接口使得子系统更容易使用。
  * 应用场景:

*  Proxy，代理模式
  * 主要内容：为其他对象提供一种代理以控制对这个对象的访问
  * 应用场景:

* Adapter,适配器模式
  * 主要内容：将一类的接口转换成客户希望的另外一个接口，Adapter模式使得原本由于接口不兼容而不能一起工作那些类可以一起工作。
  * 应用场景:

* Decrator，装饰模式
  * 主要内容：动态地给一个对象增加一些额外的职责，就增加的功能来说，Decorator模式相比生成子类更加灵活。
  * 应用场景:

* Bridge，桥模式
  * 主要内容：将抽象部分与它的实现部分相分离，使他们可以独立的变化。
  * 应用场景:

* Flyweight，享元模式
 * 主要内容:
 * 应用场景:

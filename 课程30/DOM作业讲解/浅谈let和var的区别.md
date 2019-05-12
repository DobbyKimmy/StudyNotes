# 浅谈let和var的区别

## 关于var

首先来看一看MDN对于var的解释：

````
1: 变量声明，无论发生在何处，都在执行任何代码之前进行处理。（变量提升）
2: 声明变量的作用域限制在其声明位置的上下文中，而非声明变量总是全局的
3: 如果你重新声明一个JavaScript变量，它将不会丢失其值
... ...
````

我只摘抄了一部分特性，但是这一部分特性就已经能够让我们明白var与let的区别了，在谈var与let的区别之前，我们先简单看一下var的这些特性。

#### var的变量提升及作用域

首先来看一道面试题：请问下面的代码会打印出什么样的结果？

````javascript
var a = 99;
f();
console.log(a);
function f(){
    console.log(a);
    var a = 10;
    console.log(a);
}
````

这道题的考点是作用域及变量提升，首先我们先将所有的变量进行提升：

````javascript
var a;
function f(){
    var a;
    console.log(a); 
    a = 10;
    console.log(a); 
}
a = 99;
f();
console.log(a);
````

结果为：

````
undefined
10
99
````

我们首先将全局变量a与函数f以及函数内部的局部变量a进行了变量提升，执行函数f时，由于函数f内部的第一个console.log打印的a在函数f这个作用域已经声明过了，但还并未赋值所以首先会打印出来undefined；在函数f内部的第二个console.log打印的结果则是赋值以后的a,且这个a仍然是函数这个作用域中的a，所以打印出来的结果为 10;在 代码最后的console.log中的a则是当前作用域即全局变量的a，这个a声明过且赋值为99，所以最后一个结果是99。如果你完全理解了这道题目，那么相信你自然会了解var的变量提升以及作用域。

#### 一不小心就声明了全局变量

我们首先来看一个MDN的例子：

````javascript
function x() {
  y = 1;   // 在严格模式（strict mode）下会抛出 ReferenceError 异常
  var z = 2;
}
x();
console.log(y); // 打印出结果1
console.log(z); // ReferenceError: z 未在 x 外部声明
````

在函数x的内部，我们未对y变量进行任何声明而是直接对其进行了赋值，这样做，我们一不小心就声明了一个全局变量，我们的本意是在函数x的内部声明一个局部变量，但是在函数x的外部使用console.log也是能打印出来y的值，其实上面的代码相当于：

````javascript
var y = 1;
function x(){
    var z;
    y = 1;
    z = 2;
}
x();
console.log(y);
console.log(z);
````

#### 关于第三点解释

````
3: 如果你重新声明一个JavaScript变量，它将不会丢失其值
````

关于第三点解释，我们用自己的话来翻译一下

````
var 可以重复对一个变量进行声明，但是无论怎么声明它都是那个当前作用域的那个变量
````

听起来有些难懂，我们不妨看一下代码：

````javascript
HTML中有：
<div id=parent></div>
=====================>我是分割线<=====================
在script标签中：
var parent = document.getElementById('parent');
试问：
console.log(parent);
console.log(window.parent);
这两个结果在浏览器的控制台中分别打印出什么？
````

答案为：

````
打印出的结果均为：id为parent的div元素
````

实际上，我们声明了一个已经声明过的全局属性，window.parent全局属性为：如果有父窗口，即返回父窗口；如果没有则返回当前窗口。在本例中，我们对parent再次声明，并且我们对声明的变量进行了赋值，这也相当于对原有的全局属性parent进行了覆盖。也就是说：

````javascript
var a = 1;
var a = 2;
var a = 3;
var a = 4;
console.log(a);
````

这段代码没有语法错误，不过它相当于：

````javascript
var a;
a = 1;
a = 2;
a = 3;
a = 4;
console.log(a);
````

## 关于let

我们还是先看一下MDN对于let的解释：

````
1: let的作用域是块，而var的作用域是函数
2: 一个作用域中用let重复定义一个变量将引起 TypeError
... ... 
````

let的解释，我也只是摘抄了一部分，如果你想更加详细地了解，可以搜索MDN~~~

#### let的作用域

`let`声明的变量只在其声明的块或子块中可用，这一点，与`var`相似。二者之间最主要的区别在于`var`声明的变量的作用域是整个封闭函数。 示例如下：

````javascript
{
    var dobby = 666;
}
console.log(dobby); // 打印出666
{
    let kim = 666;
}
console.log(kim); // 报错ReferenceError,kim is not defined
````

MDN上的例子更加生动形象，我就借来用一下了 : -)

````javascript
function varTest() {
  var x = 1;
  if (true) {
    var x = 2;  // 同样的变量!
    console.log(x);  // 2
  }
  console.log(x);  // 2
}

function letTest() {
  let x = 1;
  if (true) {
    let x = 2;  // 不同的变量
    console.log(x);  // 2
  }
  console.log(x);  // 1
}
````

从上面的例子可以看出来，let的作用域，我们回过头再来看一看这个问题：

````javascript
HTML中有：
<div id=parent></div>
=====================>我是分割线<=====================
在script标签中：
var parent = document.getElementById('parent');
````

如果我们非要使用parent这样一个变量（当然不推荐，因为全局属性可耻！），让它表示id为parent的div元素，并且我们希望全局属性window.parent不受影响，我们就可以使用let~

````javascript
{
    let parent = document.getElementById('parent');
    console.log(parent);
}
console.log(window.parent);
// 除此之外，也可以使用立即执行函数,因为再次强调var的作用域是函数
(function(){
    var parent = document.getElementById('parent');
    console.log(parent);
}).call();
````

#### let没有变量提升

与var不同，let没有变量提升，没有变量提升，没有变量提升。还是借用一下MDN的好例子 :-)

````javascript
function do_something() {
  console.log(bar); // undefined
  console.log(foo); // ReferenceError: foo is not defined
  var bar = 1;
  let foo = 2;
}
````

我们来看一下阮一峰的解释：

````
ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）
````

其实简单一句话概括就是：let不存在变量的提升，这样是和var的区别之一

#### 重复定义let变量会引起错误

直接上示例：

````javascript
{
    let dobby = 1;
    let dobby = 2;// TypeError thrown.
}
````

没什么好解释的 :-)

## 一道面试题

````javascript
for (var i = 0; i <10; i++) {  
  setTimeout(function() {  
    console.log(i);        
  }, 1000);
}
````

与

````javascript
for (let i = 0; i <10; i++) {  
  setTimeout(function() {  
    console.log(i);        
  }, 1000);
}
````

两个代码打印的结果是什么？

<br>

这是一道已经被玩烂的面试题，因为我还没有学习到JS的事件循环机制，如果真的让我说出个之所以然来，我的确无法进行详细的说明，但是在后续，我会继续将这道题单独写一篇博客，好好深入研究其中的机制与奥秘~

````
var 循环的结果为：10个10
let 循环的结果为：0，1，2，3，4，5，6，7，8，9
````

其实抛开上面的诸多知识点，我们也可以简单先进行一波分析，对于var循环来讲,我们可以先这样写：

```javascript
var i;
for (i = 0; i <10; i++) {  
  setTimeout(function() {  
    console.log(i);        
  }, 1000);
}
```

由于var的变量提升机制，我们实际上相当于声明了一个全局变量，再回顾下这个代码：

````javascript
var a;
a = 1;
a = 2;
a = 3;
a = 4;
console.log(a);
````

在var循环中，其实我们打印的i 就是全局的唯一的那个变量，所以会打印出10个10；而对于let的循环则不同，我们回顾一下let的作用域，当i在for循环这个块使用时，则不会收到外部的一些影响。

## 总结

var 和 let 究竟有哪些不同呢？

1. var的作用域是函数，而let的作用域则是块
2. var有变量提升，而let则没有
3. var可以重复定义，但是在一个scope内，重复定义也只是那一个变量，而重复定义let变量则会引起TypeError错误

如有错误，还请指出，不甚感激~
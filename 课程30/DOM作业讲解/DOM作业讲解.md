1. 阮一峰 JS在线教程的地址

   [阮一峰JS](javascript.ruanyifeng.com)

2. DOM的英文全称是

   **Document Object Model**

3. DOM有自己的国际标准，目前的通用版本为

   **DOM 3**

4. DOM的最小组成单位叫

   **节点 Node**

5. 节点的类型有7种，分别是

   - Document
   - DocumentType
   - Element
   - Attribute
   - Text
   - Comment
   - DocumentFragment

6. DOM树的根节点

   **html**

7. 元素Element 的 NodeType 值为

   **1 或者是 Node.ELEMENT_NODE**

8. document.body.nodeName

   **'BODY'**

9. 问，x.nextSibling的值？

   ````
   <div id=x></div>
   <div id=y></div>
   ````

   **回车构成的文本节点**

10. ``<div id=x></div>`` x的值是？

    **就是id为x的div对应的Element对象**

11. ``<div id=parent></div>`` parent的值为？

    **如果有父窗口，就是父窗口。如果没有就是当前窗口，即：window**

    *解析*

    ````javascript
    上一题，之所以能够返回id为x的Element对象，是因为x并不是一个window的属性；
    而本题目中，我们在控制台打印出parent:console.log(parent)；返回的结果为:window对象
    这是因为，parent本来就是全局对象window的一个属性。
    parent这个属性返回的值为：如果有父窗口，即返回父窗口；如果没有则返回当前窗口。
    
    那我们有没有办法获取这个div元素呢？
    var parentDiv = document.getElementById('parent');
    or
    var parentDiv = document.querySelector('#parent');
    
    但是，还有一个问题~
        
    假如我们这样写：var parent = document.getElementById('parent');
    打印出parent：console.log(parent);打印出的结果为：id为parent的div元素
    but
    当我们尝试打印：console.log(window.parent);时,打印出的结果仍然是id为parent的div元素
    这说明，我们定义的 parent将window全局变量中的parent属性覆盖掉了。
    
    这是更为严重的错误~
        
    所以，最好的方法是远离全局属性，如果非要使用，我们可以使用局部变量：
    
    function fn() {
            var parent = document.getElementById('parent');
            console.log(parent);
        }
    fn();
    
    将parent作为一个局部变量，在函数内部进行使用，再调用函数即可，
    这样调用函数，打印出来的parent则是id为parent的div元素，window.parent属性也没有被覆盖。
    
    但是这样做其实也有一些问题：
    1. 函数名怎么取？为了防止和全局对象window的属性及函数发生冲突，我们应该使用匿名函数
    2. 我们如果使用了匿名函数，我们应该怎样对函数进行调用？
    
    于是乎，就有了立即调用函数~
        
    立即调用函数的概念：声明一个函数，立即调用，就是立即调用函数
    立即调用函数存在的目的与意义：为了使用局部变量
    
    想到了函数的调用，我们自然就想到了call()
    call(this,arguments)
    
    立即调用函数使用方法1：
    
    (function(){
            var  parent = document.querySelectorAll('#parent')[0];
            console.log(parent);
     }).call();
    
    立即调用函数使方法2：
    
    (function(){
            var  parent = document.querySelectorAll('#parent')[0];
            console.log(parent);
     }.call());
    
    立即调用函数使用方法3,4,5,6：
    // 3
    - function(){
            var  parent = document.querySelectorAll('#parent')[0];
            console.log(parent);
     }.call();
    // 4
    + function(){
            var  parent = document.querySelectorAll('#parent')[0];
            console.log(parent);
     }.call();
    
    值得一提的是，立即调用函数使用方法3，4是在函数的前面加上了正负号，这种做法是在告诉浏览器：
    这不是一个函数的声明~当然，这都是ES6问世之前，老司机们想出的"奇巧淫技"
    
    // 5 取反
    !function(){
            var  parent = document.querySelectorAll('#parent')[0];
            console.log(parent);
     }.call();
    
    // 6 二进制取反
    ~function(){
            var  parent = document.querySelectorAll('#parent')[0];
            console.log(parent);
     }.call();
    
    ===============================>分割线<=============================
    当然在ES6以后，很少有人会这样做了~
    大家会这样:
    {
        let parent = document.getElementById('parent');// 在声明变量时，仍然要避免全局属性
        console.log(parent);
    }
    关于let,var，在我下面的链接中，可以进行更深入的了解~
    ````

    [浅谈let与var的区别](https://juejin.im/post/5cd7b97751882569094e7e8f)

12. ``<div id=parent1><div id=child1></div></div>`` 问：parent1.childNodes的值为：

    **{0:child1,length:1}伪数组**

13. 

    ````javascript
    var parent = document.getElementById('parent');
    parent.childNodes.length //2
    parent.appendChild(document.createElement('div'));
    parent.childNodes.length// 请问现在length是多少?
    
    // 答案
    3
    ````

    <br>

14. ````javascript
    var allDiv = document.querySelectorAll('div');
    allDiv.length //假设是2
    document.body.appendChild(document.createElement('div'))
    allDiv.length //请问 现在的length是多少？
    
    // 答案
    2
    ````

15. 上面两题，为什么一个length会动态变化，另一个length不会

    ````
    parent.childNodes是动态集合
    所谓动态集合就是一个活的集合：
    DOM树删除或者增加一个相关节点，都会立刻反应在NodeList中
    ===================
    而document.querSelectorAll方法返回的是一个静态的集合
    即：取出来的值放进了内存中，即便又添加了一个div
    但是这个值不会实时更新也就是说：
    DOM内部的变化，不会实时反应在该方法返回的结果中
    ====================
    ````

16. HTMLCollection与NodeList的区别有：

    ````
    1：HTMLCollection实例对象的成员只能是Element节点，NodeList实例对象可以包含其他节点
    2：HTMLCollection实例对象都是动态集合，NodeList实例对象可以是静态集合
    3：HTMLCollection实例对象可以用id属性引用节点元素，NodeList只能用数字索引引用
    ````

17. ChildNode接口用于处理子节点（包含但不限于Element子节点）。Element节点，DocumentType节点和CharacterData接口，部署了ChildNode接口。凡是这三列接口，都可以使用：

    ````
    1.remove()
    2.before()
    3.after()
    4.replaceWith()
    ````

    




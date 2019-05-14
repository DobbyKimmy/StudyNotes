# 有关于DOM(level 0)事件的一个小问题
问题1：
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>有关DOMLevel0的一个小问题</title>
    <script>
        function print() {
            console.log('hi');
        }
    </script>
</head>
<body>
    <!--下面那个按钮被点击后会在控制台上打印出"hi"?-->
    <button id="X" onclick="print">1</button>
    <button id="Y" onclick="print()">2</button>
    <button id="Z" onclick="print.call()">3</button>
</body>
</html>
````
答案：button2和3能够打印出来。在HTML中，属性onclick="要执行的代码".一旦用户点击，浏览器就会
eval("要执行的代码"),对于button1来说，相当于eval("print")
,即：相当于在控制台上输入print,它返回的值自然是一个函数 。而对于
button2以及button3来说，eval的字符串则是函数的执行语句。所以第二个button以及
第三个button会在控制台上成功执行函数print,并且打印出"hi"。
<br>
问题2：
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>有关DOM(level0)的一个小问题2</title>
</head>
<body>
<button id="X">1</button>
<button id="Y">2</button>
<button id="Z">3</button>
<script>
    function print() {
        console.log('hi');
    }
    // 当点击哪一个按钮时,会在控制台上打印出"hi"
    X.onclick = print;
    Y.onclick = print();
    Z.onclick = print.call();
</script>
</body>
</html>
````
答案：当按钮1被点击后，会在控制台上打印出"hi";
只要搞清楚``print``,``print()``以及``print.call()``返回的类型就可以
``print``是一个函数，让X的onclick属性指向这个函数，所以点击按钮1
自然会执行函数print,所以按钮1被点击之后，会在控制台上打印出hi。而对于按钮
2和3他们本质就是函数的执行后的返回值 print函数的返回值为undefined,所以
``Y.onclick = print();``或者是``Y.onclick = print.call();``都是让按钮的onclick属性指向了
undefined。
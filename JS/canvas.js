    var timer;
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        cirX = canvas.width/ 2,
        cirY = canvas.height/ 2,
        rad = Math.PI * 2 / 100,
        n = 1,
        speed = 150,
        r = 100;
    //绘制最外层细圈
    function writeCircle(){
        context.save();         //save和restore可以保证样式属性只运用于该段canvas元素
        context.beginPath();    //开始路径
        context.strokeStyle = "#ff841d";       //设置边线的颜色
        context.arc(cirX, cirY, r, 0, Math.PI * 2, false);      //画一个圆的路径
        context.stroke();       //绘制边线
        context.restore();
    }
    //绘制文本
    function writeText(n){
        context.save();
        context.strokeStyle = "#ff841d";
        context.font = "40px Arial";
        context.strokeText(n.toFixed(0)+"%",cirX - 30 ,cirY +10);
        context.stroke();
        context.restore();
    }
    //绘制蓝色外圈
    function writeBlue(n){
        context.save();
        context.strokeStyle = "#ff841d";
        context.lineWidth = 4;
        context.beginPath();
        context.arc(cirX, cirY, r, -Math.PI/2,-Math.PI/2+ rad*n, false);
        context.stroke();
        context.restore();
    }
    function DreamLoading(){
        //清除所有，重新绘制
        context.clearRect(0,0,canvas.width,canvas.height)
        writeCircle();
        writeText(n);
        writeBlue(n)
        if(n < 100){
            n= n+2;
        }else {
            n = 0;
        }
        // setTimeout(DreamLoading,speed);
        timer = requestAnimationFrame(DreamLoading);
    }
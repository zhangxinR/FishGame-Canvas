//1:创建分数类 dataObj
var dataObj = function(){
    //分数 +=100*double
    this.score = 0;
    //吃到食物种类  1 蓝色 2橙色
    this.double = 1;
    //判断游戏是否结束
    this.gameover = false;
    //GAMEOVER 透明度 0~1
    this.alpha = 0;
}
//2:添加绘制方法
dataObj.prototype.draw = function(){
    //1:保存画笔1状态
    ctx1.save();


    //2:修改填充样式
    ctx1.fillStyle = "#FFF";
    //3:修改字体大小
    ctx1.font = "35px Verdana";
    //4:居中
    ctx1.textAlign = "center";
    //5:绘制分数
    var w = canWidth;
    var h = canHeight;
    ctx1.fillText("SCORE:"+this.score,w*0.5,h-80);
    //5.1:如果当前游戏己经结束
    if(this.gameover){
        //5.2:修改文字透明度 0.00001 0.00007 -> 1
        this.alpha += deltaTime * 0.0002;
        this.alpha = this.alpha > 1 ? 1 : this.alpha;
        ctx1.fillStyle = "rgba(255,255,255,"+this.alpha+")";
        //5.3:绘制文字 GAMEOVER  大一些 画布中心
        ctx1.font = "55px Verdana";
        ctx1.fillText("GAMEOVER",w*0.5,h*0.5);
    }




    //6:恢复画笔1状态
    ctx1.restore();
}
//3:将data.js 挂载index.html
//4:在main.js 创建对象并且调用相应方法
//5:添加addScore方法添加分数
dataObj.prototype.addScore = function(){
       this.score += this.double * 100;
       this.double = 1; //默认吃蓝色食物
}
//wave.js
//1:创建吃食物特效类 waveObj
var waveObj = function(){
    this.x = [];//圆心
    this.y = [];
    this.r = [];//半径
    this.alive = []; //是否活动态 true false
}
//2:为特效类添加初始化方法
waveObj.prototype.init = function(){
    for(var i=0;i<this.num;i++){
        this.alive[i] = false; //默认不可见
        this.r[i] = 0;
        this.x[i] = 0;
        this.y[i] = 0;
    }
}
//3:为特效类添加绘制方法
waveObj.prototype.draw = function(){
    //1:保存画笔1状态
    ctx1.save();
    ctx1.lineWidth = 2;
    // ctx1.shadowBlur = 10;
    // ctx1.shadowColor = "red";
    //2:创建循环
    for(var i=0;i<this.num;i++){
        //3:判断当前特效对象是否活动
        if(this.alive[i]){
            //4:
            //5:变大 增加 r 100 停止 消失
            this.r[i] += deltaTime * 0.02;
            if(this.r[i]>50){
                this.alive[i] = false;
                return;
            }
            //变淡
            var alpha = 1 - this.r[i]/50;
            //6:开始一条新路径
            ctx1.beginPath();
            //7;画圆
            ctx1.strokeStyle = "rgba(255,255,255,"+alpha+")";
            ctx1.arc(this.x[i],this.y[i],this.r[i],0,2*Math.PI);
           // 8:闭合路径，描边
            ctx1.closePath();
            ctx1.stroke();
        }
    }
    //9:恢复画笔1状态
    ctx1.restore();
}
//4:为特效类添加属性数量 10
waveObj.prototype.num = 10;
//5:挂载 index.html
//6:在main.js 创建对应并调用方法
//7:为特效类添加出生方法
waveObj.prototype.born = function(x,y){
  //创建循环
  for(var i=0;i<this.num;i++){
      //查找第一个不活动状态特效对象
      if(!this.alive[i]){
          this.alive[i] = true;
          this.r[i] = 20;
          this.x[i] = x;
          this.y[i] = y;
          return;
      }
  }
}







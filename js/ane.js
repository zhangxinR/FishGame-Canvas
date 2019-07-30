//ane.js 保存海葵类,初始化，绘制方法
var aneObj = function(){
    //贝赛尔曲线=起始点;控制点;终点
    //start point ,control point,end point
    this.rootx = [];   //start point  y值固定画布最底
    this.headx = [];   //end point x
    this.heady = [];   //end point y
    this.amp = [];     //-1~1
    this.alpha = 0;    //正弦函数角度
}
aneObj.prototype.num = 50;
aneObj.prototype.init = function(){
    //var h = canHeight;
    for(var i=0;i<this.num;i++){
        //起点坐标,终点坐标
        this.rootx[i] = i * 16 + Math.random()*20;
        //初始化时终点坐标x 与起点坐标x 一致1
        this.headx[i] = this.rootx[i];//是一条直线
        this.heady[i] = canHeight - 250 + Math.random()*50;
        this.amp[i] = Math.random() * 50 + 50;
    }
}
aneObj.prototype.draw = function(){
      //1:海葵是随着时间变化的
      this.alpha += deltaTime * 0.0008;
      var l = Math.sin(this.alpha);  //-1~1
    //2:
    //3:保存画笔2状态
      ctx2.save();
      //4:描边样式;透明度;圆角;描边宽度
      ctx2.strokeStyle = "#3b154e";
      ctx2.globalAlpha = 0.6;
      ctx2.lineCap = "round";
      ctx2.lineWidth = 20;
    //5:创建循环绘制路径
      for(var i=0;i<this.num;i++){
          //6:移动起始点
          ctx2.beginPath();
          //移动起始点
          ctx2.moveTo(this.rootx[i],canHeight);
          //7:绘制贝赛曲线
          //控制点x,控制点y  终点x,终点y
          this.headx[i] = this.rootx[i] + l * this.amp[i];
          ctx2.quadraticCurveTo(
              this.rootx[i],    //控制点x
              canHeight-100,    //控制点y
              this.headx[i],    //终点x
              this.heady[i]);   //终点y
          //8:描边
          ctx2.stroke();
      }
    //9:恢复画笔2状态
     ctx2.restore();
}



//1:创建海葵类
// var aneObj = function(){
//     //1.1:创建海葵x坐标 x   数组
//     this.x = [];
//     //1.2:创建海葵高度  len 数组
//     this.len = [];
// }
// //2:为海葵类添加属性数量 50
// aneObj.prototype.num = 50;
// //3:为海葵类添加方法     init
// aneObj.prototype.init = function(){
//     for(var i=0;i<this.num;i++){
//         //每个海葵，生长的位置随机，比较像自然生长
//         this.x[i] = i * 16 + Math.random()*20;
//         //每个海葵的高度，有基准值，再加一个随机数
//         this.len[i] = 200 + Math.random()*50;
//     }
// }
// //4:为海葵类添加方法     draw
// aneObj.prototype.draw = function(){
//     //1:保存状态
//     ctx2.save();
//     //2:描边样式
//     ctx2.strokeStyle = "#3b154e";
//     //3:半透明
//     ctx2.globalAlpha = 0.6;
//     //4:圆角
//     ctx2.lineCap = "round";
//     //5:描边的宽度
//     ctx2.lineWidth = 20;
//     //6:创建循环
//     for(var i=0;i<this.num;i++){
//         //7:创建新路径
//         ctx2.beginPath();
//         //8:先将画笔移动到画笔底端
//         ctx2.moveTo(this.x[i],canHeight);
//         //9:向上绘制直线
//         ctx2.lineTo(this.x[i],canHeight-this.len[i]);
//         ctx2.stroke();
//     }
//     //10:恢复状态
//     ctx2.restore();
//
// }
//5:将ane.js 挂载index.html
//6:在main.js 创建海葵类并且调用相应方法
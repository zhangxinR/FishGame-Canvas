//baby.js 小鱼类
//小鱼所有数据与行为
//1:创建小鱼类 babyObj
var babyObj = function(){
    //小鱼坐标
    this.x;
    this.y;
    //角度
    this.angle;
    //小鱼眼睛 (2)、身体(20)、尾巴(8)
    this.babyEye = [];
    this.babyBody = [];
    this.babyTail = [];
    //三个变量控制眼睛下标
    this.babyEyeIndex = 0;
    this.babyEyeStart = 1;
    this.babyEyeEnd = 2000;
    //三个变量控制身体下标
    this.babyBodyIndex = 0;
    this.babyBodyStart = 1;
    this.babyBodyEnd = 3000;
    //三个变量控制尾巴下标
    this.babyTailIndex = 0;
    this.babyTailStart = 1;
    this.babyTailEnd = 200;
}
//2:为小鱼类添加初始化方法
babyObj.prototype.init = function(){
   //位置/角度/图片
   this.x = canWidth * 0.5;
   this.y = canHeight * 0.5;
   this.angle = 0;

   //眼睛
   for(var i=0;i<2;i++){
      this.babyEye[i] = new Image();
      this.babyEye[i].src = "src/babyEye"+i+".png";
   }
   //身体
   for(var i=0;i<20;i++){
       this.babyBody[i] = new Image();
       this.babyBody[i].src = "src/babyFade"+i+".png";
   }
   //尾巴
   for(var i=0;i<8;i++){
       this.babyTail[i] = new Image();
       this.babyTail[i].src = "src/babyTail"+i+".png";
   }
   //console.log(this.babyEye);
   //console.log(this.babyBody);
   //console.log(this.babyTail);
}
//3:为小鱼类添加绘制方法
babyObj.prototype.draw = function(){
    ///#修改小鱼坐标游动角度
    this.x = lerpDistance(mom.x,this.x,0.98);
    this.y = lerpDistance(mom.y,this.y,0.99);
    //计算坐标差 大鱼小鱼
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    //计算角度差 大鱼小鱼
    var beta = Math.atan2(deltaY,deltaX)+Math.PI;
    //计算新角度
    this.angle = lerpAngle(beta,this.angle,0.9);
    //#修改小鱼眼睛身体尾巴下标
    //眼睛下标
    this.babyEyeStart += deltaTime;
    if(this.babyEyeStart>this.babyEyeEnd){
       this.babyEyeIndex = (this.babyEyeIndex+1)%2;
       this.babyEyeStart = 1;
       if(this.babyEyeIndex == 0){
           this.babyEyeEnd = 2000;
       }
       if(this.babyEyeIndex == 1){
           this.babyEyeEnd = 200;
       }
    }
    //身体下标 20
    this.babyBodyStart += deltaTime;
    if(this.babyBodyStart > this.babyBodyEnd){
       this.babyBodyIndex = (this.babyBodyIndex+1)%20;
        this.babyBodyStart = 1;
    }
    //尾巴下标 8
    this.babyTailStart += deltaTime;
    if(this.babyTailStart > this.babyTailEnd){
        this.babyTailIndex = (this.babyTailIndex+1)%8;
        this.babyTailStart = 1;
    }


    //1:保存画笔状态
    ctx1.save();
    //2:平移原点
    ctx1.translate(this.x,this.y);
    //3:设置旋转角度
    ctx1.rotate(this.angle);
    var eye = this.babyEye[this.babyEyeIndex];
    var body = this.babyBody[this.babyBodyIndex];
    var tail = this.babyTail[this.babyTailIndex];
    //4:绘制小鱼身体
    ctx1.drawImage(body,-body.width*0.5,-body.height*0.5);
    //5:绘制小鱼尾巴
    ctx1.drawImage(tail,-tail.width*0.5+23,-tail.height*0.5);
    //6:绘制小鱼眼睛    10:55
    ctx1.drawImage(eye,-eye.width*0.5,-eye.height*0.5);
    //7:恢复画笔状态
    ctx1.restore();
}
//4:挂载  index.html
//5:在main.js 创建对象并调用相应方法
// 9:53
//mom.js 大鱼类所有数据与行为
//1:创建大鱼类 momObj
var momObj = function(){
    this.fruitNum = 0;  //吃到食物数量
    this.x;   //大鱼位置x,y
    this.y;
    this.angle;//大鱼游动角度
    this.bigEye =  []; //大鱼二只眼睛
    this.bigBody = []; //大鱼身体(8)张图片
    this.bigTail = []; //大鱼尾巴(8)张图片
    //创建三个变量:1:大鱼眼睛下标 0  1
    //             2:切换眼睛图标开始时间和结束时间
    //               计算睁眼时间  闭眼时间
    this.bigEyeIndex = 0;//眼睛下标 (0~1) 计时结束切下标
    this.bigEyeStart = 1;//计时开始
    this.bigEyeEnd = 2000;//计时结束

    this.bigTailIndex = 0;//尾巴下标 0~7
    this.bigTailStart = 1;//尾巴计时开始
    this.bigTailEnd = 200;//尾巴计时结束

    this.bigBodyIndex = 0;//身体下标 0~7
    this.bigBodyStart = 1;//身体下标计时开始
    this.bigBodyEnd = 3000;//身体下标计时结束

}
//2:为大鱼类添加初始化方法 init
momObj.prototype.init = function(){
    //大鱼初始化位置画布中央
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    //大鱼初始化角度0
    this.angle = 0;
    //初始大鱼眼睛2 创建图片对象 下载
    for(var i=0;i<2;i++){
        this.bigEye[i] = new Image();
        this.bigEye[i].src = "src/bigEye"+i+".png";
    }
    //初始大鱼身体8
    for(var i=0;i<8;i++){
        this.bigBody[i] = new Image();
        this.bigBody[i].src = "src/bigSwim"+i+".png";
    }
    //初始大鱼尾巴8
    for(var i=0;i<8;i++){
        this.bigTail[i] = new Image();
        this.bigTail[i].src = "src/bigTail"+i+".png";
    }
}
//3:为大鱼类添加绘制方法   draw
momObj.prototype.draw = function(){
    //this.x = mx;
    //this.y = my;

    //累加眼睛计时开始
    this.bigEyeStart += deltaTime;
    //如果计时开始时间大于结束
    if(this.bigEyeStart > this.bigEyeEnd){
        //切换下一张图片
        this.bigEyeIndex = (this.bigEyeIndex+1)%2;
        //计时开始恢复为初始值
        this.bigEyeStart = 1;

        //如果当前闭眼睛结束时间 200
        if(this.bigEyeIndex==1){
            this.bigEyeEnd = 200;
        }
        //如果当前睁眼睛结束时间 2000
        if(this.bigEyeIndex==0){
            this.bigEyeEnd = 2000;
        }
    }

    //#尾巴切换      9:36
    //累加尾巴计时开始
    this.bigTailStart += deltaTime;
    //如果尾巴计时开始大于结束时间
    if(this.bigTailStart > this.bigTailEnd){
        //切换下一张图片
        this.bigTailIndex = (this.bigTailIndex+1)%8;
        //计时开始恢复为初始值
        this.bigTailStart = 1;
    }
    //console.log(this.bigTailIndex);

   //#累加大鱼身体开始时间
   this.bigBodyStart += deltaTime;
   //#如果开始时间大于结束时间
   if(this.bigBodyStart > this.bigBodyEnd){
     //#下标加1
     this.bigBodyIndex = (this.bigBodyIndex+1)%8;
     //#开始时间恢复初始值
     this.bigBodyStart = 1;
   }
   //console.log(this.bigBodyIndex);
   //大鱼面向鼠标慢慢浮动过去 坐标
   this.x = lerpDistance(mx,this.x,0.98);
   this.y = lerpDistance(my,this.y,0.99);
    //修改大鱼游动角度
    //1:获取大鱼和鼠标坐标差
    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    //2:获取大鱼和鼠标角度差
    var beta = Math.atan2(deltaY,deltaX)+Math.PI;
    //3:通过函数计算大鱼新角度
    this.angle = lerpAngle(beta,this.angle,0.9);

    //1:保存画笔状态 ctx1
    ctx1.save();
    //2:平移原点，大鱼身体中间
    ctx1.translate(this.x,this.y);
    //3:设置大鱼旋转角
    ctx1.rotate(this.angle);
    //4:顺序 绘制大鱼身体 0
    //console.log(this.bigBody[0]);
    //console.log(-this.bigBody[0].width*0.5+":"+-this.bigBody[0].height*0.5);
    ctx1.drawImage(this.bigBody[this.bigBodyIndex],
                   -this.bigBody[this.bigBodyIndex].width*0.5,
                   -this.bigBody[this.bigBodyIndex].height*0.5);
    //5:顺序 绘制大鱼尾巴 0
    ctx1.drawImage(this.bigTail[this.bigTailIndex],
                   -this.bigTail[this.bigTailIndex].width*0.5+30,
                   -this.bigTail[this.bigTailIndex].height*0.5);
    //6:顺序 绘制大鱼眼睛 0
    ctx1.drawImage(this.bigEye[this.bigEyeIndex],
                   -this.bigEye[this.bigEyeIndex].width*0.5,
                   -this.bigEye[this.bigEyeIndex].height*0.5)
    //10:恢复画笔状态 ctx1
    ctx1.restore();
}
//4:将mom.js 挂载index.html
//5:在main.js 创建大鱼对象并且调用相关方法
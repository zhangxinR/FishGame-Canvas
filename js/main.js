//main.js 游戏入口程序
//保存所有游戏角色,并且负责初始游戏角色对象
//绘制游戏中不同角色

//1:创建变量保存游戏角色和数据
//1.1:创建四个变量保存画布和画笔
var can1 = null; //第一个画布
var can2 = null; //第二个画布
var ctx1 = null; //第一个画笔
var ctx2 = null; //第二个画笔
//1.2:创建2个变量保存画布宽度和高度
var canWidth=0;
var canHeight=0;
//1.3:创建1个变量保存背景图片
var bgPic = null;
//1.4:创建一个变量保存海葵对象
var ane = null;
//1.5:创建一个变量保存食物对象
var fruit = null;
//1.6:创建二个变量 保存上一帧执行时间
//    二帧之间时间差
var lastTime;   //上一帧执行时间
var deltaTime;  //二帧之间时间差
//1.7:创建一个变量 保存大鱼对象
var mom = null;
//1.8:创建二个变量，保存鼠标位置
var mx = 0;
var my = 0;
//1.9:创建一个变量，保存小鱼对象
var baby = null;
//1.10:创建一个变量，保存分数对象
var data = null;
//1.11 创建一个变量，保存大鱼吃食物特效对象
var wave = null;

//2:创建函数game 入口函数
function game(){
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}
//3:创建函数init  初始化函数负责初始化所有角色
function init(){
    //3.1 初始化画布，画笔背景图片
    can1 = document.getElementById("canvas1");
    can2 = document.getElementById("canvas2");
    ctx1 = can1.getContext("2d");
    ctx2 = can2.getContext("2d");
    bgPic = new Image();
    bgPic.src = "src/background.jpg";
    //3.2 初始化画布宽度和高度
    canWidth = can1.width;
    canHeight = can1.height;
    //3.3 创建海葵对象并且调用初始化方法
    ane = new aneObj();
    ane.init();
    //3.4 创建食物对象并且调用初始化方法
    fruit = new fruitObj();
    fruit.init();
    //3.5 创建大鱼对象并且调用初始化方法
    mom = new momObj();
    mom.init();
    //3.6:为画布1绑定事件mousemove,触发函数 onMouseMove
    can1.addEventListener("mousemove",onMouseMove,false);
    //3.7:创建小鱼对象并调用初始化方法
    baby = new babyObj();
    baby.init();
    //3.8:创建分类对象
    data = new dataObj();
    //3.9:创建大鱼吃食物特效对象并调用初始化方法
    wave = new waveObj();
    wave.init();
}
//4:创建函数gameloop 负责定时绘制游戏中角色
function gameloop(){
    //4.1:创建智能定时器调用gameloop函数
    requestAnimFrame(gameloop);
    //4.2:绘制背景图片
    drawBackground();
    //4.3:计算二帧时间差
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    if(deltaTime>40){
        deltaTime = 40;
    }
    //console.log(deltaTime);
    //4.3.1 清除第一个画布
    ctx1.clearRect(0,0,canWidth,canHeight);
    //4.3.2: 碰撞检测
    momFruitsCollision();  //大鱼食物
    //4.3.3:大鱼碰撞小鱼
    momBabyCollision();
    //4.5:监听画布食物数量
    fruitMonitor();
    //4.6:绘制海葵
    ane.draw();
    //4.7:绘制食物
    fruit.draw();
    //4.8:绘制大鱼
    mom.draw();
    //4.9:绘制小鱼
    baby.draw();
    //4.10:绘制分类
    data.draw();
    //4.11:绘制大鱼吃食物特效
    wave.draw();
}
//5:页面加载成功后调用game函数
document.body.onload = game;
//获取画布1上鼠标位置
function onMouseMove(e){
    //1:获取鼠标相对画布偏移 e.offsetX offsetY
    //                       e.layerX  layerY
    //2:获取mx
    if(e.offsetX || e.layerX){
       mx = e.offsetX == undefined ? e.layerX:e.offsetX;
    }
    //3:获取my
    if(e.offsetY || e.layerY){
       my = e.offsetY == undefined ? e.layerY:e.offsetY;
    }
    //console.log(mx+":"+my);
}
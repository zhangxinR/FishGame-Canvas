//fruit.js  保存食物相关数据与操作
//1:创建食物类 fruitObj

//1:创建食物类
var fruitObj = function(){
    this.alive = []; //是否活动状态boolean
    this.orange  = new Image();//橙色图片
    this.blue = new Image();   //蓝色图片
    this.x = [];   //位置
    this.y = [];
    this.l = [];   //食物长度 0~14
    this.spd = []; //食物速度 生长 漂浮
    this.fruitType = [];//食物类型 "orange" "blue"

}
//2:添加数量
fruitObj.prototype.num = 30;
//3:添加初始化方法
fruitObj.prototype.init = function(){
    for(var i=0;i<this.num;i++){
        this.alive[i] = false; //初始化海葵不活动
        this.x[i] = 0;
        this.y[i] = 0;
        this.l[i] = 0;
        this.spd[i] = Math.random()*0.017+0.003;
        this.fruitType[i] = "";
    }
    this.orange.src = "./src/fruit.png";
    this.blue.src = "./src/blue.png";
}
//4:添加绘制方法
fruitObj.prototype.draw = function(){
    //find an ane,grow,fly up
    for(var i=0;i<this.num;i++){
        if(this.alive[i]){
            if(this.l[i]<14){
                this.l[i] += this.spd[i] * deltaTime;//变大
            }else{
                this.y[i] -= this.spd[i] * 3 * deltaTime;//向上漂浮
            }

            if(this.fruitType[i] == "blue"){
                var pic = this.blue;
            }else{
                var pic = this.orange;
            }
            ctx2.drawImage(pic,
                this.x[i],this.y[i],
                this.l[i],this.l[i]);

            //如果当前食物漂出屏幕状态->false
            if(this.y[i]<10){
                this.alive[i] = false;
            }
        }
    }
}
//5:挂载到index.html文件中
//6:在main.js 创建对象并且调用相关方法
//监视画布是否有15个活动状态食物,不足
function fruitMonitor(){
    var num = 0;
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i])num++;
    }
    if(num<15){
       sendFruit();
       return;
    }
}
//在不活动状态食物中挑一个,第一个不活动状态的食物
function sendFruit(){
    for(var i=0;i<fruit.num;i++){
        if(!fruit.alive[i]){
            fruit.born(i);
            return;
        }
    }
}
//出生
fruitObj.prototype.born = function(i){
    //找一个海葵,依据海葵计算食物x y 状态 图片
    var aneId = Math.floor(Math.random()*ane.num);
    //终点坐标headx heady
    this.x[i] = ane.headx[aneId];
    this.y[i] = ane.heady[aneId];
    this.alive[i] = true;
    this.l[i] = 0;
    this.fruitType[i] = Math.random()<0.9?"blue":"orange";
}
// var fruitObj = function(){
//     this.alive = [];          //1.1:是否活动bool
//     this.blue = new Image();  //1.2:二张图片
//     this.orange = new Image();
//     this.x = [];              //1.3坐标 x y
//     this.y = [];
//     this.spd = [];            //1.4速度
//     this.l = [];              //1.5长度(食物长大)
//     this.fruitType = [];     //1.6类型
// }
// //2:添加属性数量 30
// fruitObj.prototype.num = 30;
// //3:添加方法 init
// fruitObj.prototype.init = function(){
//     for(var i=0;i<this.num;i++){
//         this.alive[i] = true;
//         this.x[i] = i * 25 + Math.random() * 25;
//         this.y[i] = 400 + Math.random() * 100;
//         this.spd[i] = Math.random() * 0.017 + 0.003;
//         this.l[i] = 0;
//         this.fruitType[i] = Math.random() < 0.9 ? "blue":"orange";
//     }
//     this.blue.src = "src/blue.png";
//     this.orange.src = "src/fruit.png";
// }
// //4:添加方法 draw
// fruitObj.prototype.draw = function(){
//     for(var i=0;i<this.num;i++){
//         //1:判断当前食物是否活动状态
//         if(this.alive[i]){
//             //2:生长 0 ~14   this.l 0
//             if(this.l[i]<14){
//                 this.l[i]+=this.spd[i] * 3;
//             }else{
//                 //3:向上漂浮     this.y -
//                 this.y[i]-=this.spd[i] * 15;
//             }
//             //4:判断类型 blue orange
//             if(this.fruitType[i] == "blue"){
//                 var pic = this.blue;
//             }else{
//                 var pic = this.orange;
//             }
//             //5:绘制
//             ctx2.drawImage(pic,this.x[i],
//                 this.y[i],this.l[i],this.l[i]);
//         }
//       }
//
// }
//5:将fruit.js 挂载 index.html
//6:在main.js 中创建食物对象并且调用相关方法
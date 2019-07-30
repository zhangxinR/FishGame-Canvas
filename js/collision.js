//momFruitsCollision

/**
 * 碰撞检测   大鱼碰撞食物
 */
function momFruitsCollision(){
    //1:创建循环，循环所有食物
    for(var i=0;i<fruit.num;i++){
        //2:判断当前食物是否活动态
        if(fruit.alive[i]){
            //3:计算当前食物与大鱼距离
            var l = calLength2(fruit.x[i],fruit.y[i],
                mom.x,mom.y);
            //4:如果距离小于 30像素
            if(l<900){
                //5:当前食物状态改变 false
                fruit.alive[i] = false;
                //大鱼吃食物数量+1  吃食物数量
                mom.fruitNum += 1;
                if(fruit.fruitType[i] == "orange"){
                    data.double = 2;
                }else{
                    data.double = 1;
                }
                data.addScore();  //吃到食物增加分数
                wave.born(fruit.x[i],fruit.y[i]);//吃到食物显示特效
            }

        }
    }

}
//1:挂载index.html
//2:在main.js gameloop()

/**
 * 碰撞检测   大鱼碰撞小鱼
 */
function momBabyCollision(){
    //0:大鱼必须要吃到食物后，才能喂小鱼???
   //    如果大鱼没有吃到食物不能喂小鱼
    //大鱼没有吃到食物不能喂小鱼
    if(mom.fruitNum == 0){return;}
    //1:计算大鱼和小鱼之间距离
    var l = calLength2(mom.x,mom.y,baby.x,baby.y);
    //2:如果距离小于<900  小于30像素
    if(l<900){
      //3:将小鱼身体图片改变第一张
      baby.babyBodyIndex = 0;
      //大鱼喂小鱼后，食物数量清零
      mom.fruitNum = 0;
    }
}
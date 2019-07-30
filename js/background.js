//background.js 绘制背景图片
function drawBackground(){
  ctx2.drawImage(bgPic,0,0,canWidth,canHeight);
}
//1:将backgroun.js 挂载index.html文件中
//2:将drawBackground() 在main.js gameloop调用
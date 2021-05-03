var pacman,pacmanImage,out,outImage;
var ghost,ghostImage;
var edges;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstacleImage1,obstacleImage2,obstacleImage3,obstacleImage5,obstacleImage4,obstacleImage6;
var dotsGroup;
var life = 3
var score = 0;
var totalDots = 0;
var eatenDots = 0;
var gameState = 0;
function preload(){
  pacmanImage = loadAnimation("Images/Closed.png","Images/open.png");
  obstacleImage1=loadImage("Images/obstacle1.png")
  obstacleImage2=loadImage("Images/obstacle2.png")
  obstacleImage3=loadImage("Images/obstacle3.png")
  obstacleImage4=loadImage("Images/obstacle4.png")
  obstacleImage5=loadImage("Images/obstacle5.png")
      ghostImage=loadImage("Images/Ghost.png")
 

}

function setup() {
  createCanvas(1280,570);
  edges = createEdgeSprites();
 
  dotsGroup = new Group();
  createDots(50,30,40,70);
  createDots(50,30,500,70);
  
  
 

// standing Dots
   
createStandingDots(11,30,40,100)
createStandingDots(11,1270,40,70)
createStandingDots(11,800,40,70)
createStandingDots(11,610,40,70)
createStandingDots(11,1030,40,70)
createStandingDots(11,370,40,70)

  pacman = createSprite(30,40,15,15)
  pacman.addAnimation("pacman",pacmanImage)
  pacman.scale=0.5;

  ghost = createSprite(1200,50,100,50)
  ghost.addImage("ghost",ghostImage)
  ghost.scale=0.8
 

  obstacle1 = createSprite(260,300,100,50)
  obstacle1.addImage("obstacle1",obstacleImage1)
  obstacle1.scale=1.8

 
  obstacle2 = createSprite(520,300,100,50)
  obstacle2.addImage("obstacle2",obstacleImage2)
  obstacle2.scale=1.8

  obstacle3 = createSprite(720,230,1050,50) 
  obstacle3.addImage("obstacle3",obstacleImage3)
  obstacle3.scale=3.0

  obstacle4 = createSprite(920,290,100,50)
  obstacle4.addImage("obstacle4",obstacleImage4)
  obstacle4.scale=1.5

  
  obstacle5 = createSprite(1150,300,100,50)
  obstacle5.addImage("obstacle5",obstacleImage5)
  obstacle5.scale=2.0


  

  

  
  
  


}


function draw() {
  background(0); 
 
  if(ghost.isTouching(pacman)){
     gameState = 0;
     CheckForLife()
  }
  

  if(keyDown("space")&&gameState===0){
    gameState = 1;
  }
  
  if(gameState===1){
  
  
  
  if (pacman.isTouching(edges)){
   if(pacman.x > 1280){
     pacman.x=10;
   }

   if(pacman.x<0){
     pacman.x=1250;
   }
   if(pacman.y>570){
     pacman.y=10;
   }
   if(pacman.y<0){
     pacman.y=550
   }
 }
 
 if (ghost.isTouching(edges)){
  if(ghost.x > 1280){
    ghost.x=10;
  }

  if(ghost.x<0){
    ghost.x=1250;
  }
  if(ghost.y>570){
    ghost.y=10;
  }
  if(ghost.y<0){
    ghost.y=550
  }
}


/*
 if(ghost.isTouching(edges)){
  ghost.bounceOff(edges);
}*/
  if (pacman.isTouching(obstacle1)){
      pacman.collide(obstacle1)
  }
  if (pacman.isTouching(obstacle2)){
       pacman.collide(obstacle2)
}
if (pacman.isTouching(obstacle3)){
  pacman.collide(obstacle3)
}
if (pacman.isTouching(obstacle4)){
  pacman.collide(obstacle4)
}
if (pacman.isTouching(obstacle5)){
  pacman.collide(obstacle5)
}
  
  /*  if(ghost.isTouching(obstacle1)){
        ghost.bounceOff(obstacle1);
    }
    if(ghost.isTouching(obstacle2)){
      ghost.bounceOff(obstacle2);
  }
 if(ghost.isTouching(obstacle3)){
    ghost.bounceOff(obstacle3);
}
if(ghost.isTouching(obstacle4)){
  ghost.bounceOff(obstacle4);
}
if(ghost.isTouching(obstacle5)){
  ghost.bounceOff(obstacle5);
}
if(ghost.isTouching(obstacle6)){
  ghost.bounceOff(obstacle6);
}*/
    

  if(keyDown("RIGHT_ARROW")){
      pacman.rotation=360
      pacman.setSpeedAndDirection(5,360);
      GhostSpeedAndDirection()
  }

  if(keyDown("LEFT_ARROW")){
    pacman.rotation=180
    pacman.setSpeedAndDirection(5,180);
     GhostSpeedAndDirection()
}

if(keyDown("UP_ARROW")){
  pacman.rotation=270
  pacman.setSpeedAndDirection(5,270);
  GhostSpeedAndDirection()
}

if(keyDown("DOWN_ARROW")){
  pacman.rotation=90
  pacman.setSpeedAndDirection(5,90);
  GhostSpeedAndDirection()
}

  for(var i = 0;i<totalDots;i++){
    if(dotsGroup.get(i)!== undefined&&dotsGroup.get(i).isTouching(pacman)){
       dotsGroup.get(i).destroy();
       score = score+50; 
       eatenDots++;
       }
  }
  
  if(eatenDots===149){
      ghost.destroy();
      pacman.destroy();
      fill("white")
       textSize(40)
       var win = text("You Lose",500,500)
  }}
  fill("white")
  textSize(40)
  text ("score: "+score,1000,550)
  text("life:"+life,50,550)
  drawSprites();
  
}
function CheckForLife(){
     life = life-1;
     if(life===0){
       pacman.destroy()
       ghost.destroy()
       gameState=0;
       fill("white")
       textSize(40)
       var gameOver = text("You Lose",500,500)
       
     }
     else{
       pacman.x=30;
       pacman.y = 40;
       ghost.x=1200;
       ghost.y = 50;
       pacman.setSpeedAndDirection(0,360)
       ghost.setSpeedAndDirection(0.180)
     }
}


function GhostSpeedAndDirection(){
  if(pacman.x < ghost.x){
    ghost.setSpeedAndDirection(5,180)
  }
  if(pacman.x > ghost.x){
    ghost.setSpeedAndDirection(5,180)
  }
   
  if(pacman.y < ghost.y){
    ghost.setSpeedAndDirection(5,270)
  }
  if(pacman.y > ghost.y){
    ghost.setSpeedAndDirection(5,90)
  }

}

function createDots(numberOfDots,x,y,startPosition){
      for(var i =0;i<numberOfDots;i++){
       var dots = createSprite(x*i+startPosition,y,10,10)
       dots.shapeColor = "Orange";
       dotsGroup.add(dots);
       totalDots++;
      }
}
function createStandingDots(numberOfDots,x,y,startPosition){
  for(var i =0;i<numberOfDots;i++){
   var dots = createSprite(x,y*i+startPosition,10,10)
   dots.shapeColor = "Orange";
   dotsGroup.add(dots);
   totalDots++;
  }
}
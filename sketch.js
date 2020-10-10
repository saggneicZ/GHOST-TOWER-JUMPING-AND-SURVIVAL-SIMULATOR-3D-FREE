var tower,towerImg,ghost,ghostImg,door,doorImg,climber,climberImg,bar;
var doorsGroup,climbersGroup,barsGroup;
var gameState= "PLAY";
var spookySound;

function preload(){
  
  towerImg=loadImage("tower.png");
  ghostImg=loadImage("ghost-standing.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  spookySound=loadSound("spooky.wav");
  
}

function setup(){
  
createCanvas(600,600);

  tower=createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  barsGroup=new Group();
  
}

function draw(){
  
 background(0);
  
  spookySound.loop();
  
  if(gameState==="PLAY"){
    
      
  
  if(tower.y>400) {
    
    tower.y=tower.width/2;
  }
  
  if(keyDown("SPACE")){
    ghost.velocityY=-10;
    
  }
  
  ghost.velocityY=ghost.velocityY+0.8;
  
  if(keyDown("LEFT")){
    ghost.x=ghost.x-3;
    
  }
  
  if(keyDown("RIGHT")){
    ghost.x=ghost.x+3;
    
  }
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(barsGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState= "END";
  }
    
    
 spawnDoors();   
 drawSprites();
  }
  
  if(gameState==="END"){
    fill("yellow");
    textSize(30);
    text("YOU ARE TOAST",230,250);
  }
    
  
}

function spawnDoors(){
 
  if(frameCount%250===0){
    door=createSprite(200,-50);
    door.addImage(doorImg);
    door.velocityY=1;
    door.lifetime=800;
    doorsGroup.add(door);
    door.x=Math.round(random(120,400));
    
    climber=createSprite(200,10);
    climber.addImage(climberImg);
    climber.velocityY=1;
    climber.lifetime=800;
    climbersGroup.add(climber);
    climber.x=door.x;
    
    bar=createSprite(200,15);
    bar.velocityY=1;
    bar.lifetime=800;
    barsGroup.add(bar);
    bar.shapeColor="green";
    bar.x=door.x;
    bar.height=2;
    bar.width=climber.width;
    ghost.depth=door.depth;
    ghost.depth+=1;
    
  }
}

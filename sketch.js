var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, zombieGroup;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var bullets = 10;
var bulletGroup;

var tiro;
var lose;
var win;
var life = 3;

var gameState = "fight";


function preload()
{
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  
  win = loadSound("assets/win.mp3")
  tiro = loadSound("assets/lose.mp3")
  lose = loadSound("assets/explosion.mp3")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  
  zombieImg = loadImage("assets/zombie.png");
}

function setup() 
{
  bulletGroup = new Group();
  zombieGroup = new Group();
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//criando o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

  heart1 = createSprite(displayWidth-150,40,20,20);
  heart1.visible = false;
  heart1.addImage("heart1", heart1Img);
  heart1.scale = 0.4;

  heart2 = createSprite(displayWidth-100,40,20,20);
  heart2.visible = false;
  heart2.addImage("heart2", heart2Img);
  heart2.scale = 0.4;

  heart3 = createSprite(displayWidth-150,40,20,20);
  heart3.visible = false;
  heart3.addImage("heart3", heart3Img);
  heart3.scale = 0.4;

}

function draw() 
{
  background(0); 

  if(gameState === "fight")
  {
    if (life === 3)
    {
     heart3.visible = true;
     heart2.visible = false;
     heart1.visible = false;
    }

    if (life === 2)
    {
     heart3.visible = false;
     heart2.visible = true;
     heart1.visible = false;
    }

    if (life === 1)
    {
     heart1.visible = true;
     heart2.visible = false;
     heart3.visible = false;
    }

    if(keyWentDown("space"))
    {
     bullet = createSprite(displayWidth-1150,player.y-30,20,10);
     bullet.velocityX = 20;
     bulletGroup.add(bullet);
     player.depth = bullet.depth;
     player.depth = player.depth+2;
     player.addImage(shooter_shooting);
     bullets = bullets-1;
     tiro.play();
  
    }
  
  
  
   
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0)
  {
   player.y = player.y+30
  }
  
  
  
  if(keyWentDown("space"))
  {
   
    player.addImage(shooter_shooting)
   
  }
  
  
  else if(keyWentUp("space"))
  {
    player.addImage(shooterImg)
  }
  
  enime();
  
  if(bullets === 0)
  {
    gameState = "bullets";
    lose.play();
  }

  if(zombieGroup.isTouching(bulletGroup))
  {
    for(var i=0;i<zombieGroup.length;i++)
    {
      if(zombieGroup[i].isTouching(bulletGroup))
      {
        zombieGroup[i].destroy();
        bulletGroup.destroyEach();
      }
    }
  }

  if(zombieGroup.isTouching(player))
  {
    for(var i=0;i<zombieGroup.length;i++)
    {
      if(zombieGroup[i].isTouching(player))
      {
        zombieGroup[i].destroy();
       
      }
    }
  }


  }





drawSprites();
  if (gameState === "end")
  {
    lose.play();
    textSize(60);
    fill("red");
    text("Voc?? Perdeu!", 400, 400);
    zombieGroup.destroy();
    player.destroy();
  }

  else if (gameState === "win")
  {
    win.play();
    textSize(60);
    fill("red");
    text("Voc?? Venceu!", 400, 400);
    zombieGroup.destroy();
    player.destroy();
  }

  else if (gameState === "bullets")
  {
    lose.play();
    textSize(60);
    fill("red");
    text("Voc?? n??o tem mais BALAS!", 400, 400);
    zombieGroup.destroy();
    player.destroy();
    bulletGroup.destroy();
  }


}

function enime() 
{
  if (frameCount %50===0)
  {
   zombie = createSprite(random(500,1100), random(100,500), 40, 40);
   zombie.addImage(zombieImg);
   zombie.scale = 0.15;
   zombie.velocityX = -3;
   zombie.debug = true;
   zombie.setCollider("rectangle", 0, 0, 400, 800);
   zombie.lifetime = 400;
   zombieGroup.add(zombie);
  }


}



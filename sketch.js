
//declaring all the variables
var monkey,monkeyImage,jungle,jungleImage,iground,gameState,stone,
stoneImage,banana,bananaImage,stoneGroup,foodGroup,checkpointNumber,
score,gameOver,gameOverImage,restart,restartImage;

//function for loading the imaes
function preload()
{
//loading the monkey Image
monkeyImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png",);

//loading the stone Image
stoneImage=loadImage("stone.png");

//loading the banana Image
bananaImage=loadImage("Banana.png");

//loading the Game Over Image
gameOverImage=loadImage("gameOver copy.png");


//loading the restart Image
restartImage=loadImage("restart.png");

//loading the jungle Image
jungleImage=loadImage("jungle2.jpg");



}


function setup() {

//creating the canvas
createCanvas(600,300); 

//creating the jungle sprite
jungle=createSprite(0,0,600,300);
jungle.addImage(jungleImage);

//creting the monkey sprite,animating it and scaling it
monkey=createSprite(40,250,20,20);
monkey.addAnimation("running",monkeyImage);
monkey.scale=0.1;

//assigning a value to the gameState
gameState="play";

//creating the invisible ground and making it invisible
iground=createSprite(40,270,900,20);
iground.visible=false;

//creating the stonegroup for the stones
stoneGroup=createGroup();

//creating the bananagroup for bananas
bananaGroup=createGroup(); 

//assigning an initial value to the score as 0
score=0;

//setting the collider radius for monkey
monkey.setCollider("rectangle",0,0,200,200);

//creating the gameOver sprite,adding its image , scaling it and making it invisible initially
gameOver=createSprite(200,150,20,20);
gameOver.addImage(gameOverImage);
gameOver.scale=0.6;
gameOver.visible=false;

//creating the restart sprite,adding its image,scaling it and making it invisible initially
restart=createSprite(200,170,20,20);
restart.addImage(restartImage);
restart.scale=0.6;
restart.visible=false;
}
  

  
function draw()
{
background("white");
checkpointNumber=score/10;
if(gameState==="play")
{
 jungle.velocityX=-(4+checkpointNumber*3);
if(jungle.x<30)
{
    jungle.x=jungle.width/2;
}

iground.velocityX=-3;
if(iground.x<0)
{
    iground.x=iground.width/2;
}
if(keyDown("space")&&gameState==="play"&&monkey.y>200)
{
monkey.velocityY=-16;
}
monkey.velocityY=monkey.velocityY+0.8;
switch(score)
{
    case 10: monkey.scale=0.12;
    case 20: monkey.scale=0.13;
    case 30: monkey.scale=0.14;
    case 40:  monkey.scale=0.15;
}

spawnStones();
spawnBananas();
destroyandscore();
endGame();

}
monkey.collide(iground);
if(mousePressedOver(restart))
{
    reset();
}
drawSprites();
text("score ; " + score,300,40,fill("red"),textSize(20));
}
function spawnStones()
{
    if(World.frameCount%110===0)
    {
        stone=createSprite(580,250,20,20);
        stone.addImage(stoneImage);
        stone.scale=0.2;
        stone.velocityX=-(6+checkpointNumber*3);
        stone.lifetime=140;
        stoneGroup.add(stone);
    }
}

function spawnBananas()
{
    if(World.frameCount%150===0)
    {
        rand=random(100,240);
        banana=createSprite(580,rand,20,20);
        banana.addImage(bananaImage);
        banana.scale=0.085;
        banana.velocityX=-(6+checkpointNumber*3);
        banana.lifetime=140;
        bananaGroup.add(banana);
    }
}

function destroyandscore()
{
    if(bananaGroup.isTouching(monkey))
    {
        bananaGroup.destroyEach();
        score=score+2;
    }
}

function endGame()
{
    if(stoneGroup.isTouching(monkey))
    {
        gameState=gameOver;
        stoneGroup.setVelocityEach(0);
        bananaGroup.setVelocityEach(0);
        jungle.velocityX=0;
        monkey.addImage(monkeyCollided);
        gameOver.visible=true;
        restart.visible=true;
        stoneGroup.destroyEach();
        bananaGroup.destroyEach();
        
        
    }
}

function reset()
{
 gameState="play";
 gameOver.visible=false;
 restart.visible=false;
  score=0;
}
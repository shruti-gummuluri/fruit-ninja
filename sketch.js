var PLAY = 1;
var END = 0;
var gameState = 1;
var knife;
var sword;
var fruitGroup, EnemyGroup;
var monster, enemy2


function preload() {
  sword = loadImage("sword.png")
  fruit1 = loadImage("fruit1.png")
  fruit2 = loadImage("fruit2.png")
  fruit3 = loadImage("fruit3.png")
  fruit4 = loadImage("fruit4.png")

  enemy2 = loadAnimation("alien1.png", "alien2.png")
  
  GO=loadImage("gameover.png")
}

function setup() {
  createCanvas(600, 600);
  knife = createSprite(40, 200, 20, 20)
  knife.addImage(sword)
  knife.scale = 0.5

  fruitGroup = new Group();
  EnemyGroup = new Group();
  score=0
}

function draw() {
  background("pink");

  if (gameState === PLAY) {
    fruits();
    enemy();
    knife.y = World.mouseY
    knife.x = World.mouseX
    if (fruitGroup.isTouching(knife)) {
      fruitGroup.destroyEach()
      score = score + 1
    } 
    else {
      if (EnemyGroup.isTouching(knife)) {
          gameState = END
          fruitGroup.setVelocityXEach(0);
        EnemyGroup.setVelocityXEach(0);
        fruitGroup.destroyEach();
         EnemyGroup.destroyEach();
        knife.addImage(GO)
        knife.x=300
        knife.y=300
        }
    }
    }
  
    drawSprites();
  text("score: "+score,500,30)

  }


  function fruits() {
    if (World.frameCount % 80 === 0) {
      fruitX = createSprite(400, 200, 20, 20)
      fruitX.scale = 0.3
      fruit = Math.round(random(1, 4))
      if (fruit == 1) {
        fruitX.addImage(fruit1);
      } else if (fruit == 2) {
        fruitX.addImage(fruit2);
      } else if (fruit == 3) {
        fruitX.addImage(fruit3);
      } else {
        fruitX.addImage(fruit4);
      }
      fruitX.y = Math.round(random(50, 340))
      fruitX.velocityX = -7
      fruitX.setLifetime = 100
      fruitGroup.add(fruitX)
    }
  }




  function enemy() {
    if (World.frameCount % 80 === 0) {
      monster = createSprite(600, 200, 20, 20)
      monster.addAnimation("moving", enemy2);
      monster.velocityX = -7
      monster.y = Math.round(random(50, 350))
      monster.setLifetime = 90
      EnemyGroup.add(monster);
    }
  }
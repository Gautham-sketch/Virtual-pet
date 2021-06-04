var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  drawSprites();
  if(lastFed >= 12){
    textSize(32);
    fill("Black");
    text("Last Fed Time : " + lastFed + " AM",70,30);
  }
  else if(lastFed === 0){
    textSize(32);
    fill("Black");
    text("Last Fed Time : 12AM",70,30);
  }
  else{
    textSize(32);
    fill("Black");
    text("Last Fed Time : " + lastFed + " PM",70,30);
  }
}
function lastFedtime(){
  database.ref('/').update({
    lastFed : lastFed
  })
}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function readFeedTime(time){
  database.ref('/').on({
    lastFed:time
  })
  lastFed=data.val();
  foodObj.updateFoodStock(lastFed);
}

function feedDog(){
  dog.addImage(happyDog);
  var food_stock = foodObj.getFoodStock();
  if(food_stock<=0){
    foodObj.updateFoodStock(food_stock*0);
  }
  else{
    foodObj.updateFoodStock(food_stock-1);
  }
  database.ref('/').update({
    FeedTime : hour()
  })
}
function addFoods(){
  foodS = foodS+1;
  database.ref('/').update({
    Food:foodS
  })
}
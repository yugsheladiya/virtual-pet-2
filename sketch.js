var dog,happyDogImg,dogImg;
var database,position;
var foodS,foodStock;
var Food;
var addFood,feed;
var fedTime,lastFed;

function preload()
{
	//load images here
  dog = loadImage("images/dogImg1.png");
  happyDogImg = loadImage("images/dogImg.png");
}

function setup() {
	createCanvas(1000, 700);

  dog = createSprite(900,250);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  dog.shapeColor = "cyan";

  database = firebase.database();

  foodStock = database.ref("food");

  foodStock.on("value",readStock);
  var dogposition = database.ref("dog/position");

  dogposition.on("value",readPosition,showError);

  food = new food();

  addFood = createButton("Add Food");
  addFood.position(500,70);
  addFood.mousePressed(AddFood);

  feed = createButton("feed the dog");
  feed.position(600,70);
  feed.mousePressed(FeedFood);
  
}


function draw() {  
  background("black");

 // if(keyWentDown(UP_ARROW)){
   // writeStock(foodS);
   // dog.addImg(happyDogImg);
  //}

  fedTime = database.ref("FeedTime");

  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  drawSprites();
  food.display();
  dog.display();

  //fill("red");
  //textSize(20);
  //text("press UP_ARROW to feed",100,50);
  //text("food:"+foods,100,100);
  //add styles here

}

function readStock(data){
foodS = data.val();
food.updateFood(foodS);
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  
  else{
    x = x-1;
  }
 
  database.ref('/').update({
    Food:x
  });
}

function AddFood(){

foodS++;

database.ref('/').update({
  Food:foodS,
})

}

function FeedFood(){

foodS--;
dog.addImage(happyDogImg);
database.ref('/').update({
  Food:foodS,
  FeedTime:hour()
})


}

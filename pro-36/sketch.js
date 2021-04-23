var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj,lastFed

//create feed and lastFed variable here


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
  dog.scale=0.25;


  feed=createButton("feed");
  feed.position(900,95);
 feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background("#20e8e4");
  
  foodObj.display();
console.log(foodS)
fedTime=database.ref("FeedTime").on("value",function(data){
  lastFed=data.val()
})
  
  var d= new Date()
  var s=d.getDate()+":"+d.getMinutes()
  textSize(30)
  fill("black")
  text(s,50,50)
  textSize(30)
  fill("black")
if(lastFed>=12){
  text("Lastfed: "+ lastFed% 12+ "PM", 250,50)
}else if(lastFed ==0){
  text("Lastfed: 12AM ",350,30)
}else{
  text("Lastfed:" + lastFed + "AM",250,50)
}

 

 
  drawSprites();
}


function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  foodS--;
  database.ref('/').update({
    Food:foodS,
    FeedTime : hour()
  })
var food_stock_val= foodObj.getFoodStock()
if(food_stock_val <= 0){
  foodObj.updateFoodStock(food_stock_val *0)
}else{
  console.log(food_stock_val -1)
  foodObj.updateFoodStock(food_stock_val -1) 
  
 
}

  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

  


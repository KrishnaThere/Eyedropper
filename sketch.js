let img
let a=5



function preload(){
  img= loadImage("img8.jpg")
}

function setup() {
  let canvas = createCanvas(windowHeight, windowHeight);
  canvas.parent("container");
  
 
}

function draw() {
  
    image(img,0,0,height,height,0,0,height,height)

  for(let i=height/(a*2);i<height;i+=height/a){
   for (let j=height/(a*2);j<height;j+=height/a){
     
     let imgGrid=get(i,j)
     noStroke()
     fill(imgGrid[0],imgGrid[1],imgGrid[2])
     rect(i-height/(a*2),j-height/(a*2),height/a,height/a)
    
      
    }  
  }

  textSize(40);
  fill(0, 0, 255);
  textAlign(LEFT, LEFT);
  text("CLICK for", mouseX+40, mouseY);
  text("next level", mouseX+40, mouseY+30)


  if(mouseIsPressed){
    a++
  }

}
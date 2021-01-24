var gap=30;
var dotSize= 25
var sliderCol= ('red')
var activeColor = 0;
var dot = [];
var img

function preload(){
  img1=loadImage('./assets/img/img1.png');
  img2=loadImage('./assets/img/img2.png');
  img3=loadImage('./assets/img/img3.png');
  dotImg=loadImage('./assets/img/dot');
  sound = loadSound('assets/sounds/click_1.mp3');
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  background(230)
  imageMode(CENTER)

  img=img1

  for (var x = 100; x < windowWidth-100; x+=gap) {
    for (var y = 100; y < windowHeight-100; y+=gap) {
      dot.push(new Dot(x, y, demo=false, img));
      push()
      noStroke()
      fill(150)
      ellipse(x,y,10)
      pop()
    }
  }

  title=createP('Draw with nails!')
  title.position(50,25)

  subtitle=createP('(click on the board to plug them – change color with the rgb sliders – follow the demo image if you want)')
  subtitle.position(250,35)
  subtitle.style('font-size', '8pt')

  sliderR=createSlider(0,255,125)
  sliderR.position(120,windowHeight-75)
  sliderR.input(getcolor)
  sliderG=createSlider(0,255,125)
  sliderG.input(getcolor)
  sliderG.position(120,windowHeight-50)
  sliderB=createSlider(0,255,125)
  sliderB.position(120,windowHeight-25)
  sliderB.input(getcolor)

  r=createP('R')
  r.position(95,windowHeight-100)
  g=createP('G')
  g.position(95,windowHeight-75)
  b=createP('B')
  b.position(95,windowHeight-50)

  btnDemo0=createButton('CLEAN');
  btnDemo0.position(windowWidth/2-90-37,windowHeight-55);
  btnDemo0.mouseClicked(demo0)
  btnDemo1=createButton('DEMO1');
  btnDemo1.position(windowWidth/2-37,windowHeight-55)
  btnDemo1.mouseClicked(demo1)
  btnDemo2=createButton('DEMO2');
  btnDemo2.position(windowWidth/2+90-37,windowHeight-55)
  btnDemo2.mouseClicked(demo2)
}

function draw() {
    for (var i = 0; i < dot.length; i++) {
      if (isOver(dot[i])) {
        dot[i].active = true;
        dot[i].update();
      } else {
        dot[i].active = false;
      }
      dot[i].display();
    }

    dot.push(new Dot(280,windowHeight-47, demo=true));
}

function isOver(temp_dot) {
  let dot = temp_dot;
  if (
    ((dot.x - dotSize/2) < mouseX) &&
    ((dot.x + dotSize/2)> mouseX) &&
    ((dot.y - dotSize/2) < mouseY) &&
    ((dot.y + dotSize/2) > mouseY)) {
    return true;
  } else {
    return false;
  }
}

function mouseClicked() {
  for (var i = 0; i < dot.length; i++) {
    if (dot[i].active) {
      dot[i].plugged = sliderCol;
      dot[i].built = true;
      sound.play()
    }
  }
}

function getcolor() {
  sliderCol='rgb('+ sliderR.value()+ ',' +sliderG.value()+ ',' +sliderB.value()+ ')'
}

class Dot {
  constructor(temp_x, temp_y, demo, img) {
    this.x = temp_x;
    this.y = temp_y;
    this.active = false;
    this.built = false;
    this.activeColor = sliderCol;
    this.plugged = sliderCol;
    this.demo=demo
    this.img=img
  }

  display() {
    if (this.active) {
      tint(color(this.activeColor));
      image(dotImg, this.x, this.y, dotSize, dotSize);
    } else if (this.built) {
      tint(color(this.plugged));
      image(dotImg, this.x, this.y, dotSize, dotSize);
    } else if (this.demo==true) {
      tint(color(this.activeColor));
      image(dotImg, this.x, this.y, dotSize, dotSize)
    }

    else {
      push()
      noStroke()
      fill(230)
      rect(this.x-15,this.y-15,30,30)
      pop()

      //guide col
      let c1 = this.img.get(this.x,this.y)
      noStroke()
      push()
      fill(c1)
      ellipse(this.x,this.y,dotSize)
      pop()
      //alpha
      push()
      fill(230,200)
      ellipse(this.x,this.y,dotSize)
      pop()

      push()
      noStroke()
      fill(150)
      ellipse(this.x,this.y,10)
      pop()
    }
  }
  update(temp_color) {
    this.activeColor = sliderCol;
  }
}

function demo0(){
  img=img1
  console.log('img3')
  for (var x = 100; x < windowWidth-100; x+=gap) {
    for (var y = 100; y < windowHeight-100; y+=gap) {
      dot.push(new Dot(x, y, demo=false, img));
      push()
      noStroke()
      fill(150)
      ellipse(x,y,10)
      pop()
    }}
}

function demo1(){
  img=img2
  console.log('img3')
  for (var x = 100; x < windowWidth-100; x+=gap) {
    for (var y = 100; y < windowHeight-100; y+=gap) {
      dot.push(new Dot(x, y, demo=false, img));
      push()
      noStroke()
      fill(150)
      ellipse(x,y,10)
      pop()
    }}
}

function demo2(){
  img=img3
  console.log('img3')
  for (var x = 100; x < windowWidth-100; x+=gap) {
    for (var y = 100; y < windowHeight-100; y+=gap) {
      dot.push(new Dot(x, y, demo=false, img));
      push()
      noStroke()
      fill(150)
      ellipse(x,y,10)
      pop()
    }}
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight)
}

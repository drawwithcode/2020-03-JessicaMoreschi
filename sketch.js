let myImage1;
let myImage2;
let dot1={x:[], y:[]};
let col1=[];
let dot2={x:[], y:[]};
let col2=[];
let mySong;
let cursMin;
let cursMax;
let startGame = false;
let amplitudeLevel = 1;
let musicStop = false;
let myB=[];
let ii=0;


function preload(){
  myImage1 = loadImage("./assets/images/imageDesk.jpg");
  myImage2 = loadImage("./assets/images/imageDesk.jpg");
  mySong = loadSound("./assets/sound/music.mp3");
}


function setup() {
  background(255);
  createCanvas(windowWidth,windowHeight);

  cursMin = width/25*20;
  cursMax = width/25*21;

  //image
  image(myImage1, 0, 0);
  myImage2.filter("invert");
  image(myImage2, 0, 0);

  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);

  //puntini
  const d = 20;
  for (let x = d; x < width; x += d) {
    for (let y = d; y < height; y += d) {

      let c1 = myImage1.get(x,y);
      col1.push(c1);
      dot1.x.push(x);
      dot1.y.push(y);
      let c2 = myImage2.get(x,y);
      col2.push(c2);
      dot2.x.push(x);
      dot2.y.push(y);
    }
  }
}


function draw() {
  background(255);

  var volume = 0;
  volume = analyzer.getLevel();
  volume = map(volume,0,1,0,50);

  //stop e play
  if ((mouseX>(cursMin+((cursMax-cursMin)/2))-((cursMax-cursMin)*0.8)) &&
  (mouseX<(cursMin+((cursMax-cursMin)/2))+((cursMax-cursMin)*0.8)) &&
  (mouseY<((height/3*2)+height/20)+((cursMax-cursMin)*0.8)) &&
  (mouseY>((height/3*2)+height/20)-((cursMax-cursMin)*0.8)) ){
    musicStop = true;
  } else if ((mouseX>(cursMin+((cursMax-cursMin)/2))-((cursMax-cursMin)*0.8)) &&
  (mouseX<(cursMin+((cursMax-cursMin)/2))+((cursMax-cursMin)*0.8)) &&
  (mouseY<((height/3*2)+height/20*2)+((cursMax-cursMin)*0.8)) &&
  (mouseY>((height/3*2)+height/20*2)-((cursMax-cursMin)*0.8)) ){
    musicStop=false};
  mySong.amp(amplitudeLevel);

  //rate
    let rateLevel = 1;
    if ((mouseX>cursMin && mouseX<cursMax) && (mouseY>height/3 && mouseY<height/3*2) && mouseIsPressed ==true) {
      rateLevel = map(mouseY,height/3,height/3*2,1,2);
      mySong.rate(rateLevel);
    } else {
      rateLevel = 1;
      mySong.rate(rateLevel);
    }

    if (mySong.isPlaying()==true){
      if (rateLevel<1.7){
        push();
        for(let s = 0; s < dot1.x.length; s++){
          noStroke();
          fill(col1[s]);
          ellipse(dot1.x[s], dot1.y[s], volume+10);
        }
        pop();
      }

      if (rateLevel>1.3){
        push();
        for(let s = 0; s < dot2.x.length; s++){
          noStroke();
          fill(col2[s]);
          ellipse(dot2.x[s]+10, dot2.y[s]+10, volume+10);
        }
        pop();
      }
    }

  //cursori
    if (startGame == true){
      push();
      noStroke();
      fill(0);
      rect(cursMin,height/3,cursMax-cursMin,(height/3*2)-height/3, width/10);
      fill(255);
      if ((mouseX>cursMin && mouseX<cursMax) && (mouseY>height/3 && mouseY<height/3*2) && mouseIsPressed ==true) {
        ellipse(cursMin+((cursMax-cursMin)/2),mouseY,(cursMax-cursMin)*0.8);
      } else {
        ellipse(cursMin+((cursMax-cursMin)/2), height/3*1.1, (cursMax-cursMin)*0.8)
      }
      pop();

      push();
      fill(255);
      textAlign(CENTER,CENTER);
      textSize((cursMax-cursMin)*0.3);
      text("RATE", cursMin+((cursMax-cursMin)/2), height/2);
      pop();

      push();
      noStroke();
      if (amplitudeLevel==1){fill(100)} else {fill(0)};
      ellipse(cursMin+((cursMax-cursMin)/2), (height/3*2)+height/20, (cursMax-cursMin)*0.8);
      pop();

      push();
      fill(255);
      textAlign(CENTER,CENTER);
      textSize((cursMax-cursMin)*0.4);
      textStyle(BOLD);
      text("| |", cursMin+((cursMax-cursMin)/2), (height/3*2)+height/20);
      pop();

      push();
      noStroke();
      if (amplitudeLevel==1){fill(0)} else {fill(100)};
      ellipse(cursMin+((cursMax-cursMin)/2), (height/3*2)+height/20*2.5, (cursMax-cursMin)*0.8);
      pop();

      push();
      fill(255);
      textAlign(CENTER,CENTER);
      textSize((cursMax-cursMin)*0.4);
      textStyle(BOLD);
      text(">", cursMin+((cursMax-cursMin)/2), (height/3*2)+height/20*2.5);
      pop();

      push();
      noStroke();
      if (amplitudeLevel==1){fill(0)} else {fill(100)};
      rectMode(CENTER);
      rect(cursMin+((cursMax-cursMin)/2), (height/3*2)+height/20*5, (cursMax-cursMin)*4,(cursMax-cursMin)*0.8, width/10);
      pop();

      push();
      fill(255);
      textAlign(CENTER,CENTER);
      textSize((cursMax-cursMin)*0.4);
      textStyle(BOLD);
      text("click for bones", cursMin+((cursMax-cursMin)/2), (height/3*2)+height/20*5);
      pop();
    }

    for(let i = 0; i < myB.length; i++) {
    myB[i].display();
    myB[i].updating();
  }
  }

// al click
  function mouseClicked(){

    addB();
    ii++;

    if (musicStop==true){
      amplitudeLevel = 0
    } else {amplitudeLevel = 1}

    if (mySong.isPlaying() == false) {
      mySong.play();
      startGame = true;
    }
  }


  //aggiungi Ball
  function addB() {
    const aB = new Ball (width/3+random(-200,200), height/4+random(-50,50));
    myB.push(aB);
  }


  //generatore fiocchi
class Ball {
    constructor(temp_x1, temp_y1){
    this.x1 = temp_x1;
    this.y1 = temp_y1;
  }

  display(){
    fill(255, 246, 197);
    noStroke();
    ellipse(this.x1, this.y1, 20);
    ellipse(this.x1, this.y1+20, 20);
    ellipse(this.x1+50, this.y1, 20);
    ellipse(this.x1+50, this.y1+20, 20);
    rect(this.x1, this.y1, 50, 20)
  }

  //caduta fiocchi
  updating(){
    this.y1 = this.y1+3;
  }
}

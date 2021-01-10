function setup(){
  checkSize();

  gameWidth= windowWidth;
  gameHeigth= windowWidth/(16/9);

  createCanvas(gameWidth,gameHeigth);

  btn = select('#playButton');
  btnImg = select('#playButtonImg');
  btnImg.style('width',gameWidth/4+'px');
  btn.style('left', gameWidth*0.5+'px');
  btn.style('top', gameHeigth*0.85+'px');
  btn.style('transform', 'translate(-'+gameWidth/8+'px,0%)');


  home = select('#homeButton');
  home.style('left', gameWidth*0.5+'px');
  home.style('top', gameHeigth*0.25+'px');

  btn.mousePressed(function(){
    if(!restart){
      btn.attribute('disabled',true)

      for(var i=0; i<positions.length; i++){
        createTimeout(i);
      }
    }else{
      stopPosition=-1;
    }
    restart = !restart;
  })


  imageMode(CENTER);
  bcg = loadImage("./slotmachine/sources/slots/background.png");
  icons=[];
  loadIcons();

  positions = [];
  for(var i=0; i< 5; i++){
    position = new Position(gameWidth/2-gameWidth/9*2+i*gameWidth/9);
    positions.push(position);
  }

  stopPosition=-1;
  restart = false;
}

function createTimeout(i){
  setTimeout(function(){
    stopPosition=i;
    if(i==4){
      checkWin()
      btn.removeAttribute('disabled');
    }
  },1000+1000*i);
}


function draw(){
  background(100);
  image(bcg,gameWidth/2, gameHeigth/2, gameWidth, gameHeigth);

  for(var i=0; i<positions.length; i++){
    if(stopPosition<i){
      positions[i].play();
    }else{
      positions[i].stop();
    }
    positions[i].display();
  }
}

class Icon{
  constructor(id,img){
    this.id=id;
    this.img=img;
  }
  display(xPosition){
    image(this.img,xPosition,gameHeigth/2,gameWidth/10,gameWidth/10)
  }
}

class Position{
  constructor(xPosition){
    this.xPosition=xPosition;
    this.icon=random(icons);
  }
  play(){
    this.icon = random(icons);
  }
  stop(){
    return this.icon.id;
    console.log(this.icon.id)
  }
  display(){
    this.icon.display(this.xPosition);
  }
}

function loadIcons(){
  for(var i=0; i<7;i++){
    img = loadImage("./slotmachine/sources/slots/"+i+".png");
    icon = new Icon(i,img);
    icons.push(icon);
  }
}

function checkWin(){
  win=false;
  if(checkSameIcon()){
    win=true;
  }
  if(win){
    alert("Du hast gewonnen!! Sende uns eine Mail an healthyego@icloud.com mit einem Screenshot vom letzten Durchgang. Es wartet ein toller Gewinn auf dich!")
  }else{
    alert("Pech gehabt! Versuch's nochmal.")
  }
}

function checkSameIcon(){
  if(
    positions[0].icon.id == positions[1].icon.id &&
    positions[0].icon.id == positions[2].icon.id &&
    positions[0].icon.id == positions[3].icon.id &&
    positions[0].icon.id == positions[4].icon.id){
    return true;
  }else {
    return false;
  }
}

function checkSize(){
  if(windowWidth/windowHeight < 1){
    alert("Nutze die Desktop Version oder drehe dein Gerät in den Landscape-Modus.");
  }
}

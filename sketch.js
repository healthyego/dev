var Value  =130;
var Length =39;
var song;
var playing = false;
var show = true;


var pictures1=[];
var pictures2=[];
var HE;

var spectrum;

function preload(){
  song = loadSound('sosi.mp3');
  HE = loadImage('HE.jpg');

  for (var i = 0; i< 10; i++){
    pic1= loadImage("Lisa/"+i+".JPG");
    pictures1.push(pic1);
  }
}


function setup(){
  cnv = createCanvas(windowWidth,windowHeight);
  fft = new p5.FFT(0.8,64);
}


function mousePressed(){
  togglePlay();
}

function draw(){
   background(0);

  if(show){
    HealthyEgo();
  }




  spectrum = fft.analyze();

  //pictures
  if(spectrum[Length]>Value){
    Pictures1();
  }

}



function Pictures1(){
  push();
  imageMode(CENTER);

  image(pictures1[round(random(0,pictures1.length-1))],windowWidth/2,windowHeight/2,(windowWidth-500),3456*((windowWidth-500)/5184));
  pop();
}

function HealthyEgo(){
  push();
  imageMode(CENTER);
  image(HE,windowWidth/2,windowHeight/2,(windowWidth-500),1748*((windowWidth-500)/2480));
  pop();
}

function tool(){

  for (var i = 0; i< spectrum.length; i++){
      var x = map(i, 0, spectrum.length, 0, width);
      var y =  map(spectrum[i], 0, 255, height, 0);
    }

}

function togglePlay() {
  if (playing) {
    song.pause();

  } else {
    song.loop();
  }
  playing = !playing;
  show=!show;
}


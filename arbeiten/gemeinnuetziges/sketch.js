var counter=0;
var cnv;
var divHeight;
var height;
var img;
var language;
var englishText;
var germanText;
var textcontent;
var yPosition=0;
var icons=[];
var bool=true;

function preload() {
  img = loadImage('../source/arbeiten/gemeinnuetziges/BLM.png');
  //englishText= loadStrings('../source/arbeiten/gemeinnuetziges/englishText.txt');
  //germanText= loadStrings('../source/arbeiten/gemeinnuetziges/germanText.txt');
  englishText = `As individuals and as an art and cultural association, we would be nothing without those sisters and brothers who struggle with institutional racism every day. Worldwide discrimination and racism, of which the murder of George Floyd in Minneapolis is only the tip of the iceberg, is never just a problem for those affected. We are privileged to address systematic grievances - especially in Germany - and demand change.<br><br>We have used our platform to collect donations for the association "ADEFRA" and the "Black Lives Matter" movement by selling a T-shirt designed by <a href="https://www.instagram.com/808textil/" target="_blank">808TEXTIL</a>. The entire profit of the campaign went to both organisations. The shirt is a tribute to Bashar Barakah Jackson - better known as Pop Smoke - who died far too young this year, and the hiphop culture of the 1990s. The music of Pop Smoke, who was considered a follower of the African-American civil rights activist Malcolm X, has been heard at protests throughout the USA in recent months. His murder in February has still not been solved by the police.`

  germanText = `Als einzelne Menschen sowie als Kunst- und Kulturverein wären wir nichts ohne jene Schwestern und Brüder, die jeden Tag mit institutionellem Rassismus zu kämpfen haben. Weltweit existierende Diskriminierung und Rassismus, bei denen der Mord an George Floyd in Minneapolis nur die Spitze des Eisbergs darstellen, sind niemals nur Problem der Betroffenen. Wir sind privilegiert, systematische Missstände - gerade auch in Deutschland - anzusprechen und Veränderung einzufordern.<br><br>Wir haben unsere Plattform genutzt, um durch den Verkauf eines von <a href="https://www.instagram.com/808textil/" target="_blank">808TEXTIL</a> gestalteten T-Shirts Spenden für den Verein „ADEFRA” und die „Black Lives Matter“ Bewegung zu sammeln. Der gesamte Gewinn der Aktion ging an die beiden Organisationen.Das Shirt ist eine Hommage an den dieses Jahr viel zu jung verstorbenen Bashar Barakah Jackson, besser bekannt als Pop Smoke, und die Hiphop-Kultur der 1990er. Die Musik von Pop Smoke, der als Anhänger des afroamerikanischen Bürgerrechtlers Malcolm X galt, war in den letzten Monaten bei Protesten überall in den USA zu hören. Seine Ermordung im Februar wurde bis heute nicht von der Polizei aufgeklärt.`


}

function setup (){

  cnv=createCanvas(windowWidth,windowHeight);
  cnv.style('z-index','-1');
  cnv.position(0,0);


  button= select('button');
  button.mousePressed(changeLanguage);
  textcontent= select('#text');
  language="DE";


  for (var i = 0; i < 530; i++) {
    icons[i]= new Icon();
  }


}

function draw(){
  if(frameCount<180){
    background(250);

    for(var i=0;i<icons.length;i++)
      {
        icons[i].fall();
        icons[i].show();
      }
  }else{
    //background(255,255);
    cnv.remove();
    noLoop();
    changeLanguage();
    select('img').show();
  }
}

class Icon{
  constructor(){
    this.x = random(0,width);
    this.y = random(-200,-100);
    this.z = random(0,20);
    this.yspeed = map(this.z,0,20,4,10);

  }

  fall(){
        this.y = this.y + this.yspeed;
        var g = map(this.z,0,20,0,0.2);
        this.yspeed = this.yspeed + g;
    }

    show(){
        var size = map(this.z,0,20,10,100);
        image(img,this.x,this.y,size,size);
    }
}





function changeLanguage(){

  if(language == "DE"){
    language= 'EN';
    textcontent.html(germanText);
  }else{
    language="DE";
    textcontent.html(englishText);
  }



  button.html(language);
}

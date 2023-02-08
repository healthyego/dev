//Hier wird die curtain Animation ersetellt:
//dafür werden zwei html div als schwarze vierecke erzeugt,
//die sobald das HE logo geladen wurde 1500ms warten und auseinaderlaufen,
//nach 1500 ms wird das HE logo gelöscht, um während des Auseinaderlaufens den Hintergrund sichtbar zu halten.
//Sind die beiden Vierecke jeweils am Rand angekommen, werden die Div elemente gelöscht,
//um den späteren Code nicht zu beeinflussen.

//Variablen Declaration_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
var leftRec;//Vaiabelen für Linken Curtain(=HTML DIV Rechteck)
var rightRec;//Vaiabelen für Rechten Curtain(=HTML DIV Rechteck)
var counter=0; //"Schrittweite" des Auseinaderlaufes, dient auch als schwellenwert bei Löschen der Elemente
var safetyOffset=20;//"Schnittrand" um zu verhindern, dass Hintergrund sichtbar ist wenn nicht gewollt
var start=false;//boolean zum start der Animation, damit Animation nicht started bevor HELogo geladen wurde
var logo;//Variable in der Logo gespeichert wird, wird gelöscht sobald Curtains auseinaderlaufen


var button;
var popup;
var hidden=true;

//Functions_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
/*
function setup(){
  //nur Verwenden falls nicht schon in anderem Code ausgerufen; setupCurtain wird in setup von index.html ausgerufen
  setupCurtain();
}
*/

function setupCurtain(){
  button = select('#popup_button');
  button.mousePressed(removeDiv);
  popup=select('#popup');
  popup.hide();

  //Erstellt Linkes und Rechtes Html Div Element,
  //läd HElogo und ruft go() aus, sobald HElogo fertig geladen wurde
  leftRec = createDiv();
  rightRec= createDiv();
  logo= createImg('./source/logos/Website_Vorhang_Schriftzug_neu.png','','',go());
}

function draw(){
  //ruft jeden Frame curtain() auf
  curtain();
}

function curtain(){
  //started erst wenn HElogo geladen wurde,
  //warted 1500ms nachdem logo geladen wurde bevor eigentliche Animation beginnt;
  //löscht logo nach 1.5s warten, um Hintergrund sichtbar zu machen;
  //zählt counter hoch bis curtains aus dem Bild raus
  //ruft curtainPosition() auf und übergibt aktuellen counter wert, mit dem die Poistion der Divs verändert wird
  if(start){
    logoStyle();
    if (millis()>1500){
      logo.remove();
      if(counter<=windowWidth/2){
        counter+=10;
      }
    }
  }
  curtainPosition(counter);
};

function curtainPosition(counter){
  //positioniert und stylet rechten und linken Curtain;
  //Löscht Elemnte nachdem sie aus dem Bild sind und setzt start auf false um den counter zu stoppen
  //Anmerkungen: Offset wichtig als "schnittrand"

  leftRec.style('height', 1*windowHeight+safetyOffset+'px'); //dirty fix: Verhindert sehen Hintergrund durch scrollen wenn curtain noch da
  leftRec.style('width' , windowWidth/2+safetyOffset-counter+'px');
  leftRec.style('z-index' , 1);
  leftRec.style('background-color','#000000');
  leftRec.position(-safetyOffset+1, 0);

  rightRec.style('height', 1*windowHeight+safetyOffset+'px'); //dirty fix: Verhindert sehen Hintergrund durch scrollen wenn curtain noch da
  rightRec.style('width' , windowWidth/2+safetyOffset-counter+'px');
  rightRec.style('z-index' , 1);
  rightRec.style('background-color','#000000');
  rightRec.position(windowWidth/2+counter, 0);

  if(counter>=windowWidth/2){
    rightRec.remove();
    leftRec.remove();
    start=false;
    if(millis()>3300){
      showDiv();
    }

  }
}

function go(){
  //wird aufgerufen wenn das logo fertig geladen ist, um Animation zu starten
  start=true;
}

function logoStyle(){
  //positioniert das logo HOFFENTLICH zentral
  //(!) Fehlerpotenzial
  logo.style('max-width','100%');
  logo.position(0,windowHeight/3);
  logo.style('z-index' , 2);
}

function removeDiv() {
  popup.remove();
  start=true;
}

function showDiv(){
  popup.show();
}

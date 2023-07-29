let words=[];
let words2=[];
let level=0;
let answerText;
let answerText2;
let answer=[];
let answer2=[];
let asort;
let currentword='';
let notWord=false;
let notWordTimer;
let xspacing,xoff,yoff,yspacing;
let winner1,winner2,winner;
let newGameHighlight;
let checkCurrentWord;

let date;
let wordIndex,wordIndex2;
let freePlay;
let redword;
let daily;


function setup() {
  createCanvas(windowHeight, windowHeight);
  daily = true;
  date = new Date();
  wordIndex = ((date.getMonth())*31 + date.getDate())+(date.getFullYear()-2023)*366 - 214;
  wordIndex*=2;
  newGame();  
  for (let element of document.getElementsByClassName("p5Canvas")) {
    element.addEventListener("contextmenu", (e) => e.preventDefault());
  }
}
function draw() {
  background(0,90);
  showKeys();
  drawSquares();
  checkWinner();
  if (!freePlay && level < 7 && !winner){
    let m = date.getMonth()+1;
    let d = date.getDate();
    let y = date.getFullYear()-2000;
    let today = m+'/'+d+'/'+y;
    textSize(width/30);
    text('Daily Puzzle for '+today,width/2,height*0.05);
    textSize(xspacing*0.9);
  } else if (!winner && level < 7){
    textSize(width/30);
    text('Dourdle Free Play',width/2,height*0.05);
    textSize(xspacing*0.9);
  }
  
}
function checkWinner(){
  push();
  winner = winner1 && winner2;
  if (winner){
    textSize(width/30);
    text('Winner!',width/2,height*0.05);
    daily=false;
  } else if (level > 6){
    textSize(width/30);
    text('Game Over: '+answerText.toUpperCase()+' & '+answerText2.toUpperCase(),width/2,height*0.05);
    
  }
  if (winner || level > 6 || daily){
    let r=width*0.05;
    let x = mouseX;
    let y = mouseY;
    let cx = width*0.1;
    let cy = height*0.1;
    textSize(width/30);
    ellipseMode(CENTER);
    fill(200,90);
    circle(cx,cy,r*2);
    fill(0);
    text('Free',cx,cy-width/60);
    text('Play',cx,cy+width/60);
    let d = dist(x,y,cx,cy);
    if (d<r){
      newGameHighlight=true;
      fill(220,90);
      circle(cx,cy,r*2);
    } else
      newGameHighlight=false;
  }
  
  pop();
}
function drawSquares(){
  currentword=currentword.toUpperCase();  
  if (currentword.length > 5) currentword = currentword.substring(0, 5);
  for (let i=0;i<7;i++)
    for (let j=0;j<5;j++){
      fill(250,190);
      square(j*xspacing+xoff,i*yspacing+yoff,xspacing-5);
      square(j*xspacing+xoff2,i*yspacing+yoff,xspacing-5);
      push();
      if(level==i && currentword){
        if (currentword.length == 5 && WORDS.indexOf(currentword.toLowerCase()) == -1) 
          fill(255,0,0);
        else
          fill(0);
        if (!winner1) text(currentword.charAt(j),j*xspacing+xoff-1,i*yspacing+yoff+2);
        if (!winner2) text(currentword.charAt(j),j*xspacing+xoff2-1,i*yspacing+yoff+2);
      }
      pop();
    }
  
  for (let i=0;i<words.length;i++){
    words[i].show();
  }
  for (let i=0;i<words2.length;i++){
    words2[i].show();
  }
}
function genNewWord(){
  let ans = random(WORDS);
  if (ans.charAt(4) == 's' && random() > 0.01){
    while (ans.charAt(4) == 's'){
      ans = random(WORDS);
    }
  }
  return ans;
}
function newGame(){
  let ans,ans2;
  if (freePlay) {
    ans = genNewWord();
    ans2 = genNewWord();
    while (ans == ans2){
      ans2 = genNewWord();
    }
  }
  else{
    ans = WORDS[wordIndex];
    ans2 = WORDS[wordIndex+1];
  }
  answerText=ans;
  answerText2=ans2;
  gameover=false;
  winner=false;
  winner1=false;
  winner2=false;
  level=0;
  words=[];
  words2=[];
  currentword='';
  xspacing=width*0.05;
  yspacing=xspacing;
  xoff=width*0.25;
  xoff2=xoff*2.15;
  yoff=height*0.125;
  KeyBoard();
  textSize(xspacing*0.9);
  
  rectMode(CENTER);
  textAlign(CENTER,CENTER);
  for (let element of document.getElementsByClassName("p5Canvas")) {
    element.addEventListener("contextmenu", (e) => e.preventDefault());
  }
  for (let i=0;i<5;i++){
    answer[i] = ans.charAt(i).toUpperCase();
    answer2[i] = ans2.charAt(i).toUpperCase();
  }
}
function mousePressed(){
  if (newGameHighlight){
    newGameHighlight=false;
    freePlay=true;
    newGame();
    daily=false;
  }
  for (let k of allKeys){
    if (k.highlight && !(winner || level > 6)){
      currentword+=k.letter;
    }
    k.highlight = false;
  }
  if (entHighlight && !(winner || level > 6) && WORDS.indexOf(currentword.toLowerCase()) != -1 && currentword.length == 5){
    if (!winner1) words[level] = new Word(answer,true);
    if (!winner2) words2[level] = new Word(answer2);
    level++;
    currentword='';
  }
  if (backHighlight && currentword.length>0 && !(winner || level > 6)){
    currentword = currentword.substring(0, currentword.length - 1);
    backHighlight=false;
  }
}
function keyPressed(){
  if ((winner || level > 6) && keyCode == 13){
    freePlay=true;
    newGame();
  } else if ((winner || level > 6) && key == 'd'){
    freePlay=false;
    newGame();
  } else if (winner || level > 6){
    //game over
  } else if (keyCode == 13 && WORDS.indexOf(currentword.toLowerCase()) == -1) {
    // invalid word, clear guess
    currentword='';
  } else if (keyCode == 13 && currentword.length == 5) {
    if (!winner1) words[level] = new Word(answer,true);
    if (!winner2) words2[level] = new Word(answer2);
    level++;
    currentword='';
  } else if (keyCode == BACKSPACE) {
    currentword = currentword.substring(0, currentword.length - 1);
  } else if (keyCode > 64 && keyCode < 91){
    currentword+=key;
  }
}
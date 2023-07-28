class Word{
  constructor(ans,left){
    this.index = level;
    this.left = left;
    this.value = currentword;
    this.answer=ans;
    this.arr = [];
    this.done=false;
    
    for (let i=0;i<5;i++){
      this.arr.push(this.value.charAt(i));
    }
    this.colors = [];
    for(let i=0;i<5;i++){
      this.colors[i] = 100;
    }
    this.calcColors();
  }
  
  calcColors(){
    this.tmparr = this.arr.slice();
    this.tmpans = this.answer.slice();
    let Green = [0,255,0];
    let Yellow = [255,255,0];
    
    
    if (this.left && !this.done){
      for (let i=0;i<5;i++){
        if (this.arr[i] == this.answer[i]){
          this.colors[i]=Green;
          this.tmparr[i] = ' ';
          this.tmpans[i] = '.';
          for (let j=0;j<allKeys.length;j++){
            if (this.answer[i] == allKeys[j].letter){
              allKeys[j].color1 = Green;
            }
          }
        }
      }

      for (let i=0;i<5;i++){
        let index = this.tmparr.indexOf(this.tmpans[i]);
        if (index != -1){
          this.colors[index] = Yellow;
          this.tmparr[index] = ' ';
          for (let j=0;j<allKeys.length;j++){
            if (this.answer[i] == allKeys[j].letter){
              allKeys[j].color1 = Yellow;
            }
          }
        }
      }
      for (let i=0;i<5;i++){
        for (let j=0;j<allKeys.length;j++){
          if (this.tmparr[i]==allKeys[j].letter && allKeys[j].color1 != Green && allKeys[j].color1 != Yellow){
            allKeys[j].color1=90;
          }
        }
      }
    } else if (!this.done){
        for (let i=0;i<5;i++){
        if (this.arr[i] == this.answer[i]){
          this.colors[i]=Green;
          this.tmparr[i] = ' ';
          this.tmpans[i] = '.';
          for (let j=0;j<allKeys.length;j++){
            if (this.answer[i] == allKeys[j].letter){
              allKeys[j].color2 = Green;
            }
          }
        }
      }

      for (let i=0;i<5;i++){
        let index = this.tmparr.indexOf(this.tmpans[i]);
        if (index != -1){
          this.colors[index] = Yellow;
          this.tmparr[index] = ' ';
          for (let j=0;j<allKeys.length;j++){
            if (this.answer[i] == allKeys[j].letter){
              allKeys[j].color2 = Yellow;
            }
          }
        }
      }
      for (let i=0;i<5;i++){
        for (let j=0;j<allKeys.length;j++){
          if (this.tmparr[i]==allKeys[j].letter && allKeys[j].color1 != Green && allKeys[j].color1 != Yellow){
            allKeys[j].color2=90;
          }
        }
      }
    }
    
    
    
    
    
    
    
    
    
    
        
    //if ((this.left && winner1) || (!this.left && winner2)) {}
    
    
    if (this.left && winner1){
      
    } else if (!this.left && winner2){
      
    }
    else {
      for (let i=0;i<5;i++){
        if (this.left) winner1=true;
        else winner2=true;

        if(this.tmparr[i]!=' '){
          if (this.left) winner1=false;
          else winner2 = false;
          break;
        }
      }
    }
    
    if (this.left && winner1 && !this.done){
      this.level=level;
      for (let i=0;i<words.length;i++) words[i].done=true;
    } else if (!this.left && winner2 && !this.done){
      this.level=level;
      for (let i=0;i<words2.length;i++) words2[i].done=true;
    }
  }
  
  show(){
    let yoffset = this.index * yspacing + yoff;
    push();
    for (let i=0;i<5;i++){
      fill(this.colors[i]);
      if (this.left) square(i*xspacing+xoff,yoffset,xspacing-5);
      else square(i*xspacing+xoff2,yoffset,xspacing-5);
      fill(0);
      if (this.left) text(this.value.charAt(i),i*xspacing+xoff-1,yoffset+2);
      else text(this.value.charAt(i),i*xspacing+xoff2-1,yoffset+2);
    }
    pop();
  }
}
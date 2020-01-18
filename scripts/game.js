//
export class Game{
  //initlialize the dimensions
  constructor(gameWidth,gameHeight){
    console.log(gameWidth, gameHeight);
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.gameScreen=[];
      this.player = "X";
      this.stepLength = 9;
      this.playerLoc={'xcor':this.stepLength*4,'ycor':this.gameHeight - 5}
      this.removeSides = 0;
    } 
  
  start(){
      this.gameScreen = new Array(this.gameHeight)
      for(var i=0;i<this.gameScreen.length;i++){
        this.gameScreen[i] = new Array(this.gameWidth)
      }
      for (var i = 0; i < this.gameHeight; i++) { 
          for (var j = 0; j < this.gameWidth; j++) {
            if (j % this.stepLength === 0 && (j > this.stepLength * this.removeSides && j < this.gameWidth - this.stepLength*this.removeSides)) {
              this.gameScreen[i][j] = "|"; 
            } else if (i === this.gameHeight - 2 && (j > this.stepLength * this.removeSides && j < this.gameWidth - this.stepLength*this.removeSides)) {
                this.gameScreen[i][j] = "="; 
            } else {
                this.gameScreen[i][j] = " "; 
            }
          } 
      } 
      this.gameScreen[this.playerLoc.ycor][this.playerLoc.xcor] = this.player
      document.addEventListener('keydown',(e) => this.handleKeyPress(e));
  }
      
  update() {
    return
  }

   handleKeyPress(event){
     event.preventDefault()
    if(event.keyCode===37){
      console.log('left arrow');
      let x = this.playerLoc['xcor']
      let y = this.playerLoc['ycor']
      this.changePlayerLoc(x-this.stepLength ,y,this.player)
    } else if (event.keyCode===39){
      console.log('right arrow');
      let x = this.playerLoc['xcor']
      let y = this.playerLoc['ycor']
      this.changePlayerLoc(x+this.stepLength ,y,this.player)
    }
   }
   
   changePlayerLoc(x,y,player){
    if (x < this.stepLength*(this.removeSides+1) || x > this.gameWidth - this.stepLength*this.removeSides) {
      return;
    }
    let oldX = this.playerLoc.xcor;
    let oldY = this.playerLoc.ycor;
    if (oldX % this.stepLength === 0 && (oldX > this.stepLength * this.removeSides && oldX < this.gameWidth - this.stepLength*this.removeSides)) {
      this.gameScreen[oldY][oldX] = "|"; 
    } else {
      this.gameScreen[oldY][oldX]  = " "; 

    }
    this.gameScreen[this.playerLoc.ycor][this.playerLoc.xcor] = '|'
    this.gameScreen[y][x]= player;
    this.playerLoc={xcor:x,ycor:y}
   }

   

   getText(){
     return this.gameScreen;
   }

}




// export class Game {
//   constructor(w, h) {
//     console.log(w, h);
//     this.gamescreen = []
//     this.height = h;
//     this.width = w;
//   }

//   start() {
//     for (let i = 0; i < this.height; i++) {
//       let temp = []
//       for (let j = 0; j < this.width; j++) {
//         temp.push('g'.toString());
//       }
//       this.gamescreen.push(temp);
//     }
//   }

//   getText() {
//     return this.gamescreen;
//   }
// }
//
export class Game{
  //initlialize the dimensions
  constructor(gameWidth,gameHeight){
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.gameScreen=[];
  }
  
  start(){
      const player = "X";
      this.gameScreen = new Array(this.gameHeight)
      for(var i=0;i<this.gameScreen.length;i++){
        this.gameScreen[i] = new Array(this.gameWidth)
      }
      for (var i = 0; i < this.gameHeight; i++) { 
          for (var j = 0; j < this.gameWidth; j++) { 
            this.gameScreen[i][j] = "|"; 
          } 
      } 
      //this.changePlayerLoc(Math.floor(this.gameWidth/2),this.gameHeight-1,player)
      this.changePlayerLoc(30,10,player)
  }
      

  // document.onkeypress = update(){
  //   if(event.keyCode===37){
  //     console.log('left arrow');
  //   }else if (event.keyCode===38){
  //     console.log('right arrow');
  //   }
  //  }
   
   changePlayerLoc(y,x,player){
     console.log(y)
     console.log(x)
    this.gameScreen[x][y]=player;
    var playerLoc={xcor:x,ycor:y}
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
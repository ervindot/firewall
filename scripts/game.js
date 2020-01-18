//
export class Game{
  //initlialize the dimensions
  constructor(gameWidth,gameHeight){
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.gameScreen=[];
      this.playerLoc={'xcor':0,'ycor':0}
      this.player = "X";
  }
  
  start(){
      this.gameScreen = new Array(this.gameHeight)
      for(var i=0;i<this.gameScreen.length;i++){
        this.gameScreen[i] = new Array(this.gameWidth)
      }
      for (var i = 0; i < this.gameHeight; i++) { 
          for (var j = 0; j < this.gameWidth; j++) { 
            this.gameScreen[i][j] = "|"; 
          } 
      } 
      
      this.changePlayerLoc(Math.floor(this.gameWidth/2),this.gameHeight-1,player)
      //this.changePlayerLoc(30,10,this.player)
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
      this.changePlayerLoc(y,x-1,this.player)
    } else if (event.keyCode===39){
      console.log('right arrow');
      let x = this.playerLoc['xcor']
      let y = this.playerLoc['ycor']
      this.changePlayerLoc(y,x+1,this.player)
    }
   }
   
   changePlayerLoc(x,y,player){
     console.log(x)
     console.log(y)
    this.gameScreen[x][y]=player;
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
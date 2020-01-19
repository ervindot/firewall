//
import {gameObsctacle} from "./gameObstacle.js";

export class PlayerController{
  //initlialize the dimensions
  constructor(gameWidth,gameHeight,player){
    console.log(gameWidth, gameHeight);
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.gameScreen=[];

      //2D array
      this.player = [[" ","_"," "],["/"," ","\\"],["\\"," ","/"],[" ","^"," "]];
      this.stepLength = 9;
      this.playerLoc={'xcor':this.stepLength*4,'ycor':this.gameHeight - 5}
      this.removeSides = 0;
      this.enemies = new Array();
      this.score = 0;
      this.shield = 3;
    } 
  
  start(){
      this.gameScreen = new Array(this.gameHeight)
      for(var i=0;i<this.gameScreen.length;i++){
        this.gameScreen[i] = new Array(this.gameWidth)
      }
      document.addEventListener('keydown',(e) => this.handleKeyPress(e));
  }

  drawPlayer(){
      let pHeight = this.player.length;
      let pWidth = this.player[0].length;
      let pWidthMid = Math.floor(pWidth/2);
      let pHeightMid = Math.floor(pHeight/2);

      for (let i = -pHeightMid; i < pHeightMid + pHeight%2; i++) {
          for (let j = -pWidthMid; j < pWidthMid + pWidth%2; j++) {
              this.gameScreen[this.playerLoc.ycor + i][this.playerLoc.xcor + j] = this.player[pHeightMid + i][pWidthMid + j];
          }
      }
  }

  drawTracks(){
      for (var i = 0; i < this.gameHeight; i++) {
          for (var j = 0; j < this.gameWidth; j++) {
              if (j % this.stepLength === 0 && (j > this.stepLength * this.removeSides && j < this.gameWidth - this.stepLength*this.removeSides)) {
                  this.gameScreen[i][j] = "|";
              }
          }
      }
  }

  drawEnemies(){
      for (let k = 0; k < this.enemies.length; k++) {
          console.log(this.enemies[k].x +" "+ this.enemies[k].y)
          let eHeight = this.enemies[k].shape.length;
          let eWidth = this.enemies[k].shape[0].length;
          let eWidthMid = Math.floor(eWidth/2);
          let eHeightMid = Math.floor(eHeight/2);
          for (let i = -eHeightMid; i < eHeightMid + eHeight%2; i++) {
              for (let j = -eWidthMid; j < eWidthMid + eWidth%2; j++) {
                  if(this.enemies[k].y + i >= 0 && this.enemies[k].y + i < this.gameHeight && this.enemies[k].x + j >= 0 && this.enemies[k].x + j < this.gameWidth){
                      this.gameScreen[this.enemies[k].y + i][this.enemies[k].x + j] = this.enemies[k].shape[eHeightMid + i][eWidthMid + j];
                  }
              }
          }
      }
  }

  drawEmptySpace(){
      for (let i = 0; i < this.gameHeight; i++) {
          for (let j = 0; j < this.gameWidth; j++) {
              this.gameScreen[i][j] = " ";
          }
      }
  }

  drawShield(){
      for (let i = 0; i < this.gameWidth; i++) {
        this.gameScreen[this.gameHeight-2][i] = "=";
      }
  }

  checkCollisions(){
      for (let i = 0; i < this.enemies.length; i++) {
        if((Math.abs(this.enemies[i].x-this.playerLoc.xcor) < (this.enemies[i].shape.length + this.player.length)/2) && (Math.abs(this.enemies[i].y-this.playerLoc.ycor) < (this.enemies[i].shape[0].length + this.player[0].length)/2)){
            this.enemies.splice(i,1);
            this.score++;
        }
        if(this.enemies[i].y > this.gameHeight - 3) {
            this.enemies.splice(i, 1);
            this.shield--;
        }

      }
  }

  spawnEnemies(){
      if(this.enemies.length < 6){
          this.enemies.push(new gameObsctacle(this.gameWidth,this.gameHeight,[[" ","_"," "],["/"," ","\\"],["\\"," ","/"],[" ","^"," "]]));
      }
  }

  update(deltaTime) {
    this.drawEmptySpace();
    this.drawTracks();
    this.spawnEnemies();
    this.checkCollisions();
    this.drawEnemies();
    this.drawPlayer();
    this.drawShield();

      for (let i = 0; i < this.enemies.length; i++) {
          this.enemies[i].y = Math.floor(this.enemies[i].totalTime * this.gameHeight / this.enemies[i].moveTime);
          this.enemies[i].totalTime+=deltaTime;
      }
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
   
   changePlayerLoc(x,y){
    if (x < this.stepLength*(this.removeSides+1) || x > this.gameWidth - this.stepLength*this.removeSides) {
      return;
    }
    this.playerLoc={xcor:x,ycor:y}
   }

   

   getText(){
     return this.gameScreen;
   }

}
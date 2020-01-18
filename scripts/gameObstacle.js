export class gameObsctacle{
constructor(gameWidth,gameHeight){
    this.stepLength = 9;
    let temp =getRandomInt(1,this.stepLength-1)
    this.x = temp * this.stepLength;
    this.y = getRandomInt(0, gameHeight/2);
    this.moveTime=10;
}

 getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
  }

start(){

}

update(){

}

}
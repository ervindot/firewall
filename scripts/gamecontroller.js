import {Game} from './game.js';
import {HackerScreen} from './hackerscreen.js';

export class GameController { 
 
  constructor(screenWidth, screenHeight, fontSize) {
    this.width = Math.floor(screenWidth / (fontSize / 1.5));
    this.height = Math.floor(screenHeight / fontSize / 1.3);
    this.margin = 1;
    this.gamePaneCoords = [this.margin, this.margin, this.width / 2 - this.margin, this.height - this.margin];
    this.hackerPaneCoords = [this.margin + this.width / 2, this.margin, this.width - this.margin, this.height - this.margin];
    console.log(this.gamePaneCoords, this.hackerPaneCoords);
    this.gamePane = new Game(this.width / 2- this.margin, this.height - this.margin);
    this.gamePane.start();
    this.hackerPane = new HackerScreen(this.width / 2- this.margin, this.height - this.margin);
    this.hackerPane.start();
  }

  getText() {
    let gameText = this.gamePane.getText();
    console.log(gameText);
    let hackerText = this.hackerPane.getText();
    console.log(hackerText);
    let outputString = "";
    for (let y = 0; y < this.height; y++) {
      let rowString = "";
      for (let x = 0; x < this.width; x++) {
        if (x > this.gamePaneCoords[0] && x < this.gamePaneCoords[2]) {
          if (y > this.gamePaneCoords[1] && y < this.gamePaneCoords[3]) {
            rowString += gameText[y - this.margin][x];
            continue;
          }
        }

        if (x > this.hackerPaneCoords[0] && x < this.hackerPaneCoords[2]) {
          if (y > this.hackerPaneCoords[1] && y < this.hackerPaneCoords[3]) {
            rowString += hackerText[y - this.margin][x - Math.floor(this.width / 2)];
            continue;
          }
        }
        rowString += ' '
      }
      rowString += '\n'
      outputString += rowString
    }
    return outputString;

  }

}

export default GameController;
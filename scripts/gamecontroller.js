import {Game} from './game.js';
import {HackerScreen} from './hackerscreen.js';

export class GameController { 
 
  constructor() {
    this.margin = 1;
    this.gameW = 69;
    this.hackerW = 45;
    this.height = 40;
    this.width = this.gameW + this.margin*4 + this.hackerW;
    this.gamePaneCoords = [this.margin, this.margin, this.gameW + this.margin, this.height - this.margin];
    this.hackerPaneCoords = [this.gamePaneCoords[2] + 2, this.margin, this.width - this.margin, this.height - this.margin];
    console.log(this.gamePaneCoords, this.hackerPaneCoords);
    this.gamePane = new Game(this.gameW, this.height - this.margin);
    this.gamePane.start();
    this.hackerPane = new HackerScreen(this.hackerW, this.height - this.margin);
    this.hackerPane.start();
  }

  update() {
    this.gamePane.update();
    this.hackerPane.update();
  }

  getText() {
    let gameText = this.gamePane.getText();
    console.log(gameText);
    let hackerText = this.hackerPane.getText();
    let outputString = "";
    for (let y = 0; y < this.height; y++) {
      let rowString = "";
      for (let x = 0; x < this.width; x++) {
        if (x >= this.gamePaneCoords[0] && x < this.gamePaneCoords[2]) {
          if (y >= this.gamePaneCoords[1] && y < this.gamePaneCoords[3]) {
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
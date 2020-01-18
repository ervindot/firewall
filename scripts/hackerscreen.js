export class HackerScreen {
  constructor(w, h) {
    console.log(w, h);
    this.gamescreen = []
    this.height = h;
    this.width = w;
  }

  start() {
    for (let i = 0; i < this.height; i++) {
      let temp = []
      for (let j = 0; j < this.width; j++) {
        temp.push(('h').toString());
      }
      this.gamescreen.push(temp);
    }
  }

  getText() {
    return this.gamescreen;
  }
}
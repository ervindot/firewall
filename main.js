import {GameController} from './scripts/gamecontroller.js'
const gc = new GameController(150, 45);
let time;
$( document ).ready(function() {
  console.log('hello!');
  $('#gamescreen').text(gc.getText());
  time = Date.now();
});

setInterval(() => {
  gc.update(Date.now() - time);
  time = Date.now();
  $('#gamescreen').text(gc.getText());
}, 1000/60)
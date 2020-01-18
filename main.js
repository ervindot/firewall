import {GameController} from './scripts/gamecontroller.js'
const gc = new GameController(150, 45);
$( document ).ready(function() {
  console.log('hello!');
  $('#gamescreen').text(gc.getText());
});

setInterval(() => {
  gc.update();
  $('#gamescreen').text(gc.getText());
}, 100)
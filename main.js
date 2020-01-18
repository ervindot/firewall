import {GameController} from './scripts/gamecontroller.js'

$( document ).ready(function() {
  console.log('hello!');
  const gc = new GameController(150, 45);
  $('#gamescreen').text(gc.getText());
});
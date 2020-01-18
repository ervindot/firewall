import {GameController} from './scripts/gamecontroller.js'

$( document ).ready(function() {
  console.log('hello!');
  const gc = new GameController(window.innerWidth, window.innerHeight, 16);
  $('#gamescreen').text(gc.getText());
});
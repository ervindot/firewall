export class AudioManager {
  constructor() {
    this.player = new AudioContext();
    this.sounds = {
      'sample':'../audio/sample.wav',
      'gameEnds':'../audio/gameEnds.wav',
      'gameStart':'../audio/gameStart.wav',
      'playerMove':'../audio/playerMove.wav',
      'shieldHit':'../audio/shieldHit.wav',
      'hitEnemy':'../audio/hitEnemy.wav',
      'hitFriend':'../audio/hitFriend.wav'
    }
  }
  playSound(soundName) {
    const soundFile = this.sounds[soundName];
    if (this.sounds[soundName]) {
      var audio = new Audio(soundFile);
      audio.play();
    }
  }
}
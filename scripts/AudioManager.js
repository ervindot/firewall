export class AudioManager {
  constructor() {
    this.player = new AudioContext();
    this.sounds = {
      'sample':'../audio/sample.wav',
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
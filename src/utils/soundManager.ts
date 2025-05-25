// Simple sound manager for music and effects
export class SoundManager {
  private static music: HTMLAudioElement | null = null;
  private static effect: HTMLAudioElement | null = null;

  static playMusic(url: string, loop = true) {
    if (this.music) {
      this.music.pause();
      this.music = null;
    }
    this.music = new Audio(url);
    this.music.loop = loop;
    this.music.volume = 0.3;
    this.music.play();
  }

  static stopMusic() {
    if (this.music) {
      this.music.pause();
      this.music = null;
    }
  }

  static playEffect(url: string) {
    if (this.effect) {
      this.effect.pause();
      this.effect = null;
    }
    this.effect = new Audio(url);
    this.effect.volume = 0.7;
    this.effect.play();
  }
}

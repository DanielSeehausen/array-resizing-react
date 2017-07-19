const audio = new Audio('assets/audio-clips/typewriter.wav')

export default function() {
  audio.currentTime = 0;
  audio.play()
}

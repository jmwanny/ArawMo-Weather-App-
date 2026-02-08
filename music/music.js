
export function initBackgroundMusic () {
  const bgMusic = document.getElementById("bgMusic");
  const muteButton = document.getElementById('muteButton');
  const icon = document.querySelector("i");
  
  bgMusic.volume = 0.4;
  bgMusic.muted = false;

  
 muteButton.addEventListener('click', () => {
 bgMusic.muted = !bgMusic.muted;

  icon.classList.toggle("fa-volume-xmark");
  icon.classList.toggle("fa-volume-high");
 })
}
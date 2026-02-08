
export function initBackgroundMusic () {
  const bgMusic = document.getElementById("bgMusic");
  const muteButton = document.getElementById('muteButton');

  bgMusic.play();
  bgMusic.volume = 0.4;
  bgMusic.muted = false;
  

 muteButton.addEventListener('click', () => {
  
  if(bgMusic.paused) {
    bgMusic.play();
    muteButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  } else {
    bgMusic.pause();
    muteButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
  }
 })
}


document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.querySelector('.play-button');
  playButton.addEventListener('click', () => {
    const hitButton =  document.createElement('button')
    hitButton.textContent = 'Hit'
    hitButton.className = 'hit-button'
    hitButton.addEventListener("click")
  })
});
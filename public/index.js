document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.querySelector('.play-button');
  let hitButton = null
  let standButton = null
//   game start/ play pressed
  playButton.addEventListener('click', () => {

    // show player hand unhide game buttons 
    hitButton =  document.createElement('button')
    hitButton.textContent = 'Hit'
    hitButton.className = 'hit-button'

    standButton = document.createElement('button')
    standButton.textContent ='Stand'
    standButton.classname = 'stand-button'
  })

//   logic to check if the buttons exist/ can be clicked yet
  if (standButton != null) {
    standButton.addEventListener('click', () => {

    })
  }

  if (hitButton != null) {
    standButton.addEventListener('click', () => {

    })
  }
});
document.addEventListener('DOMContentLoaded', () => {

  const playButton = document.querySelector('.play-button');
  const hitButton = document.querySelector('.hit-button');
  const standButton = document.querySelector('stand-button');

  // Game start/play pressed
  playButton.addEventListener('click', () => {
    console.log('Game Start');

    //Deal
    //Unhide game buttons
    hitButton.style.display = 'block'
    
    hitButton.addEventListener('click', () => {
      console.log('Hit');
    });

    standButton.addEventListener('click', () => {
      console.log('Stand');
    });
  });
});

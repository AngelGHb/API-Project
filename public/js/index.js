document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.querySelector('.play-button');
  const hitButton = document.querySelector('.hit-button');
  const standButton = document.querySelector('.stand-button');

  // Optional: Disable the button after click to avoid double-submit
  [playButton, hitButton, standButton].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => btn.setAttribute('disabled', 'true'));
    }
  });
});

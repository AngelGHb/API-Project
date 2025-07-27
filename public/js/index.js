document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.play-button, .hit-button, .stand-button, .play-again-button');

  buttons.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      const form = btn.closest('form');
      if (!form) return;
      // prevent the browser's default submit first
      e.preventDefault();
      btn.disabled = true;           // now it's safe to disable
      form.submit();                 // submit manually
    });
  });
});

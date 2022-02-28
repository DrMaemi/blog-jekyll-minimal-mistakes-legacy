document.addEventListener('DOMContentLoaded', () => {
  const code = document.getElementsByTagName('code');

  Array.from(code).forEach(el => {
    if (el.className) {
      const s = el.className.split(':');
      const highlightLang = s[0];
      const filename = s[1];
      if (filename) {
        el.classList.remove(el.className);
        el.classList.add(highlightLang);
        el.parentElement.setAttribute('data-lang', filename);
        el.parentElement.classList.add('code-block-header');
      }
    }
  });
});
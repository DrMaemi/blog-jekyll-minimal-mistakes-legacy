document.addEventListener('DOMContentLoaded', () => {
  const code = document.getElementsByTagName('code');

  Array.from(code).forEach(el => {
    if (el.className) {
      const s = el.className.split(':');
      const highlightLang = s[0];
      const filename = s[1];
      const lineons = s[2];
      
      if (filename) {
        el.classList.remove(el.className);
        el.classList.add(highlightLang);
        el.parentElement.setAttribute('file-name', filename);
        el.parentElement.classList.add('with-header');
      }

      if (lineons) {
        el.classList.remove(el.className);
        el.classList.add(highlightLang);
        el.classList.add(lineons);
      }
    }
  });
});
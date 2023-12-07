(function() {
    const fh = document.getElementById('fixed-header');
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 50) {/*スクロールする長さ*/
        fh.classList.add('is-show');
      } else {
        fh.classList.remove('is-show');
      }
    });
  }());



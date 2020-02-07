function scrollToElem(elemName) {
  document
    .querySelector(elemName)
    .scrollIntoView({ block: "start", behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  let menuChanged = false;
  let menuChangeOffset = document.querySelector("#menu-breakdown").offsetTop;
  console.info(menuChangeOffset);

  window.addEventListener("resize", () => {
    menuChangeOffset = document.querySelector("#menu-breakdown").offsetTop;
  });

  window.onscroll = () => {
    if (window.pageYOffset > menuChangeOffset && !menuChanged) {
      menuChanged = true;
      header.className = "fixed-header";
    } else if (window.pageYOffset < menuChangeOffset && menuChanged) {
      menuChanged = false;
      header.className = "abs-header";
    }
  };

  document.querySelector('.logo').addEventListener('click', () => {
    scrollToElem('#first')
  })

  document.querySelector('#btn-learn-more').addEventListener('click', () => {
    scrollToElem('#second')
  })

  document.querySelector('#btn-strategy').addEventListener('click', () => {
    scrollToElem('#fourth')
  })

  document.querySelectorAll('nav>p').forEach((elem, i) => {
    switch (i) {
      case 0: {
        elem.addEventListener('click', () => {
          scrollToElem('#second')
        })
        break;
      }
      case 1: {
        elem.addEventListener('click', () => {
          scrollToElem('#fourth')
        });
        break;
      }
      case 2: {
        elem.addEventListener('click', () => {
          alert('не работает')
        })
        break;
      }
    }
  })
});


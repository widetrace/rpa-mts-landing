// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1 - 71
var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

// console.log(`Chrome: ${isChrome}; Edge: ${isEdge}; IE: ${isIE}; Safari: ${isSafari}; Firefox: ${isFirefox}; Opera: ${isOpera}`)

if (isIE) {
  alert('Вы используете старый браузер, некоторые функции сайта могут не работать/отображаться искаженно. \n Советуем открывать сайт с браузера Chrome.')
}

let currentUserStage = "first";

function cutHeaderHalf() {
  const header = document.querySelector("header");
  const logo = document.querySelector(".logo>img");
  const menu = document.querySelectorAll(".menu>ul>li");
  if (currentUserStage != "first") {
    header.style.height = "7.5vh";
    logo.style.height = "7.5vh";
    menu.forEach(e => {
      e.style["margin-top"] = "3vh";
    });

    if (currentUserStage == "second" || currentUserStage == "fourth") {
      header.style.background = "#6e7782";
      menu.forEach(link => {
        link.style.color = "white";
        link.style['border-right'] = '1px solid white';
      });
    } else {
      header.style.background = "#F2F3F7";
      menu.forEach(link => {
        link.style.color = "#001424";
        link.style['border-right'] = '1px solid #001424'
      });
    }
    document.querySelector("#arrow-4").style.opacity = "1";
  } else if (currentUserStage == "first") {
    document.querySelector("#arrow-4").style.opacity = "0";
    Object.assign(header, {
      style: {
        height: "15vh",
        background: "#F2F3F7",
      }
    });
    logo.style.height = "15vh";

    menu.forEach(e => {
      Object.assign(e, {
        style: {
          color: "black",
          "margin-top": "6vh"
        }
      });
    });
  }
  return document.querySelector("header").offsetHeight;
}

function getOffsetTop(elemClass) {
  return document.querySelector(`.${elemClass}`).offsetTop;
}

function getActiveSlide() {
  return document.querySelector(".active-slide");
}

function scrollToElem(elemName) {
  document
    .querySelector(elemName)
    .scrollIntoView({ block: "start", behavior: "smooth" });
}

function setThreeOffset() {
  let secondOffset = getOffsetTop("second");
  let thirdOffset = getOffsetTop("third");
  let fourthOffset = getOffsetTop("fourth");
  return {
    second: secondOffset,
    third: thirdOffset,
    fourth: fourthOffset
  };
}

function hidePopUp (key) {
  document.querySelector(".bg-cover").click();
}

function sendInfo (key) {
  document.querySelector(".form-submit").click();
}

function keyupHandle (key) {
  if (key.keyCode === 27) {
    hidePopUp(key);
  } else if (key.keyCode === 13) {
    sendInfo(key)
  }
}

function wayOfDevHandle (elem) {
  
}

document.addEventListener("DOMContentLoaded", () => {
  // get all needed for scroll offsets
  const offsetObj = {};
  Object.assign(offsetObj, setThreeOffset());
  offsetObj.headerHeight = document.querySelector("header").offsetHeight;

  // if window resize new offsets

  window.addEventListener("resize", () => {
    Object.assign(offsetObj, setThreeOffset());
  });

  // const popup elem and bg-cover

  const popupElem = document.querySelector(".popup");
  const bgCoverOnPopup = document.querySelector(".bg-cover");

  // popup handle

  document.querySelector(".popup-btn").addEventListener("click", e => {
    if (e) {
      e.preventDefault();
    }

    popupElem.style.display = "block";

    bgCoverOnPopup.className = "bg-cover";
    popupElem.className = "popup";

    document.addEventListener("keyup", keyupHandle);
  });

  // handle click on cross in popup

  document.querySelector("#cross-popup").addEventListener("click", e => {
    if (e) {
      e.preventDefault();
    }
    document.querySelector(".bg-cover").click();
  });

  // bg on popup click

  document.querySelector(".bg-cover").addEventListener("click", e => {
    if (e) {
      e.preventDefault();
    }

    bgCoverOnPopup.className = "bg-cover hidden";
    popupElem.className = "popup hidden";
    document.removeEventListener("keyup", keyupHandle);
  });

  // Check user viewpoint and change menu size

  if (window.pageYOffset > offsetObj.fourth - offsetObj.headerHeight) {
    currentUserStage = "fourth";
  } else if (window.pageYOffset > offsetObj.third - offsetObj.headerHeight) {
    currentUserStage = "third";
  } else if (window.pageYOffset > offsetObj.second - offsetObj.headerHeight) {
    currentUserStage = "second";
  } else {
    currentUserStage = "first";
  }
  offsetObj.headerHeight = cutHeaderHalf();

  // add onscroll check for sizing menu

  window.onscroll = () => {
    if (window.pageYOffset < offsetObj.second) {
      currentUserStage = "first";
      offsetObj.headerHeight = cutHeaderHalf();
    }

    if (
      window.pageYOffset >= offsetObj.second - offsetObj.headerHeight &&
      window.pageYOffset < offsetObj.third &&
      currentUserStage != "second"
    ) {
      currentUserStage = "second";
      offsetObj.headerHeight = cutHeaderHalf();
    }

    if (
      window.pageYOffset >= offsetObj.third - offsetObj.headerHeight &&
      window.pageYOffset < offsetObj.fourth &&
      currentUserStage != "third"
    ) {
      currentUserStage = "third";
      offsetObj.headerHeight = cutHeaderHalf();
    }

    if (
      window.pageYOffset >= offsetObj.fourth - offsetObj.headerHeight &&
      currentUserStage != "fourth"
    ) {
      currentUserStage = "fourth";
      offsetObj.headerHeight = cutHeaderHalf();
    }
  };

  // scroll to top by click on logo

  document.querySelector(".logo").addEventListener("click", e => {
    e.preventDefault();
    scrollToElem("body");
  });

  // handle clicks on menu links

  document.querySelectorAll(".menu-link").forEach(link => {
    link.addEventListener("click", () => {
      scrollToElem(`.${link.getAttribute("to-id")}`);
    });
  });

  // hande click on arrow/arrow-2/arrow-3/arrow-4
  // arrow -> .second block
  // arrow-2 -> .third block
  // arrow-3 -> .fourth block
  // arrow-4 -> top of page

  document.querySelectorAll(".arrow-slide").forEach(arrow => {
    arrow.addEventListener("click", () => {
      switch (arrow.id) {
        case "arrow": {
          scrollToElem(".second");
          break;
        }
        case "arrow-2": {
          scrollToElem(".third");
          break;
        }
        case "arrow-3": {
          scrollToElem(".fourth");
          break;
        }
        case "arrow-4": {
          scrollToElem("body");
          break;
        }
      }
    });
  });

  // way of dev handle

  document.querySelectorAll("#way-of-dev>li").forEach(li => {
    li.addEventListener("click", e => {
      if (e) {
        e.preventDefault();
      }

      const prevActive = getActiveSlide();

      if (li != prevActive) {
        const prevActiveSlide = document.querySelector(
          `.about-dev-stage-info[stage-id='${prevActive.getAttribute(
            "stage-id"
          )}']`
        );
        const newActiveSlide = document.querySelector(
          `.about-dev-stage-info[stage-id='${li.getAttribute("stage-id")}']`
        );
        const prevManImg = document.querySelector(
          `.about-dev-stage-man-${parseInt(
            prevActive.getAttribute("stage-id")
          ) + 1}`
        );
        const newManImg = document.querySelector(
          `.about-dev-stage-man-${parseInt(li.getAttribute("stage-id")) + 1}`
        );

        document.querySelector(".about-dev-stage-title").innerHTML =
          li.innerHTML;
        prevActive.className = "";
        li.className = "active-slide";

        prevActiveSlide.style.opacity = "0";
        prevManImg.style.opacity = "0";
        setTimeout(() => {
          prevActiveSlide.style.display = "none";
          newActiveSlide.style.display = "block";
          setTimeout(() => {
            newActiveSlide.style.opacity = "1";
            newManImg.style.opacity = "1";
          }, 75);
        }, 150);
      }
    });
  });

  // change projects info

  document.querySelectorAll(".projects-names-block").forEach(elem => {
    elem.addEventListener("click", () => {
      const activeProj = document.querySelector(".active-project");
      const spinnerElem = document.querySelector(".spinner-loader");

      if (activeProj && activeProj != elem) {
        document.querySelector(".projects-info").style.display = "none";
        activeProj.className = "projects-names-block";
        document.querySelector(
          `.projects-info-block[data-id="${activeProj.getAttribute(
            "data-id"
          )}"]`
        ).style.display = "none";
      }
      if (activeProj != elem) {
        elem.className = "projects-names-block active-project";
        spinnerElem.style.opacity = 1;
        document.querySelector(".projects-info").style.display = "block";
        document.querySelector(
          `.projects-info-block[data-id='${elem.getAttribute("data-id")}']`
        ).style.display = "block";
        document
          .querySelector(".projects-info")
          .scrollIntoView({ block: "start", behavior: "smooth" });
        setTimeout(() => {
          document.querySelector(
            `.projects-info-block[data-id='${elem.getAttribute("data-id")}']`
          ).style.opacity = 1;
          spinnerElem.style.opacity = 0;
        }, 1000);
      }
      if (activeProj == elem) {
        document.querySelector(".projects-info").style.display = "none";
        document.querySelector(".active-project").className =
          "projects-names-block";
        document.querySelector(
          `.projects-info-block[data-id="${activeProj.getAttribute(
            "data-id"
          )}"]`
        ).style.display = "none";
      }
    });
  });

  // close project info by click on arrow

  document.querySelectorAll(".info-block-arrow").forEach(arrow => {
    arrow.addEventListener("click", e => {
      if (e) {
        e.preventDefault();
      }
      arrow.parentElement.style.opacity = 0;
      scrollToElem(".fourth");
      setTimeout(() => {
        document.querySelector(".projects-info").style.display = "none";
        document.querySelector(".active-project").className =
          "projects-names-block";
        arrow.parentElement.style.display = "none";
        arrow.className = "info-block-arrow";
      }, 500);
    });
  });
});

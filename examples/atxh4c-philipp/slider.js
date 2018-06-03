// Function from David Walsh: http://davidwalsh.name/css-animation-callback
function whichTransitionEvent(){
  let t,
      el = document.createElement("fakeelement");

  let transitions = {
    "WebkitTransition" :"webkitTransitionEnd",
    "MozTransition"    :"transitionend",
    "MSTransition"     :"msTransitionEnd",
    "OTransition"      :"oTransitionEnd",
    "transition"       :"transitionEnd"
  }

  for (t in transitions){
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }
}

let transitionEvent = whichTransitionEvent();

let slider = (function() {
  function init() {
    addEventHandlerToSlides();
    activateFirstSlide();
    bindArrowKeys();
  }

  function addEventHandlerToSlides() {
    const slides = document.querySelectorAll('.slider .slide');

    slides.forEach(function(slide) {
      slide.addEventListener("click", function(event) {
        let slide = findSlide(event.target);
        if (slide && !slide.classList.contains("active")) {
          activateSlide(slide);
        }
      });
    });
  }

  function bindArrowKeys() {
    window.addEventListener("keydown", function(event) {
      let currentSlide = document.querySelector(".slider .slide.active");

      // Left Arrow Key
      if (event.keyCode === 37) {
        let prev = currentSlide.previousElementSibling;
        if (prev) {
          window.removeEventListener("keydown", null);
          activateSlide(prev);
        }
      }

      // Right Arrow Key
      if (event.keyCode === 39) {
        let next = currentSlide.nextElementSibling;
        if (next) {
          window.removeEventListener("keydown", null);
          activateSlide(next);
        }
      }
    });
  }

  function findSlide(elem) {
    if (elem.classList.contains('slide')) {
      return elem;
    } else {
      if (elem.parentElement) {
        return findSlide(elem.parentElement);
      } else {
        return null;
      }
    }
  }

  function activateSlide(slide) {
    let currentSlide = deactivateCurrentSlide();
    let scaling = 3;

    transformedSlideWidth(slide)
      .then(function(width) {
        let offset = width / (scaling * 2);
        let slider = slide.parentElement;

        for (let i = 0; i < slider.children.length; i++) {
          slider.children[i].style.transform = null;
        }

        let sliderOffset = ((window.innerWidth / 2) - slide.offsetLeft);
        sliderOffset = sliderOffset > 0 ? (-1 * sliderOffset) : sliderOffset;
        slider.style.transform = "translateX(" + sliderOffset + "px)";

        slide.classList.add("active");
        slide.style.transform = "scale(" + scaling + ") translateX(-" + offset + "px)";

        movePreviousSlides(slide, (width / scaling));
        moveNextSlides(slide);
        bindArrowKeys();

        replaceBackground(slide);
      })
      .catch(function(err) {
        console.error(err);
      });
  }

  function deactivateCurrentSlide() {
    let currentSlide = document.querySelector(".slider .slide.active");
    if (currentSlide) {
      currentSlide.classList.remove("active");
      currentSlide.style.transform = null;
    }

    return currentSlide;
  }

  function activateFirstSlide() {
    let firstSlide = document.querySelector(".slider .slide:first-child");
    activateSlide(firstSlide);
  }

  function movePreviousSlides(slide, offset) {
    let prev = slide.previousElementSibling;
    while (prev !== null) {
      prev.style.transform = "translateX(-" + offset + "px)";
      prev = prev.previousElementSibling;
    }
  }

  function moveNextSlides(slide) {
    let next = slide.nextElementSibling;
    while (next !== null) {
      next.style.transform = null;
      next = next.nextElementSibling;
    }
  }

  function replaceBackground(slide) {
    let backgroundWrapper = document.querySelector(".background-wrapper");
    let background = document.querySelector(".background");
    let previewImage = slide.children[0].getAttribute('src');

    let clone = background.cloneNode();
    clone.classList.remove("in");
    clone.style.backgroundImage = "url(" + previewImage + ")";
    clone.addEventListener(transitionEvent, function(event) {
      clone.classList.remove("out");
      background.remove();
    });

    backgroundWrapper.insertBefore(clone, null);

    window.setTimeout(function() {
      clone.classList.add("in");
    }, 100);
  }

  function transformedSlideWidth(slide) {
    let cloneWrapper = document.createElement("div");
    cloneWrapper.classList.add("slider");
    cloneWrapper.style.visibility = "hidden";
    cloneWrapper.style.position = "fixed";
    cloneWrapper.style.top = 0;
    cloneWrapper.style.left = 0;

    let clone = slide.cloneNode(true);
    clone.style.transition = null;
    clone.style.transform = null;
    clone.classList.add("active");

    cloneWrapper.insertBefore(clone, null);

    let body = document.getElementsByTagName("body")[0];
    body.insertBefore(cloneWrapper, null);

    return new Promise(function(resolve, reject) {
      let image = clone.children[0];

      image.addEventListener("load", function(event) {
        let rect = clone.getBoundingClientRect();
        cloneWrapper.remove();
        resolve(rect.width);
      });

      image.addEventListener("error", function(event) {
        cloneWrapper.remove();
        reject();
      });
    });
  }

  return {
    init: init
  }
})();
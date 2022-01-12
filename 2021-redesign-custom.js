(function($){ 
  // HERO SLIDER
$(document).ready(function () {

var swiper = new Swiper('.hero-slider', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  speed: 800,
  autoplay: {
    delay: 6000,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.hero-slider .next-slide',
    prevEl: '.swiper-button-prev',
  },

});

var logoSwiper = new Swiper('.logo-slider-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 2,

  breakpoints: {
    400: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
    1400: {
      slidesPerView: 6
    },
  }

});

var featItems = new Swiper('.featured-items', {
  // Optional parameters
  direction: 'horizontal',
  slidesPerView: 'auto',
  loop: true,


  navigation: {
    nextEl: '.feat-arrow-container .next-arrow',
    prevEl: '.feat-arrow-container .prev-arrow',
  }

});

var featBrands = new Swiper('.featured-brands-slider', {
  // Optional parameters
  direction: 'horizontal',
  slidesPerView: 1,

  navigation: {
    nextEl: '.brand-next-arrow',
    prevEl: '.brand-prev-arrow',
  },

  pagination: {
    el: '.brand-slider-container .swiper-pagination',
    type: 'bullets',
    clickable: true,
  },

});

var sliderLogos = document.getElementsByClassName('carousel-logo');

featBrands.on('slideChange', function () {

  Array.from(sliderLogos).forEach(function (el) {
    el.classList.remove('active');

  });
  
  var activeIndex = featBrands.activeIndex;
  sliderLogos[activeIndex].classList.add('active');
});

});

// ATTENTIVE FOOTER SUBSCRIBE BUTTON

$('#email-subscribe').on('click', function (e) {

if(window.innerWidth >= 760){
//call the desktop creative
window.__attentive.trigger(null,null,null,[121332])
} else {
//call the mobile creative
window.__attentive.trigger(null,null,null,[121333])
}
});

$('.btn-plus, .btn-minus').on('click', function (e) {
e.preventDefault();

var isNegative = $(e.target).closest('.btn-minus').is('.btn-minus');
var input = $(e.target).closest('.input-group').find('input');
if (input.is('input')) {
input[0][isNegative ? 'stepDown' : 'stepUp']()
}
})

})(jQuery);

function ready(callback){
// in case the document is already rendered
if (document.readyState!='loading') callback();
// modern browsers
else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
// IE <= 8
else document.attachEvent('onreadystatechange', function(){
  if (document.readyState=='complete') callback();
});
}

ready(function () {

var toggleNav = document.getElementById('menuToggle');
var navDrawer = document.getElementById('mobile-menu');
var html = document.querySelector('html');
var body = document.querySelector('body');

toggleNav.addEventListener('click', function () {
  this.classList.toggle('is-active');
  navDrawer.classList.toggle('active');
  html.classList.toggle('no-scroll');
  body.classList.toggle('no-scroll');

});



});

function validateRecaptcha() {

var response = grecaptcha.getResponse();

if (response.length === 0) {
  alert("Please complete reCaptcha form before proceeding.");

  return false;
} else {

  return true;
}
}

// DESKTOP NAVIGATION

function menuSetup() {
let showDelay = 600, hideDelay = 400;
let menuEnterTimer, menuLeaveTimer;
let allMenuItems = document.querySelectorAll('.nav .dropdown-toggle');
let menuDrawers = document.querySelectorAll('.dropdown-menu');

for (let i = 0; i < menuDrawers.length; i++) {



allMenuItems[i].addEventListener('mouseenter', function () {

  let currentOption = this;


  // clear the opposite timer
  clearTimeout(menuLeaveTimer);
  // add active class after a delay
  menuEnterTimer = setTimeout(function () {
            // hide any active dropdowns
  for (let j = 0; j < menuDrawers.length; j++) {
    menuDrawers[j].classList.remove('active');
  }

  let optionText = currentOption.textContent.trim().toLowerCase();

      switch (optionText) {
        case 'women':
          document.getElementById('dropdown-women').classList.add('active');
          break;
          case 'men':
            document.getElementById('dropdown-men').classList.add('active');
          break;
          case 'activities':
            document.getElementById('dropdown-activities').classList.add('active');
            break;
          case 'footwear':
            document.getElementById('dropdown-footwear').classList.add('active');
            break;
      }
    }, showDelay);

});

    // triggered when user's mouse leaves the menu item
menuDrawers[i].addEventListener('mouseleave', function() {
  let currentOption = this;
  
  // clear the opposite timer
  clearTimeout(menuEnterTimer);
  // remove active class after a delay
  menuLeaveTimer = setTimeout(function() {
    let optionText = currentOption.textContent.trim().toLowerCase();
    for (i=0; i < menuDrawers.length; i++) {
      menuDrawers[i].classList.remove('active');
    }
    currentOption.classList.remove('active');
  }, hideDelay);
});

}
}

document.addEventListener('DOMContentLoaded', menuSetup);


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
      slidesPerView: 3,
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
  },

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
// console.log(sliderLogos);

featBrands.on('slideChange', function () {

      Array.from(sliderLogos).forEach(function (el) {
        el.classList.remove('active');

      });
      
      var activeIndex = featBrands.activeIndex;
      sliderLogos[activeIndex].classList.add('active');
    });


  
  function menuSetup() {
  let showDelay = 400, hideDelay = 800;
  let menuEnterTimer, menuLeaveTimer;
  let allMenuItems = document.querySelectorAll('.nav .dropdown');
  let menuDrawers = document.querySelectorAll('.dropdown-menu');
  
  var toggleNav = document.getElementById('menuToggle');
  var navDrawer = document.getElementById('mobile-menu');
  var html = document.querySelector('html');
  var body = document.querySelector('body');
  
  toggleNav.addEventListener('click', function () {
    // console.log('mobile nav');
    this.classList.toggle('is-active');
    navDrawer.classList.toggle('active');
    html.classList.toggle('no-scroll');
    body.classList.toggle('no-scroll');
  
  });
  
  for (let i = 0; i < allMenuItems.length; i++) {
  let childDrawer;
  allMenuItems[i].addEventListener('mouseenter', function () {
    let menuChildren = this.childNodes;
    // console.log('thisItem', thisItem);
    for (let k = 0; k < menuChildren.length; k++) {
      // console.log('menu children: ', menuChildren[k].classList)
      let thisChildClasses = menuChildren[k].classList
      if (thisChildClasses.contains('dropdown-menu')) {
        childDrawer = menuChildren[k];
      }
    }
    // clear the opposite timer
    clearTimeout(menuLeaveTimer);
    // add active class after a delay
    menuEnterTimer = setTimeout(function () {
              // hide any active dropdowns
    for (let j = 0; j < menuDrawers.length; j++) {
      menuDrawers[j].classList.remove('active');
    }
      
        childDrawer.classList.add('active');
      }, showDelay);
  
  });
  
      // triggered when user's mouse leaves the menu item
  allMenuItems[i].addEventListener('mouseleave', function() {
    // let thisItem = this.getElementsByClassName('dropdown-menu');
  
    // clear the opposite timer
    clearTimeout(menuEnterTimer);
    // remove active class after a delay
    menuLeaveTimer = setTimeout(function() {
      childDrawer.classList.remove('active');
    }, hideDelay);
  });
    } // end for loop
  } // end menuSetup function
  menuSetup();
}); // end jQuery document.ready function

// ATTENTIVE FOOTER SUBSCRIBE BUTTON

$('#email-subscribe').on('click', function (e) {

if(window.innerWidth >= 760){
//call the desktop creative
console.log('attentive function Desktop fired');
try {
  window.__attentive.trigger(null,null,null,[121332])
} catch (e) {
  console.log(e);
}
} else {
//call the mobile creative
console.log('attentive function Mobile fired');
window.__attentive.trigger(null,null,null,[121333])
}
});

// QTY INPUT CLICK HANDLER
$('.btn-plus, .btn-minus').on('click', function (e) {
e.preventDefault();

var isNegative = $(e.target).closest('.btn-minus').is('.btn-minus');
var input = $(e.target).closest('.input-group').find('input');
if (input.is('input')) {
input[0][isNegative ? 'stepDown' : 'stepUp']()
}
})




})(jQuery);




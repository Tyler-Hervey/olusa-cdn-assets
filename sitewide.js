//Ensures there will be no 'console is undefined' errors
window.console = window.console || (function(){
  var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function(){};
  return c;
})();

$(function() {


$( "img" ).on('error', function() {
  Rollbar.error("Image Missing");
  /*.attr( "src", "https://res.cloudinary.com/outlandusa/image/upload/v1444923225/0.png" );*/
 });

(function($) {
    var uniqueCntr = 0;
    $.fn.scrolled = function (waitTime, fn) {
        if (typeof waitTime === "function") {
            fn = waitTime;
            waitTime = 500;
        }
        var tag = "scrollTimer" + uniqueCntr++;
        this.scroll(function () {
            var self = $(this);
            var timer = self.data(tag);
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                self.removeData(tag);
                fn.call(self[0]);
            }, waitTime);
            self.data(tag, timer);
        });
    }
})(jQuery);

// sessionStorage.clear();

// Display Welcome Message to Logged In Users
if( !('isUserWelcomed' in sessionStorage) ){
  sessionStorage.isUserWelcomed = false;
}
if( checkCookie('_NSGN') && checkCookie('_NSGL') === true && $.trim(decodeURIComponent(getCookie('_NSGN')).replace(/"/gi,'')).length && sessionStorage.isUserWelcomed === "false" ){
  createNotify('<span class=\'glyphicon glyphicon-ok\'></span>&nbsp;Welcome back ' + $.trim(decodeURIComponent(getCookie('_NSGN')).replace(/"/gi,'')) + '!','success');
  sessionStorage.isUserWelcomed = true;
}else if( !checkCookie('_NSGN') || ( checkCookie('_NSGL') === true && getCookie('_NSGL') === "false" ) ){
  sessionStorage.isUserWelcomed = false;
}
// End Welcome Message

$('[data-toggle="tooltip"]').tooltip().click(function(e) {
      $(this).tooltip('toggle');
  });

$('.toggle-showall').on('click',function(e){
  e.preventDefault();
  $('.' + $(e.currentTarget).data('toggle') + ' .toggle').toggleClass('hidden');
});

// $('a.btn-popover-phone').webuiPopover({
// 	title:"We're here to help...",
// 	type:'async',
// 	url:'/outlandusa/home/phone',
// 	content:function(data){

// 		return data.html;
// 	},
// 	trigger:'hover',
// 	padding:true,
// 	closeable:false,
// 	cache:false
// });

$('a.btn-popover-support').webuiPopover({
  title:"Help / Contact Us",
  type:'async',
  url:'/outlandusa/home/faqs',
  content:function(data){
    // add link to return info
    var returnsLink = '<div class="dropdown-support"><blockquote><h4><a href="/helpscout/article/view/559582f4e4b0f73dcad836ae">Our Return Policy</a></h4></blockquote></div>';
    
    var helpHTML = returnsLink + data.html;
    return  helpHTML;
  },
  trigger:'hover',
  padding:true,
  closeable:false,
  cache:false,
  width:400
});
$('a.btn-popover-myaccount').webuiPopover({
  title:"Your Account",
  type:'async',
  url:'/outlandusa/home/myaccount',
  content:function(data){

    return data.html;
  },
  trigger:'hover',
  padding:true,
  closeable:false,
  cache:false
});
$('a.btn-popover-cart').webuiPopover({
  title:"Your Shopping Cart",
  type:'async',
  url:'/outlandusa/home/cart',
  content:function(data){

    return data.html;
  },
  trigger:'hover',
  padding:false,
  style:"overflow:hidden;",
  width:346,
  height:325,
  closeable:false,
  cache:false
});

/*
  $('.dropdown').hover(function(e) {
    if( $(document).width() > 749 ){
      $(this).toggleClass('open');
    }
  });
  $('.dropdown').click(function(e) {
    if( $(document).width() > 749 ){
      e.preventDefault;
    }
  });
*/
$('.dropdown-toggle:not(.preventLocation)').on('click',function(e){
  e.preventDefault;
  if( $('.navbar-collapse').hasClass('in') ){
  }else {
    window.location.href = $(e.currentTarget).attr('href');
  }
});

// $('.dropdown-toggle').dropdownHover({delay:500,instantlyCloseOthers:true,hoverDelay:400});
$('.nsg-menu-image').mouseover(function(event) {
  var mysrc = $(event.currentTarget).attr('src');
  $(event.currentTarget).attr('src',mysrc.replace(',e_grayscale','').replace('/o_40','')).attr('data-src',mysrc);
}).mouseout(function(event) {
  $(event.currentTarget).attr('src',$(event.currentTarget).attr('data-src'));
});;


// $('.dropdown-toggle').click(function(e){
// 	e.preventDefault();
// });


$('.search-product-swap-images').on('mouseover click',function(e){
  e.preventDefault();
  var newImage = $(e.currentTarget).attr('data-pic');
  var newLink = $(e.currentTarget).attr('data-link');
  var newPrice = $(e.currentTarget).attr('data-price');
  var newDiscount = $(e.currentTarget).attr('data-discount');
  var newTitle = $(e.currentTarget).attr('data-title');
  var newManufacturer = $(e.currentTarget).attr('data-manufacturer');
  var newManufacturerLink = $(e.currentTarget).attr('data-manufacturer-link');

  var targetElm = $(e.currentTarget)

  if( targetElm.attr('rel') == 'icons' ){
    targetElm = targetElm.parent().parent().parent().parent();
  }else if( targetElm.attr('rel') == 'colors' ){
    targetElm = targetElm.parent().parent();
  }

  var imgPath = targetElm.find('.search-product-primary-pic').data('baseimg');
    imgPath = imgPath + newImage + '.jpg';


  targetElm.find('.search-product-primary-pic').attr('src',imgPath);
  targetElm.find('.search-product-primary-pic').attr('srcset',imgPath + ' 256w, ' + imgPath + ' 512w,' + imgPath + ' 768w,' + imgPath + ' 1024w,' + imgPath + ' 1280w');

  targetElm.find('.search-product-link').each(function(i,e){
    $(e).attr('href',newLink);
  });

  targetElm.find('.search-product-price').each(function(i,e){
    $(e).html(newPrice);
  });

  targetElm.find('.search-product-discountValue').each(function(i,e){
    if( newDiscount.length ){
      targetElm.find('.hasPriceRange').remove();
      $(e).html(newDiscount);
    }
  });

  targetElm.find('.search-product-name > a').each(function(i,e){
    $(e).text(newTitle);
  });

  targetElm.find('.search-product-manufacturer').each(function(i,e){
    $(e).find('a').attr('href',newManufacturerLink).text(newManufacturer);
  });

});

$.preloadImages = function(arr) {
  for (var i = 0; i < arr.length; i++) {
    $("<img />").attr("src", arr[i]);
  }
}

var imagePreload = [];
$('[data-preload]').each(function(pos,elem){
  imagePreload.push($(elem).data('preload'));
});

$.preloadImages(imagePreload);

// Footer
  var $windowWidth = $(window).width();
  var expandedHeight = ( $windowWidth < 769 ? 415 : 88 );
  var minimizedHeight = ( $windowWidth < 769 ? 35 : 35 );
  $(window).resize(function(){
    $windowWidth = $(window).width();
    expandedHeight = ( $windowWidth < 769 ? 415 : 88 );
    minimizedHeight = ( $windowWidth < 769 ? 35 : 35 );
  });

  var userControl = false;

  // Show/Hide Test Website Message
  $('#isTestWebsiteNotification').animate({bottom:"30px"},{duration:150,easing:"linear"});
  setTimeout(function(){
    $('#isTestWebsiteNotification').animate({bottom:"-30px"},{duration:150,easing:"linear"})
  },3000);

  $('#newsletter-subscribe button').click(function(e){
    e.preventDefault();
    e.stopPropagation();
    $('#newsletter-subscribe').submit();
  });
  // Subscribe to Newsletter/Coupon/Deals
  $('#newsletter-subscribe').submit(function(e){
    e.preventDefault();
    e.stopPropagation();

    $('#newsletter-subscribe button').addClass('disabled');
    $('#newsletter-subscribe button').attr('disabled','disabled');
    var url = $(this).attr('action') + '?' + $(this).serialize();
    $.get( url, function( response ) {
      if( $.trim(response) === 'true' || $.trim(response) === true ){
        // Success
        $('#newsletter-email').css('border','1px solid green');
        $('#newsletter-subscribe button').removeClass('btn-default').addClass('btn-success').html( '<i class="fa fa-check"></i>&nbsp;Subscribed!' );
      }else {
        // Failure
        $('#newsletter-email').css('border','1px solid red');
      }
    });
  });

});

function createNotify(message, type){
  var html = '<div class="alert alert-' + type + ' alert-dismissable page-alert">';
  html += '<button type="button" class="close"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>';
  html += message;
  html += '</div>';
  $(html).hide().prependTo('#notificationBar').slideDown();

  $('.page-alert .close').click(function(e) {
      e.preventDefault();
      $(this).closest('.page-alert').slideUp();
  });
  $('#notificationBar').delay(6500).slideUp();
};

function setCookie(cname, cvalue, exminutes){
var d = new Date();
d.setTime(d.getTime() + (exminutes*60*1000));
var expires = "expires=" + d.toUTCString();
document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length,c.length);
      }
  }
  return "";
}

function checkCookie( cname ) {
  var check_cookie = getCookie( cname );
  if (check_cookie != "" ) {
      return true;
  }else {
    return false;
  }
}

function getGridHeight(){
const grid = document.getElementsByClassName('grid')[0];
return Math.max( grid.scrollHeight, grid.offsetHeight );
};
function getFooterHeight(){
const footer = document.getElementsByTagName('footer')[0];
return Math.max(
  footer.scrollHeight, footer.offsetHeight
);
};
function getDocumentWidth(){
return $(window).width();
};
function getDocumentHeight(){
const body = document.body;
const html = document.documentElement;

return Math.max(
  body.scrollHeight, body.offsetHeight,
  html.clientHeight, html.scrollHeight, html.offsetHeight
);
};

function getScrollTop() { return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop; };
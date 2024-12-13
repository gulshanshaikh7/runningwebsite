$(document).ready(function(){
    $('.slick-carousel').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 18000,  // Slower autoplay (5 seconds)
        arrows: false,
        dots: true,
        cssEase: 'ease-in-out'  // Smoother transition effect
    });
});

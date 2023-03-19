// JavaScript Document


$(document).ready(function() {
 'use strict';
 var main_function = function(e) {
  stopAnimation();
  $("#ambience_content").fadeOut();
  $("#product_content").fadeOut();
  $("#service_content").fadeOut();
  $('html, body').stop().animate();
  //$("input[type='radio']").prop("checked", false);
  var val = e;
	 //console.log(val);
  if (val >= 1 && val <= 10) {
   $("#rating").val(val);
  } else {
   $("#rating").val(0);
  }
  $("#feedback-content").fadeIn();
  //animationFunction();
  var animatio1;
  var animatio2;

  function animationFunction() {
   animatio1 = setTimeout(function() {
    $('html, body').animate({
     scrollTop: $("#scroll1").offset().top
    }, 1000);
    animatio2 = setTimeout(function() {
     $('html, body').animate({
      scrollTop: $("#more").offset().top-80
     }, 1000);
    }, 2000);
   }, 0);
  }

  function stopAnimation() {
   clearTimeout(animatio1);
   clearTimeout(animatio2);
  }
  $(".feedback_number span").text(val);
  if (val <= 1) {
   //console.log(val);
   $("#questions").fadeIn();
   $("#fd_txt").text("Accept our sincere apologies! Give us an opportunity to delight you ");
   $("div.rs-range-color + div.rs-range-color").removeClass("bg2 bg3 bg4");
   $("div.rs-range-color + div.rs-range-color").addClass("bg1");
  } else if (val <= 3) {
   $("#questions").fadeIn();
   $("#fd_txt").text("Sorry! Give us an opportunity to make it better ");
   $("div.rs-range-color + div.rs-range-color").removeClass("bg1 bg3 bg4");
   $("div.rs-range-color + div.rs-range-color").addClass("bg2");
  } else if (val <= 4) {
   $("#questions").fadeIn();
   $("#fd_txt").text("Looks like we missed an opportunity to delight you ");
   $("div.rs-range-color + div.rs-range-color").removeClass("bg1 bg2 bg4");
   $("div.rs-range-color + div.rs-range-color").addClass("bg3");
  } else {
   //$("#questions").fadeOut();
   $("#fd_txt").text("WOW! That’s truly encouraging ");
   $("div.rs-range-color + div.rs-range-color").removeClass("bg1 bg2 bg3");
   $("div.rs-range-color + div.rs-range-color").addClass("bg4");
  }
 };

	
  $("input[name='recommend']").on("change", function(){
	  main_function($(this).val());
  })
   
	
 $('.questionSection .level1 input[type=radio]').on('change', function() {
  var rd_val = $(this).val();
  $(this).parents(".questionSection").find(".level2 input[type=radio]").prop('checked', false);
  $(this).prop('checked', true);
  if (rd_val == 0 || rd_val == 1) {
   $(this).parents(".questionSection").find(".level2").fadeIn();
  } else {
   $(this).parents(".questionSection").find(".level2").fadeOut();
  }
 });
 $('.questionSection .level2 .answers:last-child input[type=radio]').on("change", function() {
  var nextQuestion = $(this).parents(".questionSection").next(".questionSection");
  setTimeout(function() {
   $('html, body').animate({
    scrollTop: nextQuestion.offset().top
   }, 1000);
  });
 });


 $("input[type=radio]").on("change", function() {
  var n = $("input[value=0]:checked").length;
  if (n > 0) {
   $("#callBack").fadeIn();
  } else {
   $("#callBack").fadeOut();
  }
 });

});
// Grab each node for easy selection
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const startButton = document.querySelector('.startButton');
const stopButton = document.querySelector('.stopButton');
const breakButton = document.querySelector('.breakButton');

// Set intervalId globally so that setInterval can be easily cleared
let intervalId = null;

// Update the html timer according to the time captured to overcome javascript throttling in inactive tabs
function remainingTime(eTime){
  // Capture the new current time each time the method is called
  const currentTime = Date.parse(new Date());

  // Checks to see if the minutes are below 10 so that it can add the inital zero in the front
  if(Math.floor( ((eTime-currentTime)/1000/60) % 60 ) >= 10){
    minutes.textContent = `${Math.floor( ((eTime-currentTime)/1000/60) % 60 )}`;
  } else {
    minutes.textContent = `0${Math.floor( ((eTime-currentTime)/1000/60) % 60 )}`;
  }

  // Checks to see if the seconds are below 10 so that it can add the inital zero in the front
  if(Math.floor( ((eTime-currentTime)/1000) % 60 ) >= 10){
    seconds.textContent = `${Math.floor( ((eTime-currentTime)/1000) % 60 )}`;
  } else {
    seconds.textContent = `0${Math.floor( ((eTime-currentTime)/1000) % 60 )}`;
  }

  // Checks if the timer has reached zero, and if it has stop the setInterval
  checkIfTimerIsZero();
}

// Check if the timer has reached zero
function checkIfTimerIsZero(){
  // If the timer has reached zero, play the gong noise
  if((Number(minutes.textContent) + Number(seconds.textContent)) === 0){
    var noise = new Audio("gong.mp3");
    noise.play();
    clearInterval(intervalId);
  }
}

// Check to see if the start button has been pushed
startButton.addEventListener('click', function(event){
  // Clear any setInterval calls that are being made
  clearInterval(intervalId);
  // Change the minutes and seconds to 25
  minutes.textContent = "25";
  seconds.textContent = "00";
  // Save the time of when the timer starts
  const startTime = Date.parse(new Date());
  // Save the time of when it should end
  const endTime = Date.parse(new Date(startTime + (25*60*1000)));
  // Start the countdown
  intervalId = setInterval(remainingTime, 1000, endTime);
});

// Check to see if the break button has been pushed
breakButton.addEventListener('click', function(event){
  // Clear any setInterval calls that are being made
  clearInterval(intervalId);
  // Change the minutes and seconds to 5
  minutes.textContent = "05";
  seconds.textContent = "00";
  // Save the time of when the timer starts
  const startTime = Date.parse(new Date());
  // Save the time of when it should end
  const endTime = Date.parse(new Date(startTime + (5*60*1000)));
  // Start the countdown
  intervalId = setInterval(remainingTime, 1000, endTime);
});

// Check to see if the stop button has been pushed
stopButton.addEventListener('click', function(event){
  // Clear any setInterval calls that are being made
  clearInterval(intervalId);
});

$(document).ready(function(){

  // // Capture the current number of each of the html digits
  // var minutesFirstDigit = Number($(".minutesFirstDigit").text());
  // var minutesSecondDigit = Number($(".minutesSecondDigit").text());
  // var secondsFirstDigit = Number($(".secondsFirstDigit").text());
  // var secondsSecondDigit = Number($(".secondsSecondDigit").text());
  //
  // // Captures the interval of the window timers, so that the intervals do not compound on each other
  // var timerInterval = 0;
  //
  // // Begins the timer, and checks whether it has reached zero
  // function countDown(){
  //   if(secondsSecondDigit > 0){
  //     $(".secondsSecondDigit").html(--secondsSecondDigit);
  //   } else if(secondsSecondDigit === 0 && secondsFirstDigit > 0){
  //     $(".secondsFirstDigit").html(--secondsFirstDigit);
  //     $(".secondsSecondDigit").html(secondsSecondDigit = 9);
  //   } else if(secondsSecondDigit === 0 && secondsFirstDigit === 0 && minutesSecondDigit > 0){
  //     $(".minutesSecondDigit").html(--minutesSecondDigit);
  //     $(".secondsFirstDigit").html(secondsFirstDigit = 5);
  //     $(".secondsSecondDigit").html(secondsSecondDigit = 9);
  //   } else if(secondsSecondDigit === 0 && secondsFirstDigit === 0 && minutesSecondDigit === 0 && minutesFirstDigit > 0){
  //     $(".minutesFirstDigit").html(--minutesFirstDigit);
  //     $(".minutesSecondDigit").html(minutesSecondDigit = 9);
  //     $(".secondsFirstDigit").html(secondsFirstDigit = 5);
  //     $(".secondsSecondDigit").html(secondsSecondDigit = 9);
  //   }
  //
  //   // Checks to see if the count down has reached 0, and if it HAS, play sound
  //   if(minutesFirstDigit + minutesSecondDigit + secondsFirstDigit + secondsSecondDigit === 0){
  //     var noise = new Audio("gong.mp3");
  //     noise.play();
  //     window.clearInterval(timerInterval);
  //   }
  // }
  //
  // // Chnages the value of the digits variables and the html to 25
  // function start(){
  //   $(".minutesFirstDigit").html(2);
  //   minutesFirstDigit = 2;
  //   $(".minutesSecondDigit").html(5);
  //   minutesSecondDigit = 5;
  //   $(".secondsFirstDigit").html(0);
  //   secondsFirstDigit = 0;
  //   $(".secondsSecondDigit").html(0);
  //   secondsSecondDigit = 0;
  // }
  //
  // // Chnages the value of the digits variables and the html to 5
  // function interval(){
  //   $(".minutesFirstDigit").html(0);
  //   minutesFirstDigit = 0;
  //   $(".minutesSecondDigit").html(5);
  //   minutesSecondDigit = 5;
  //   $(".secondsFirstDigit").html(0);
  //   secondsFirstDigit = 0;
  //   $(".secondsSecondDigit").html(0);
  //   secondsSecondDigit = 0;
  // }
  //
  //
  // // Buttons for timer
  //
  // $(".startButton").on("click", function(){
  //   // Change the timer to 25
  //   start();
  //   // Clear any window interval that may be occurring
  //   window.clearInterval(timerInterval);
  //   // Set the window interval to a second and have it call the countDown method
  //   timerInterval = window.setInterval(countDown, 1000);
  // });
  //
  // $(".breakButton").on("click", function(){
  //   // Change the timer to 25
  //   interval();
  //   // Clear any window interval that may be occurring
  //   window.clearInterval(timerInterval);
  //   // Set the window interval to a second and have it call the countDown method
  //   timerInterval = window.setInterval(countDown, 1000);
  // });
  //
  // $(".stopButton").on("click", function(){
  //   // Clear any window interval that may be occurring
  //   window.clearInterval(timerInterval);
  // });


  // Behavior for the Notes list notes

  // Automatically hide the Notes list as soon as the page loads
  $(".notesList").hide();

  // Whenever a note is hovered on, the Complete and Delete icons appear, and disappear
  $(".notesList").on("mouseenter", ".todo", function(){
    // Removes the fadeOut class just in case it already has the class
    $(this).children().not(".todoText").removeClass("fadeOut");
    // Adds a class of fadeIn
    $(this).children().not(".todoText").addClass("fadeIn");
  }).on("mouseleave", ".todo", function(){
    // Removes the fadeIn class just in case it already has the class
    $(this).children().not(".todoText").removeClass("fadeIn");
    // Adds a class of fadeIn
    $(this).children().not(".todoText").addClass("fadeOut");
  });

  // When a user clicks the Complete icon, the note receives a strike-through
  $(".notesList").on("click", ".complete", function(){
    $(this).parent().children().first().addClass("strike");
  });

  // When a user clicks the Delete icon, the note is deleted from the list
  $(".notesList").on("click", ".delete", function(){
    $(this).parent().remove();

    // After clicking the note, if there are notes left, add the instructions back onto the page and remove the Notes list
    if($(".notesList").children().length === 0){
      $(".notesList").hide();
      $(".instructions").show();
    }
  });

  // Buttons for Notes List

  $(".addNoteButton").on("click", function(){
    // Show the form for adding a note
    $(".noteForm").css("visibility","visible");
    // Blur everything behind the form
    $(".timer, .notes").addClass("blur");
    // Put the form into focus
    $(".noteFormInput").focus();
  });

  $(".submitNoteButton").on("click", function(event){
    event.preventDefault();

    // The reason for this if statement, is because I only want these methods to fire when the list was originally 0, and not everytime the submit button is clicked
    if($(".notesList").children().length === 0){
      $(".instructions").hide();
      $(".notesList").show();
    }

    // Append the value from the form into a new list item on the page
    $(".notesList").append("<li class=\"todo\" ><span class=\"todoText\">" + $(".noteFormInput").val() + "</span><span class=\"complete\">√</span><span class=\"delete\">X</span></li>");
    // Remove the blur class
    $(".timer, .notes").removeClass("blur");
    // Reset the form, jus tin case there was information entered
    $(".noteForm > form").trigger("reset");
    // Hide the form
    $(".noteForm").css("visibility","hidden");
  });

  // If the form is no longer in focus, the form disappears and the blur effect is removed
  $(".noteForm").on("focusout", function(){
    // Hide the form
    $(this).css("visibility","hidden");
    $(".noteForm > form").trigger("reset");
    $(".timer, .notes").removeClass("blur");
  });

});

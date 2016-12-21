// Functionality for the timer

// Grab each node for easy selection
const timer = document.querySelector('.timer');
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

// Functionality for the Notes

// Grab each node for easy selection
const notes = document.querySelector('.notes');
const noteForm = document.querySelector('.noteForm');
const noteFormInput = document.querySelector('.noteFormInput');
const notesList = document.querySelector('.notesList');
const addNoteButton = document.querySelector('.addNoteButton');
const submitNoteButton = document.querySelector('.submitNoteButton');

// This function creates a new note with event listeners attached to be inserted into the DOM
function createNewNote(input){
  let li = document.createElement('li');
  li.classList.add('todo');
  let noteSpan = document.createElement('span');
  noteSpan.classList.add('todoText');
  let checkmarkSpan = document.createElement('span');
  checkmarkSpan.classList.add('complete');
  let deleteSpan = document.createElement('span');
  deleteSpan.classList.add('delete');
  let noteText = document.createTextNode(input);
  let deleteText = document.createTextNode('X');
  let checkmarkText = document.createTextNode('√');
  noteSpan.appendChild(noteText);
  checkmarkSpan.appendChild(checkmarkText);
  deleteSpan.appendChild(deleteText);
  li.appendChild(noteSpan);
  li.appendChild(checkmarkSpan);
  li.appendChild(deleteSpan);
  notesList.appendChild(li);

  // Whenever a note is hovered on, the Complete and Delete icons appear
  li.addEventListener('mouseenter', function(event){
    // Removes the fadeOut class just in case it already has the class
    li.querySelectorAll('span:not(.todoText)').forEach(element => element.classList.remove('fadeOut'));
    // Adds a class of fadeIn
    li.querySelectorAll('span:not(.todoText)').forEach(element => element.classList.add('fadeIn'));
  });

  // Whenever a note is not hovered on, the Complete and Delete icons disappear
  li.addEventListener('mouseleave', function(event){
    // Removes the fadeIn class just in case it already has the class
    li.querySelectorAll('span:not(.todoText)').forEach(element => element.classList.remove('fadeIn'));
    // Adds a class of fadeOut
    li.querySelectorAll('span:not(.todoText)').forEach(element => element.classList.add('fadeOut'));
  });

  // When a user clicks the Complete icon, the note receives a strike-through
  checkmarkSpan.addEventListener('click', function(event){
    this.parentNode.firstChild.classList.add('strike');
  });

  // When a user clicks the Delete icon, the note is deleted from the list
  deleteSpan.addEventListener('click', function(event){
    this.parentNode.parentNode.removeChild(this.parentNode);

    // After clicking the note, if there are no notes left, remove the Notes list
    if(notesList.children.length === 0){
      notesList.style.display = 'none';
    }
  });
}

// Automatically hide the Notes list as soon as the page loads
notesList.style.display = 'none';

// Functionality for 'Add a Note' button
addNoteButton.addEventListener('click', function(event){
  // Show the form for adding a note
  noteForm.style.visibility = 'visible';
  // Blur everything behind the form
  notes.classList.add('blur');
  timer.classList.add('blur');
  // Put the form into focus
  noteFormInput.focus();
});

// If the form is no longer in focus, the form disappears and the blur effect is removed
noteForm.addEventListener('focusout', function(event){
  // Hide the form
  this.style.visibility = 'hidden';
  // Unblur everything behind the form
  notes.classList.remove('blur');
  timer.classList.remove('blur');
  // Reset the form
  noteForm.reset();
});

submitNoteButton.addEventListener('click', function(event){
  event.preventDefault();

  // The reason for this if statement, is because I only want these methods to fire when the list was originally 0, and not everytime the submit button is clicked
  if(notesList.children.length === 0){
    notesList.style.display = 'inline';
  }

  // Append the value from the form into a new list item on the page
  createNewNote(document.querySelector('.noteFormInput').value);

  // Remove the blur class
  notes.classList.remove('blur');
  timer.classList.remove('blur');

  // Reset the form, just in case there was information entered
  noteForm.reset();

  // Hide the form
  noteForm.style.visibility = 'hidden';
});

var buttonColours = ["green", "red", "yellow", "blue"]; // array of colors of the Simon game
var gamePattern = []; // array for the game pattern
var userClickedPattern = [];  // array for the clicked color

var started = false;
var level = 0;

// function to Start the game when "Start" button is clicked
$("#Start").click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    started = true;
    nextSequence();
    $("#Start").hide();
  }
});

// function to add the chosen color to the clicked pattern
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id"); // get the chosen color by id
    userClickedPattern.push(userChosenColour); // add the chosen color to clicked pattern

    playSound(userChosenColour); // play the sound of the color
    animatePress(userChosenColour); // animate the color when clicked

    checkAnswer(userClickedPattern.length-1); // compare the clicked color to the correct color of the game pattern
});

// function to compare the clicked color and the random color of the game
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      restart();
      
    }
}

// function to add the next color of the game pattern
function nextSequence() {
  if (started) {
    userClickedPattern = [];
    countLevel();
  
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }

}

// function to count the level
function countLevel(){
  level++;
  $("#level-title").text("Level " + level);
}

// function to animate the clicked color
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// function to play the sound of the color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// function to  restart
function restart() {
  level = 0;
  gamePattern = [];
  started = false;
  $("#Start").show().text("Restart");
}

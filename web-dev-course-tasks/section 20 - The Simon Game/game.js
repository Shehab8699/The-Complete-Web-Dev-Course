let buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keydown(() => {
  if (!started) {
    $('#level-title').text('Level ' + level);
    nextSequence();
    started = true;
  }
});

$('.btn').click((event) => {
  let userChosenColor = event.target.id;

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('#level-title').text('Level ' + level);
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

function playSound(x) {
  let audio = new Audio('./sounds/' + x + '.mp3');

  audio.play();
}
function animatePress(x) {
  $('#' + x)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}
function checkAnswer(currenLevel) {
  if (gamePattern[currenLevel] == userClickedPattern[currenLevel]) {
    console.log('sucess');
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');
    animateWrong();
    $('h1').text('Game Over, Press Any Key to Restart');
    started = false;
    level = 0;
    gamePattern = [];
  }
}

function animateWrong() {
  $('body').addClass('game-over');
  setTimeout(() => {
    $('body').removeClass('game-over');
  }, 200);
}

// creating random numbers for game
let radomNmber1 = Math.floor(Math.random() * 6) + 1;
let radomNmber2 = Math.floor(Math.random() * 6) + 1;

let randomImage1 = 'images/dice' + radomNmber1 + '.png';
let randomImage2 = 'images/dice' + radomNmber2 + '.png';

let img1 = document.querySelectorAll('img')[0];

img1.setAttribute('src', randomImage1);

let img2 = document.querySelectorAll('img')[1];
img2.setAttribute('src', randomImage2);

if (radomNmber1 > radomNmber2) {
  document.querySelector('h1').innerHTML = 'Player 1 Wins!';
} else if (radomNmber2 > radomNmber1) {
  document.querySelector('h1').innerHTML = 'Player 2 Wins!';
} else {
  document.querySelector('h1').innerHTML = 'Draw!';
}

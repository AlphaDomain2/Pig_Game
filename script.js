'use strict';

//selecting elements
const player0El=document.querySelector('.player--0');
const player1El=document.querySelector('.player--1');
const score0El=document.querySelector('#score--0');
const score1El=document.getElementById('score--1');
const diceEl=document.querySelector('.dice');
const btnNew=document.querySelector('.btn--new');
const btnRoll=document.querySelector('.btn--roll');
const btnHold=document.querySelector('.btn--hold');
const current0El=document.getElementById('current--0');
const current1El=document.getElementById('current--1');

let scores, currentScore, activePlayer, playing;

const init=function(){
    scores=[0,0];
    currentScore=0;
    activePlayer=0;
    playing=true;

    score0El.textContent=0;
    score1El.textContent=0;
    current0El.textContent=0;
    current1El.textContent=0;

    diceEl.classList.add('hidden');
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
}

init();

const switchPlayer=function(){document.getElementById(`current--${activePlayer}`).textContent=0;
currentScore=0;
activePlayer= activePlayer === 0 ? 1 : 0;
player0El.classList.toggle('player--active');
player1El.classList.toggle('player--active');
};

//rolling dice functionality
btnRoll.addEventListener('click',function(){
    if(playing){
        //generating a random dice roll
        const dice=Math.trunc(Math.random()*6)+1;

        //display dice
        diceEl.classList.remove('hidden');
        diceEl.src=`dice-${dice}.png`;

        //check for rolled 
        if(dice!==1){
            //add dice to current score
            currentScore+=dice;
            document.getElementById(`current--${activePlayer}`).textContent=currentScore;
        }
        else{
            //switch to the next player
            switchPlayer();
        }
    }
});
//holding the score functionality
btnHold.addEventListener('click',function(){
    if(playing){
        //add currentScore to active player's score
        scores[activePlayer]+=currentScore;
        document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];
        //check if player's score is 100
        //finish the game
        if(scores[activePlayer]>=100){
            playing=false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
        }
        else{
            //if not then switch to the next player
            switchPlayer();
        }
    }
});

//resetting the game functionality
btnNew.addEventListener('click',init);
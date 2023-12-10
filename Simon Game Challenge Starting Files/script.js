var divLength = document.querySelectorAll(".btn");
var randomColor = ["red", "blue", "yellow", "green"];
var pattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//Starting The Game
$(document).keydown(function(){
    if(!started)
    {
        $("#level-title").text("Level"+level);
        randomSequence()
        started = true;
        
    }
})

$(".btn").click(function handler(){
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);
})

//Check the user answer with the system code 
function checkAnswer(currentLevel){
    if(pattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("Success");

        if(userClickedPattern.length === pattern.length)
        {
            setTimeout(function(){
                randomSequence();
            },1000);
        }
    }

   
    else{
        console.log("Wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startover();
    }

}

//Random part

function randomSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level)
   const randomNumber = Math.floor(Math.random() * 4);
   const chooseRandomcolor = randomColor[randomNumber]; 
    pattern.push(chooseRandomcolor);
 //animation and sound for the random color 
    $("#" + chooseRandomcolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(chooseRandomcolor)
}

//play sound for individual button press



function playSound(y){

    var audio = new Audio("sounds/"+y+".mp3");
    audio.play();
    
}

function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");

   setTimeout(function (){
    $("#"+ currentColor).removeClass("pressed");
   },100);

}

function startover()
{
    level = 0;
  pattern = [];
  started = false;
}

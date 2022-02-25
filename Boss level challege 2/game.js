var buttonColors = [ "red", "blue", "green", "yellow" ];

var gamePattern = [];

var noOfClicks = 0;

// Start the game
$(document).keydown(function (){
    if(gamePattern.length <= 0){
        changeHeading("Level "+(gamePattern.length+1));
        nextSequence();
    }
});


// If game is started, handle click events
$(".container").click(function (event){
    if(gamePattern.length <= 0) return;
    animateButton(event.target.id);

    if(event.target.id == gamePattern[noOfClicks]){
        if(noOfClicks == gamePattern.length-1){
            setTimeout(() => {
                changeHeading("Level "+(gamePattern.length+1));
                nextSequence();
                noOfClicks = 0;
            }, 1000);
        }
        noOfClicks++;
    }else{
        gameOver();
    }
    console.log(gamePattern);
});

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour  = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    animateButton(randomChosenColour);
}

function animateButton(color){
    var button = $(".btn."+color);
    button.addClass("pressed");
    var aud = new Audio("sounds/"+color+".mp3");
    aud.play();
    setTimeout(() => {
        button.removeClass("pressed");
    }, 100);
}

function changeHeading(str){
    $("#level-title").text(str);
}

function gameOver(){
    gamePattern = [];
    currUserPattern = [];
    noOfClicks = 0;
    console.log("looserrr");
    changeHeading("Game Over, Press Any key to restart");
    $("body").addClass("game-over");
    var aud = new Audio("sounds/wrong.mp3");
    aud.play();
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 300);
}
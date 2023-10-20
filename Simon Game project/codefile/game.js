var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var userClickedPattern=[];
var started=false;
var level=0;
var timer;
function updateTimerDisplay(timeLeft) {
    $("#timer").text("Time Left: " + timeLeft + " seconds");
}
function Gameover(){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Time Limit Exceeded,Press Any Key to Restart");
    startOver();
}
$(".btn").click(function(){
    if(started){
        var userChosenColour=$(this).attr("id"); 
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    }
});
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){ 
        console.log("success");
        if(userClickedPattern.length==gamePattern.length){
            clearTimeout(timer);
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else{
        clearTimeout(timer);
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Wrong Click, Press Any Key to Restart");
        startOver();
    }
}
$(document).keypress(function(){
    if(!started){
        nextSequence();
        started=true;
    }
});
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(4*Math.random());
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    var timeLeft = level+1;
    updateTimerDisplay(timeLeft);
    timer = setInterval(function () {
        timeLeft--;
        updateTimerDisplay(timeLeft);
        if (timeLeft === 0) {
            clearInterval(timer);
            Gameover();
        }
    }, 1000);
}
function playSound(name){
    var audio=new Audio("sounds/" + name +".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    updateTimerDisplay(0);
}
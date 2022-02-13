let buttonColours,
    randomChosenColour,
    gamePattern,
    userButtons,
    gameStatus,
    audio,
    level;

buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = new Array();
userButtons = new Array();
gameStatus = false;
level = 0;

// Start
$(document).on("keydown", () => {
    if (!gameStatus) {
        gameStatus = true;
    }
    resetValues();
    nextSequence();
});

// G4M1NG
$(".btn").on("click", (btn) => {
    if (!gameStatus) {
        gmOver();
    } else {
        btnPress(btn.currentTarget.id);
        userButtons.push(btn.currentTarget.id);
        checkAnswer(userButtons.length);
    }
});

function checkAnswer(layer) {
    if (userButtons[layer - 1] === gamePattern[layer - 1]) {
        console.log("yea");
        if (gamePattern.length === userButtons.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        gmOver(true);
    }
}

function nextSequence() {
    level++;
    userButtons = [];
    randomChosenColour = buttonColours[randomNumber()];
    gamePattern.push(randomChosenColour);
    $("#level-title").html(`Level ${level}`);
    btnFlick(randomChosenColour);
}

// Buttons
function btnPress(btn) {
    btnId = "#" + btn;
    playAudio(btn);
    $(btnId).addClass("pressed");
    setTimeout(() => {
        $(btnId).removeClass("pressed");
    }, 200);
}

function btnFlick(btn) {
    btnId = "#" + btn;
    $(btnId).fadeOut(100).fadeIn(300);
}

// Game Over
function gmOver() {
    gmOver(false);
}

function gmOver(gmStatus) {
    playAudio("wrong");
    $("#gmOver").css("visibility", "visible").fadeIn(0).fadeOut(500);
    if (gmStatus) {
        $("#level-title").html(
            "Wrong answer! <br> <span>(press any key to restart)</span>"
        );
        gameStatus = false;
    } else {
        $("#level-title").html("PRESS A KEY TO START");
    }
}

// Extra functions
function randomNumber() {
    return Math.floor(Math.random() * 4);
}

function playAudio(name) {
    audio = new Audio(`sounds/${name}.mp3`);
    audio.volume = "0.09";
    audio.play();
}

function resetValues() {
    userButtons = [];
    gamePattern = [];
    level = 0;
}

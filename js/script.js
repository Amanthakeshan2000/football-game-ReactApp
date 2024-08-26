// Initialize game variables
var score1 = document.getElementById("score1");
var score2 = document.getElementById("score2");
var timerDisplay = document.getElementById("timer");
var ball = $(".ball");
var field = $(".field");

// Initial game score
var leftPlayer = 0;
var rightPlayer = 0;

// Timer variables
var timer;
var seconds = 0;
var minutes = 0;

// Field coordinates
var fieldTop = Math.floor(field.offset().top + ball.height() / 2);
var fieldBottom = Math.floor(field.height() - fieldTop - ball.height() / 2);

// Start the timer
function startTimer() {
    timer = setInterval(function() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
        timerDisplay.textContent = formatTime(minutes) + ":" + formatTime(seconds);
    }, 1000);
}

// Format time to always show two digits
function formatTime(value) {
    return value < 10 ? "0" + value : value;
}

// Ball click event
ball.on("click", function () {
    var i = Math.floor(Math.random() * 2); // Randomly select team
    var randomY = Math.floor(fieldTop + Math.random() * (fieldBottom + 1 - fieldTop));
    var ballCoords = { top: randomY, left: field.width() - ball.width() };

    var ballAnimate = { duration: 600, easing: "linear", complete: goal };

    if (ball.css("left") == "0px") {
        ball.animate({ top: ballCoords.top, left: ballCoords.left }, ballAnimate);
    } else {
        ball.animate({ top: ballCoords.top, left: 0 }, ballAnimate);
    }

    function goal() {
        var gateTop = Math.floor(field.height() / 2 - field.height() / 14 - ball.height() / 2);
        var gateBottom = Math.floor(field.height() / 2 + field.height() / 14 - ball.height() / 2);
        var ballCoordinates = Math.floor(ball.offset().top);

        if (ballCoordinates > gateTop && ballCoordinates < gateBottom) {
            if (i === 0) {
                leftPlayer++;
                score1.innerText = leftPlayer;
            } else {
                rightPlayer++;
                score2.innerText = rightPlayer;
            }

            let timerId = setInterval(() => $("#goal").fadeIn(500).fadeOut(300), 500);
            setTimeout(() => clearInterval(timerId), 1500);
        }
    }
});

// Start the timer when the page loads
startTimer();

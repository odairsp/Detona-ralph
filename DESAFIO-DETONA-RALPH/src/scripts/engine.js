const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        live: document.querySelector(".menu-lives h2")
    },
    values: {

        gameVelocity: 500,
        hitPosition: 0,
        result: 0,
        currentTime: 10,
        lives: 3,
        maxScore:0,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}
function playSound(audioName) {

    let audio = new Audio(`./src/sounds/${audioName}`);
    audio.volume = 0.2;
    audio.play();

}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0 || state.values.lives <= 0) {


        playSound("gameOver.mp3");
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        state.view.squares[12].textContent= "GAME OVER!" ;
        state.view.squares[13].textContent = "SCORE";
        state.view.squares[14].setAttribute("style","font-size: 30px");
        state.view.squares[14].textContent = state.values.result;
        
        init();
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    });

    let randomNumber = Math.floor(Math.random() * 25);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;

}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                playSound("hit.m4a");
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
            } else {

                playSound("liveLost.mp3");
                state.values.lives--;
                state.view.live.textContent = "x" + state.values.lives;
            }
        });
    });
}

function init() {
    addListenerHitBox();

}

init();
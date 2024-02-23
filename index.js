
const score = document.querySelector('.score span');
const states = document.querySelectorAll('.state');
const playBtn = document.querySelector('.buttons .play');
const stopBtn = document.querySelector('.buttons .stop');
let usedStates = [];
let gameOver = false;
let state;
let imagePlant;
let imageVolume;
let imageTrump;
let points = 0;
let randomState;

function endofGame() {
    if (points > 25) {
        alert("You won! Trump doesn't convince enough people to build the coal plants!");
    } else if (usedStates.length === 88) {
        alert("You lost! Trump convinced Americans to build coal plants across the country!");
    }
}

playBtn.addEventListener("click", () => {
    playBtn.style.display = "none";
    stopBtn.style.display = "inline-block";

    const startGame = setInterval(() => {
        if (usedStates.length === 88) {
            clearInterval(startGame);
            endofGame();
            return;
        }

        do {
            randomState = Math.floor(Math.random() * 88);
        } while (usedStates.includes(randomState));
        usedStates.push(randomState);
        state = states[randomState];

        imageTrump = document.createElement("img");
        imageTrump.setAttribute("src", "Images/trump.png");
        imageTrump.setAttribute("class", "trump");
        state.appendChild(imageTrump);

        setTimeout(() => {
            state.removeChild(imageTrump);
            imagePlant = document.createElement("img");
            imagePlant.setAttribute("src", "Images/plant.png");
            imagePlant.setAttribute("class", "plant");
            state.appendChild(imagePlant);
            endofGame();
        }, 1100);

    }, 1200);

    window.addEventListener("click", (e) => {
        if (e.target.classList.contains("trump")) {
            score.innerText = ++points;
            imageVolume = document.createElement("img");
            imageVolume.setAttribute("src", "Images/volumeoff.png");
            imageVolume.setAttribute("class", "volumeoff");
            state.appendChild(imageVolume);
        }
    });

    stopBtn.addEventListener("click", () => {
        clearInterval(startGame);
        stopBtn.style.display = "none";
        playBtn.style.display = "inline-block";
        score.innerText = 0;
        usedStates = [];
        points = 0;
    });
});


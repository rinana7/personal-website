const board = document.getElementById("petalBoard");
const homeimage = document.getElementById("homeImage");
const petalSwitch = document.getElementById("petalSwitch");
const imageSwitch = document.getElementById("imageSwitch");

const mascot = document.getElementById("mascot");
const leftEye = document.getElementById("left-eye");
const rightEye = document.getElementById("right-eye");

let clickCount = 0;
let clickTimer;
let faceTimer; 

const positions = [
    { x: 100, y: 100, rotation: -45 },
    { x: 130, y: 75,  rotation: -30 },
    { x: 165, y: 65,  rotation: -15 },
    { x: 200, y: 70,  rotation: 5 },
    { x: 240, y: 70,  rotation: -5 },
    { x: 275, y: 65,  rotation: 15 },
    { x: 310, y: 75,  rotation: 30 },
    { x: 340, y: 100, rotation: 45 },
    { x: 185, y: 100, rotation: 35 },
    { x: 220, y: 100, rotation: -35 },
    { x: 350, y: 135, rotation: 60 },
    { x: 335, y: 170, rotation: 70 },
    { x: 320, y: 205, rotation: 55 },
];

positions.forEach((position) => {
    const petal = document.createElement("img");

    petal.src = "assets/petal.png";
    petal.className = "petal";

    petal.style.left =`${position.x}px`;
    petal.style.top =`${position.y}px`;
    petal.style.transform =`rotate(${position.rotation}deg)`;
    board.appendChild(petal);
})

board.addEventListener("pointerdown", (event) =>{
    if (!event.target.classList.contains("petal")) return;
    selectedPetal = event.target;

    const petalRect = selectedPetal.getBoundingClientRect();
    offsetX = event.clientX - petalRect.left;
    offsetY = event.clientY - petalRect.top;
    selectedPetal.setPointerCapture(event.pointerId);
});

board.addEventListener("pointermove", (event) => {
    if(!selectedPetal) return;
    const boardRect = board.getBoundingClientRect();

    let x = event.clientX - boardRect.left - offsetX;
    let y = event.clientY - boardRect.top - offsetY;

    selectedPetal.style.left = `${x}px`;
    selectedPetal.style.top = `${y}px`;
});

board.addEventListener("pointerup", () => {
    selectedPetal = null;
});

imageSwitch.addEventListener("click", () => {
    board.style.display = "none";
    homeimage.style.display = "block";
});

petalSwitch.addEventListener("click", () => {
    homeimage.style.display = "none";
    board.style.display = "block";
});


document.addEventListener("mousemove", (event)=>{
    const mascotRect = mascot.getBoundingClientRect();

    const eyes = [
        {
            element: leftEye,
            x: mascotRect.left + 75,
            y: mascotRect.top + 70
        },
        {
            element: rightEye,
            x: mascotRect.left + 75,
            y: mascotRect.top + 70
        }
    ];

    eyes.forEach((eye) => {
        const dx = event.clientX - eye.x;
        const dy = event.clientY - eye.y;

        const angle = Math.atan2(dy, dx);

        const distance = Math.min(
            5,
            Math.hypot(dx, dy) / 100
        );

        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;

        eye.element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

mascot.addEventListener("click", () => {
    clickCount++;
    clearTimeout(clickTimer);
    clearTimeout(faceTimer);
    if (clickCount === 2) {
        leftEye.textContent = "O";
        rightEye.textContent = "O";
        const suprise = document.createElement("span");
        suprise.textContent = "!!";
        suprise.classList.add("mascot-suprise");
        mascot.appendChild(suprise);

        setTimeout(() => {
        suprise.remove();
        }, 500);
    } else {
        leftEye.textContent = "^";
        rightEye.textContent = "^";
        mascot.classList.add("happy");

        const heart = document.createElement("span");
        heart.textContent = "❤️";
        heart.classList.add("mascot-heart");
        mascot.appendChild(heart);

        setTimeout(() => {
        heart.remove();
        }, 500);
    }

    faceTimer = setTimeout(() => {
        leftEye.textContent = "•";
        rightEye.textContent = "•";
        mascot.classList.remove("happy");
    }, 800);

    clickTimer = setTimeout(() => {
        clickCount = 0;
    }, 500);
});


function blink() {
    leftEye.textContent = "-"
    rightEye.textContent = "-"

    setTimeout(() => {
        leftEye.textContent = "•";
        rightEye.textContent = "•";
    }, 150);
};

function scheduleBlink() {
    const delay = 2000 + Math.random() *4000;
    setTimeout(() => {
        blink();
        scheduleBlink();
    }, delay);
}

scheduleBlink();
const board = document.getElementById("petalBoard");
const petalImage = "sakura.png"

const positions = [
    {x: 80, y:60, rotation: -20},
    {x: 450, y:180, rotation: -35},
    {x: 100, y:60, rotation: 20},
    {x: 220, y:100, rotation: 15},
    {x: 300, y:240, rotation: 70},
    {x: 200, y:350, rotation: 25},
];

positions.forEach((position) => {
    const petal = document.createElement("img");

    petal.src = petalImage;
    petal.className = "petal";

    petal.style.left =`${position.x}px`;
    petal.style.top =`${position.y}py`;
    petal.style.transform =`rotate(${position.rotation}deg)`;
    board.appendChild(petal);
})

let selectedPetal = null;
let offsetX = 0;
let offsetY = 0;

board.addEventListener("pointerdown", (event) =>{
    if (!event.target.classList.contains(".petal")) return;
    selectedPetal = event.target;
    const rect = selectedPetal.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
    selectedPetal.setPointerCapture(event.pointerId);
});

board.addEventListener("pointermove", (event) => {
    if(!selectedPetal) return;
    const boardRect = board.getBoundingClientRect();
    let x = event.clientX - rect.left; - offsetX;
    let y = event.clientY - rect.top; - offsetY;

    selectedPetal.style.left = `${x}px`;
    selectedPetal.style.top = `${y}px`;
});

board.addEventListener("pointerup", () => {
    selectedPetal = null;
})
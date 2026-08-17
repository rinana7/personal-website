const borad = document.getElementById("petalBoard");
const petalTemplate = borad.querySelector(".sakura");

const positions = [
    {x: 80, y:60, rotation: -20},
    {x: 450, y:180, rotation: -35},
    {x: 100, y:60, rotation: 20},
    {x: 220, y:100, rotation: 15},
    {x: 300, y:240, rotation: 70},
    {x: 200, y:350, rotation: 25},
];

positions.forEach((position, index) => {
    const petal = index === 0
        ? petalTemplate
        : petalTemplate.cloneNode(true);

    petal.style.left =`${position.x}px`;
    petal.style.top =`${position.y}py`;
    petal.style.transform =`rotate(${position.rotation}deg)`;

    petal.classList.add("draggable-petal");

    borad.appendChild(petal);
})

let selectedPetal = null;
let offsetX = 0;
let offsetY = 0;

borad.addEventListener("pointerdown", (event) =>{
    if (!event.target.classList.contains("draggable-petal")) return;
    selectedPetal = event.target;
    const rect = selectedPetal.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
    selectedPetal.setPointerCapture(event.pointerId);
});

borad.addEventListener("pointermove", (event) => {
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
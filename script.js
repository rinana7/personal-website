const board = document.getElementById("petalBoard");

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

    petal.src = "petal.png";
    petal.className = "petal";

    petal.style.left =`${position.x}px`;
    petal.style.top =`${position.y}py`;
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
})
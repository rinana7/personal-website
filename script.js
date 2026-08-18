const board = document.getElementById("petalBoard");
const homeimage = document.getElementById("homeImage");
const petalSwitch = document.getElementById("petalSwitch");
const imageSwitch = document.getElementById("imageSwitch");

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
});

imageSwitch.addEventListener("click", () => {
    board.style.display = "none";
    homeimage.style.display = "block";
});

petalSwitch.addEventListener("click", () => {
    homeimage.style.display = "none";
    board.style.display = "block";
});
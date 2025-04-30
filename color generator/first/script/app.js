let slider = document.querySelector(".swipper");

window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft") {
        slider.style.transform = "translateX(-1490px)";
        console.log("left");
    } else if (e.key === "ArrowRight") {
        slider.style.transform = "translateX(0)";
        console.log("right");
    }
});

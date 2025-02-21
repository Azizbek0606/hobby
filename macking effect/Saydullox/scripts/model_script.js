// let beeModel = document.getElementById("bee-model");
// let sections = Array.from(document.querySelectorAll(".section"));

// const shiftPosition = [550, -400 , 0 , 25];
// const cameraOrbits = [[90, 90] , [-45, 90], [-180, 0] , [45, 90]]
// const sectionOffsets = sections.map(section => section.offsetTop);
// const lastSectionIndex = sections.length - 1;

// const interpolate = (start, end , progress) => start + (end - start) * progress;

// const getScrollProgress = scrollY =>{
//     for (let i = 0; i < lastSectionIndex; i++) {
//         if (scrollY >= sectionOffsets[i] && scrollY <= sectionOffsets[i + 1]) {
//             return i + (scrollY - sectionOffsets[i]) / (sectionOffsets[i + 1] - sectionOffsets[i]);
//         }
//     }

//     return lastSectionIndex;
// }

// window.addEventListener("scroll", () => {
//     let scrollProgress = getScrollProgress(window.scrollY);
//     let sectionIndex = Math.floor(scrollProgress);
//     let sectionProgress = scrollProgress - sectionIndex;

//     const currentShift = interpolate(
//         shiftPosition[sectionIndex],
//         shiftPosition[sectionIndex + 1] ?? shiftPosition[sectionIndex],
//         sectionProgress
//     );

//     const currentOrbit = cameraOrbits[sectionIndex].map((val, i) =>
//         interpolate(val, cameraOrbits[sectionIndex + 1]?.[i]?? val, sectionProgress)
//     );


//     beeModel.style.transform = `translateX(${currentShift}px)`;
//     beeModel.setAttribute("camera-orbit", `${currentOrbit[0]}deg ${currentOrbit[1]} deg`);
// });


let beeModel = document.getElementById("bee-model");
let sections = Array.from(document.querySelectorAll(".section"));

const shiftPositionX = [550, -300, 0, 25];
const shiftPositionY = [100, -200, -50, 25];
const modelWidths = [300, 600, 300, 450];
const modelHeights = [300, 600, 300, 450];
const cameraOrbits = [[45, 100], [-45, 90], [-180, 0], [45, 90]];
const sectionOffsets = sections.map(section => section.offsetTop);
const lastSectionIndex = sections.length - 1;

const interpolate = (start, end, progress) => start + (end - start) * progress;

const getScrollProgress = scrollY => {
    for (let i = 0; i < lastSectionIndex; i++) {
        if (scrollY >= sectionOffsets[i] && scrollY <= sectionOffsets[i + 1]) {
            return i + (scrollY - sectionOffsets[i]) / (sectionOffsets[i + 1] - sectionOffsets[i]);
        }
    }
    return lastSectionIndex;
}

// Create a function to update the model position
const updateModelPosition = () => {
    let scrollProgress = getScrollProgress(window.scrollY);
    let sectionIndex = Math.floor(scrollProgress);
    let sectionProgress = scrollProgress - sectionIndex;

    // Calculate X position
    const currentShiftX = interpolate(
        shiftPositionX[sectionIndex],
        shiftPositionX[sectionIndex + 1] ?? shiftPositionX[sectionIndex],
        sectionProgress
    );

    // Calculate Y position
    const currentShiftY = interpolate(
        shiftPositionY[sectionIndex],
        shiftPositionY[sectionIndex + 1] ?? shiftPositionY[sectionIndex],
        sectionProgress
    );

    // Calculate width
    const currentWidth = interpolate(
        modelWidths[sectionIndex],
        modelWidths[sectionIndex + 1] ?? modelWidths[sectionIndex],
        sectionProgress
    );

    // Calculate height
    const currentHeight = interpolate(
        modelHeights[sectionIndex],
        modelHeights[sectionIndex + 1] ?? modelHeights[sectionIndex],
        sectionProgress
    );

    // Camera orbit calculation
    const currentOrbit = cameraOrbits[sectionIndex].map((val, i) =>
        interpolate(val, cameraOrbits[sectionIndex + 1]?.[i] ?? val, sectionProgress)
    );

    // Apply all transformations
    beeModel.style.transform = `translateX(${currentShiftX}px) translateY(${currentShiftY}px)`;
    beeModel.style.width = `${currentWidth}px`;
    beeModel.style.height = `${currentHeight}px`;
    beeModel.setAttribute("camera-orbit", `${currentOrbit[0]}deg ${currentOrbit[1]}deg`);
};

// Call the function immediately on page load
updateModelPosition();

// Add scroll event listener
window.addEventListener("scroll", updateModelPosition);
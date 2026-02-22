const slider = document.getElementById('slider-track');
let scrollAmount = 0;

function autoPlay() {
    const cardWidth = slider.querySelector('.mr-banking-cards').offsetWidth + 20; // width + gap
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (scrollAmount >= maxScroll) {
        scrollAmount = 0; // Reset to beginning
    } else {
        scrollAmount += cardWidth;
    }

    slider.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

// Run every 3 seconds
let slideTimer = setInterval(autoPlay, 3000);

// Optional: Stop sliding when user hovers over it
slider.addEventListener('mouseover', () => clearInterval(slideTimer));
slider.addEventListener('mouseout', () => slideTimer = setInterval(autoPlay, 3000));
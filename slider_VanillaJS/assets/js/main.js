function typeWriter(el) {
    const textoArray = Array.from(el.innerHTML);
    el.innerHTML = ''
    textoArray.forEach((letter, i) => {
        setTimeout(() =>  el.innerHTML += letter, delay * i)
    })
}


const tittle = document.querySelector('h1');
const delay = 75;

typeWriter(tittle)

// slider-carousel
const track = document.querySelector('.carousel_track')
const slides = Array.from(track.children)
const nextButton = document.querySelector('#right-triangle')
const prevButton = document.querySelector('#left-triangle')
const dotsNav = document.querySelector('.carousel_nav')
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;


// arrange the slides next to ono another
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);


const moveToSlide = (track, currentSlide, targetSlide) => {
    if (targetSlide === null) return;
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current_slide');
    targetSlide.classList.add('current_slide')
}

const selectTheDot = (currentDot, targetDot) => {
    if (targetDot === null) return;
    currentDot.classList.remove('current_slide');
    targetDot.classList.add('current_slide')
}

const hideShowArrows = (targetIndex, slides, prevButton, nextButton) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is_hidden');
        nextButton.classList.remove('is_hidden');
    } else if (targetIndex === (slides.length - 1)) {
        nextButton.classList.add('is_hidden');
        prevButton.classList.remove('is_hidden');
    } else {
        prevButton.classList.remove('is_hidden');
        nextButton.classList.remove('is_hidden');
    };
}

// when I click left, move slides to the left
prevButton.addEventListener('click', e => {
    const currentDot = dotsNav.querySelector('.current_slide')
    const prevDot = currentDot.previousElementSibling;
    const currentSlide = track.querySelector('.current_slide');
    const prevSlide = currentSlide.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide)

    // move to the previous slide
    moveToSlide(track, currentSlide, prevSlide);

    selectTheDot(currentDot, prevDot);

    hideShowArrows(prevIndex, slides, prevButton, nextButton);


})

// when I click right, move slides to the right
nextButton.addEventListener('click', e => {
    const currentDot = dotsNav.querySelector('.current_slide')
    const nextDot = currentDot.nextElementSibling;
    const currentSlide = track.querySelector('.current_slide');
    const nextSlide = currentSlide.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide)

    // move to the next slide
    moveToSlide(track, currentSlide, nextSlide);

    selectTheDot(currentDot, nextDot);

    hideShowArrows(nextIndex, slides, prevButton, nextButton);



})

// when I click the nav indicators, move to that slides
dotsNav.addEventListener('click', e => {
    // what indicator was clicked on ?
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current_slide')
    const currentDot = dotsNav.querySelector('.current_slide')
    const targetIndex = dots.findIndex(dot => dot === targetDot)
    const targetSlide = slides[targetIndex]

    moveToSlide(track, currentSlide, targetSlide);

    selectTheDot(currentDot, targetDot);

    hideShowArrows(targetIndex, slides, prevButton, nextButton);
});
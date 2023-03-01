// Our customers speak
const userCarousel = document.querySelector('.user-carousel');
userCarousel.addEventListener('click', e => {
    // showing name and bg
    const targetImg = e.target.closest('img');
    if(!targetImg) return;
    const targetUser = targetImg.parentElement;
    const currentUser = userCarousel.querySelector('.user-active');
    if(targetUser !== currentUser) {
      targetUser.classList.add('user-active');
      currentUser.classList.remove('user-active');
    }

    // changing text
    const paragraphs = Array.from(document.querySelectorAll('blockquote > p'));
    const currentParagraph = document.querySelector('.active-quote');
    const usersArray = Array.from(userCarousel.children);
    const targetIndex = usersArray.findIndex(user => user === targetUser);
    currentParagraph.classList.remove('active-quote');
    paragraphs[targetIndex].classList.add('active-quote');
});


// Accordion
const accordionItemHeaders = document.querySelectorAll('.accordion-item-header');
accordionItemHeaders.forEach(accordionItemHeader => {
  accordionItemHeader.addEventListener('click', (e) => {
    // keep only one list open
    const currentlyActiveAccordionItemHeader = document.querySelector('.accordion-item-header.accordion-active');
    if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader !== accordionItemHeader) {
      currentlyActiveAccordionItemHeader.classList.remove('accordion-active');
      currentlyActiveAccordionItemHeader.children[1].classList.remove('rotate');
      currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
    }

    // rotate arrow
    accordionItemHeader.classList.toggle('accordion-active');
    accordionItemHeader.children[1].classList.toggle('rotate');

    // open/close list
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if(accordionItemHeader.classList.contains('accordion-active')) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 'px';
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});



// Bottom carousel
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const dotsNav = document.querySelector('.slider-buttons');
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;

// setting a default slides position
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

// moving slides
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

dotsNav.addEventListener('click', e => {
  // define target
  const targetDot = e.target.closest('button');

  if(!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');

  const currentDot = dotsNav.querySelector('.btn-circle-active');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);

  currentDot.classList.remove('btn-circle-active');
  targetDot.classList.add('btn-circle-active');
});

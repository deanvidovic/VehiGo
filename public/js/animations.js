"use strict";
/*ANIMATIONS*/
const sections = document.querySelectorAll(".section");
const header = document.querySelector(".hero");
const headerHeight = header.getBoundingClientRect().height;

/*Section revel*/
const sectionRevel = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionAnimate = new IntersectionObserver(sectionRevel, {
  root: null,
  threshold: 0.15,
});

sections.forEach((section) => {
  section.classList.add("section--hidden");
  sectionAnimate.observe(section);
});

/*Header fixed*/

const headerFix = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) header.classList.add("sticky--header");
  else header.classList.remove("sticky--header");
};

const headerFixed = new IntersectionObserver(headerFix, {
  root: null,
  threshold: 0,
  rootMargin: `${headerHeight * -1}px`,
});

headerFixed.observe(sections[0]);

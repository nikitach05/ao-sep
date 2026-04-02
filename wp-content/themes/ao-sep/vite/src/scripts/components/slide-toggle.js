export function slideUp(el, duration = 300, displayDefault = 'block') {
  el.style.transitionProperty = 'height, margin, padding';
  el.style.transitionDuration = duration + 'ms';
  el.style.boxSizing = 'border-box';
  el.style.height = el.offsetHeight + 'px';
  el.offsetHeight; // force reflow
  el.style.overflow = 'hidden';
  el.style.height = 0;
  el.style.paddingTop = 0;
  el.style.paddingBottom = 0;
  el.style.marginTop = 0;
  el.style.marginBottom = 0;
  window.setTimeout(function() {
    el.style.display = 'none';
    el.style.removeProperty('height');
    el.style.removeProperty('padding-top');
    el.style.removeProperty('padding-bottom');
    el.style.removeProperty('margin-top');
    el.style.removeProperty('margin-bottom');
    el.style.removeProperty('overflow');
    el.style.removeProperty('transition-duration');
    el.style.removeProperty('transition-property');
    el.classList.remove('slide');
  }, duration);
}

export function slideDown(el, duration = 300, displayDefault = 'block') {
  el.style.removeProperty('display');
  let display = window.getComputedStyle(el).display;
  if (display === 'none')
    display = displayDefault;
  el.style.display = display;
  let height = el.offsetHeight;
  el.style.overflow = 'hidden';
  el.style.height = 0;
  el.style.paddingTop = 0;
  el.style.paddingBottom = 0;
  el.style.marginTop = 0;
  el.style.marginBottom = 0;
  el.offsetHeight; // force reflow
  el.style.boxSizing = 'border-box';
  el.style.transitionProperty = "height, margin, padding";
  el.style.transitionDuration = duration + 'ms';
  el.style.height = height + 'px';
  el.style.removeProperty('padding-top');
  el.style.removeProperty('padding-bottom');
  el.style.removeProperty('margin-top');
  el.style.removeProperty('margin-bottom');
  window.setTimeout(function() {
    el.style.removeProperty('height');
    el.style.removeProperty('overflow');
    el.style.removeProperty('transition-duration');
    el.style.removeProperty('transition-property');
    el.classList.remove('slide');
  }, duration);
}

export function slideToggle(el, duration = 300, displayDefault = 'block') {
  if (window.getComputedStyle(el).display === 'none') {
    slideDown(el, duration, displayDefault);
  } else {
    slideUp(el, duration, displayDefault);
  }
}
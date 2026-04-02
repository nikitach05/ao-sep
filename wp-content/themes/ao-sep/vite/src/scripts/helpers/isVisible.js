export default function isVisible(target, offset) {
  if (!offset) {
    offset = 0;
  }
  let targetPosition = target.getBoundingClientRect();
  let windowHeight = window.innerHeight;
  if ((targetPosition.top - offset) < windowHeight && targetPosition.bottom >= 0) {
    return true;
  } else {
    return false;
  }
}
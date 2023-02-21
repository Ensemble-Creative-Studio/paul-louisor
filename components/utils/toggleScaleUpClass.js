export function toggleScaleUpClass(element) {
  if (element && element.classList.contains("galleryImage")) {
    const isLastItem = !element.nextElementSibling;

    const isScaleUp = element.classList.contains("scaleUpGallery");
    const hideScrollbar = element.querySelector('.hideScrollBar');
    const text =  element.querySelector('.title ');
    const next = document.querySelector('.nextPage')
    if (hideScrollbar.classList.contains('passive')) {
      hideScrollbar.classList.toggle("scaleUpGallery");
      text.classList.toggle("translatedText");
      next.classList.add('translatedTop')
    }

    if (isLastItem) {
      const blockElement = document.querySelector(".lastSpacing");
      if (blockElement) {
        // blockElement.classList.remove("h-0");
        blockElement.classList.add("h-40");
      }
    } else {
      const blockElement = document.querySelector(".lastSpacing");

      if (blockElement) {
        blockElement.classList.remove("h-40");
        // blockElement.classList.add("h-0");
      }
    }
    const end = document.body.scrollHeight + 200;
    setTimeout(() => {
      const rect = element.getBoundingClientRect();
      const bgWhite = document.querySelector('.galleryContainer');
      if (element.nextElementSibling) {
        const top =
          rect.top +
          bgWhite.scrollTop -
          8 * parseFloat(getComputedStyle(document.documentElement).fontSize);
        bgWhite.scrollTo({
          top,
          behavior: 'smooth',
          easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
          duration: 500,
        });
      } else {
        const top =
          rect.top +
          bgWhite.scrollTop -
          8 * parseFloat(getComputedStyle(document.documentElement).fontSize);
        bgWhite.scrollTo({
          top,
          behavior: 'smooth',
          easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
          duration: 500,
        });
      }
    }, 600);
  }
}

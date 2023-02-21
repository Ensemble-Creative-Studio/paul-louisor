export function revealSkew(element) {
    // Get all the galleryImage elements
    const galleryImages = document.querySelectorAll('.galleryImage');
  
    const bgWhite = document.querySelector('.galleryContainer');
  
    // Create a function that checks if an element is in view within an offset
    function isElementInView(el, offset) {
      const bounding = el.getBoundingClientRect();
      const top = bounding.top;
      const bottom = bounding.bottom - el.offsetHeight * offset;
  
      return (
        top < window.innerHeight &&
        bottom > 0
      );
    }
  
    // Create a function that adds the animReveal class to the galleryImage element
    function revealGalleryImage(el) {
        if (!el.hasAttribute('data-revealed')) {
          el.classList.add('animReveal', 'opacity-0', 'opacity-1');
          el.setAttribute('data-revealed', 'true');
      
          setTimeout(() => {
            el.classList.remove('animReveal', 'opacity-0');
          }, 1300);
        }
      }
      
  
    // Create a function that handles the scroll event and reveals the galleryImage elements
    function handleScroll() {
      // Loop through the galleryImage elements
      galleryImages.forEach((el, index) => {
        // Only add the animReveal class for the third element and onwards
        if (index >= 2) {
          // Check if the element is in view within an offset
          if (isElementInView(el, 0.2)) {
            revealGalleryImage(el);
          }
        }
      });
    }
  
    // Add a scroll event listener to the container that calls the handleScroll function
    bgWhite.addEventListener('scroll', handleScroll);
  }
  
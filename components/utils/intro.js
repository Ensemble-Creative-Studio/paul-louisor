import { delay } from 'framer-motion';
import { gsap } from 'gsap';

export const animateSiteTitle = () => {
  // Select the .siteTitle element
  const siteTitle = document.querySelector('.siteTitle');
const menuTitle = document.querySelector('.menuTitle');
const contactButton = document.querySelector('.contactButton');
const imageHeaderCol = document.querySelector('.gallery-header');
const imageHeaderColMobile = document.querySelector('.gallery-header-mobile');
  // Create the animation
  if (window.innerWidth > 798) {
    gsap.fromTo(siteTitle, {
      opacity: 0
    }, {
      opacity :1,
      duration: 0.1,
      delay: 0.1,

    });
  gsap.fromTo(siteTitle, {
    scale: 3
  }, {
    scale: 1.0,
    duration: 1.35,
    delay: 0.4,
    ease:'Power4.easeInOut',
  });
  gsap.fromTo(menuTitle, {
    x: 100,
    opacity: 0,
  }, {
    x: 0,
    autoAlpha: 1,
    duration: 0.8,
    delay: 0.8,
    ease:'Power4.easeInOut',
  });
  gsap.fromTo(contactButton, {
    x: 100,
    autoAlpha: 0,
  }, {
    x: 0,
    autoAlpha: 1,
    duration: 0.8,
    delay: 0.8,
    ease:'Power4.easeInOut',
  });
  gsap.fromTo(imageHeaderCol, {
    y: 100,
    autoAlpha: 0,
  }, {
    y: 0,
    autoAlpha: 1,
    duration: 0.8,
    delay: 0.8,
    ease:'Power4.easeInOut',
  });
  
}

else{
    gsap.fromTo(siteTitle, {
        scale: 1.6,
        x:17,
      }, {
        scale: 1.0,
        x:0,
        duration: 1.35,
        delay: 0.4,
        ease:'Power4.easeInOut',
      });
      gsap.fromTo(menuTitle, {
        scale: 1.6,
        y:-20,
        x: 20,
    }, {
      scale: 1.0,
      y:0,
      x: 0,
      duration: 1.35,
      delay: 0.4,
      ease:'Power4.easeInOut',
    });
      gsap.fromTo(contactButton, {
        scale: 1.6,
        y:30,
        x: 20,
    }, {
      scale: 1.0,
      y:0,
      x: 0,
      duration: 1.35,
      delay: 0.4,
      ease:'Power4.easeInOut',
    });
    gsap.fromTo(imageHeaderCol, {
        y: 100,
        autoAlpha: 0,
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        delay: 0.8,
        ease:'Power4.easeInOut',
      });
}
}



export const shouldAnimateSiteTitle = () => {
    if (typeof window === 'undefined') {
      // If running on the server, always return true
      return true;
    }
    const hasAnimated = sessionStorage.getItem('hasAnimatedSiteTitle');
    return !hasAnimated;
  };
  
  export const markSiteTitleAsAnimated = () => {
    sessionStorage.setItem('hasAnimatedSiteTitle', 'true');
  };
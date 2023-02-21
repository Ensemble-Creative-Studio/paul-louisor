import Image from "next/image";
import urlFor from "@/lib/urlFor";
import {toggleScaleUpClass} from './utils/toggleScaleUpClass';
import {drag} from './utils/drag';
import {revealSkew} from './utils/revealSkew';
import { useEffect } from 'react';

import Link from "next/link";
interface Slide {
  images: any;
  _key: string;
  _ref: string;
  title: string;
}

interface Serie {
  pageName: any;
  date: any;
  _id: string;
  title: string;
  images: {
    asset: any;
    ImageMobile: {
      asset: {
        _ref: string;
      };
    };
  }[];
}

interface ImageGalleryProps {
  slides: Slide[];
  series: Serie[];
}



const ImageGallery = ({ slides, series }: ImageGalleryProps) => {

  useEffect(() => {
    revealSkew();
  }, );
  const Drag = () => {
    drag()
  };

  let timeoutId: NodeJS.Timeout | undefined  = undefined ;
  let shouldExecuteCode = true;
  
  const handleImageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const galleryImage = event.currentTarget;
    const galleryImages = document.querySelectorAll('.galleryImage');
  
    // Set the flag to true to indicate that the code should execute
    shouldExecuteCode = true;
  
    // Set a timeout of 300ms
    timeoutId = setTimeout(() => {
      // Check if the flag is still true before executing the code
      if (shouldExecuteCode) {
        galleryImages.forEach((galleryImage) => {
          const hideScrollbar = galleryImage.querySelector('.hideScrollBar');
          const text =  galleryImage.querySelector('.title');
          hideScrollbar?.classList.remove('scaleUpGallery');
          text?.classList.remove('translatedText')
          galleryImage.classList.remove('translated');
        });
  
        const hideScrollbar = galleryImage.querySelector('.hideScrollBar');
        console.log(hideScrollbar)
        let nextSibling = galleryImage.nextElementSibling;
        while (nextSibling && nextSibling.classList.contains('galleryImage')) {
          nextSibling.classList.add('translated');
          nextSibling = nextSibling.nextElementSibling;
        }
  
        toggleScaleUpClass(galleryImage);
  
        event.stopPropagation();
      }
    }, 100);
  
    // Add event listeners to detect when the mouse is released or moved
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
  
    event.preventDefault();
  };
  
  const handleMouseUp = () => {
    // Clear the timeout and remove the event listeners
    clearTimeout(timeoutId);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
  
    // Set the flag to false to indicate that the code should not execute
    shouldExecuteCode = false;
  };
  
  const handleMouseMove = () => {
    // If the mouse moves, clear the timeout and remove the event listeners
    clearTimeout(timeoutId);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
  
    // Set the flag to false to indicate that the code should not execute
    shouldExecuteCode = false;
  };
  
  

  return (
    <div className="   md:pt-72 grid pt-40">

      {slides.map((slide, indexSlide) => {
        const matchingSerie = series.find((serie) => serie._id === slide._ref);
        if (matchingSerie) {
          return (
<div className={`customRowspan galleryImage animatedScale relative grid transitionScaleUp z-10 gridAutoRows galleryOrigin ${indexSlide > 1 ? 'opacity-0' : ''}`} onMouseEnter={Drag} onClick={event => { handleImageClick(event) }} key={indexSlide}>
              <div className="customRowspanSmall transitionScaleUp " key={indexSlide}>
                <div className="md:pb-6 flex cursor-grab flex-nowrap h-full overflow-x-auto gap-2 hideScrollBar pb-4 galleryOrigin transitionScaleUp imageContainer passive ">
                  {matchingSerie.images.map((image, index) => {
                    return (
              
                      <Image
                        key={index}
                        className={`flex-shrink-0 w-auto h-full pointer-events-none ${
                          index === 0 ? "md:DesktopPaddingleft pl-8" : ""
                        }`}
                        src={urlFor(image.asset).url()}
                        width={1800}
                        height={1200}
                        priority = {
                          indexSlide === 0 || indexSlide === 1 ? true : false
                        }
                        alt="menu item image"
                      />
               
                    );
                  })}
                </div>
                <div className="md:flex md:pl-0 md:DesktopPaddingleft pl-8 title transitionScaleUp titleOrigin">
                  <h4 className="fontSize">{matchingSerie.title}</h4>
                  <h4 className=" md:pl-4 fontSize">{matchingSerie.date}</h4>
                </div>
              </div>
              <div className="spaccer row-span-2"></div>
            </div>
          );
        } 
        else{
          <div></div>
        }
      })}

    </div>
  );
};

export default ImageGallery;

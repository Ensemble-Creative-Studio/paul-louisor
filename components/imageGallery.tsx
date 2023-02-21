import Image from "next/image";
import urlFor from "@/lib/urlFor";
import {toggleScaleUpClass} from './utils/toggleScaleUpClass';
import {drag} from './utils/drag';
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


  const Drag = () => {
    drag()
  };

  const handleImageClick = (event: React.MouseEvent<HTMLDivElement>) => {

    const galleryImage = event.currentTarget;
    const galleryImages = document.querySelectorAll('.galleryImage');


    galleryImages.forEach((galleryImage) => {
      const hideScrollbar = galleryImage.querySelector('.hideScrollBar');
const text =  galleryImage.querySelector('.title');
        hideScrollbar?.classList.remove('scaleUpGallery');
        text?.classList.remove('translatedText')
        galleryImage.classList.remove('translated');
      });
      const hideScrollbar = galleryImage.querySelector('.hideScrollBar');
      let nextSibling = galleryImage.nextElementSibling;
      // if(hideScrollbar?.classList.contains('scaleUpGallery')){
        while (nextSibling && nextSibling.classList.contains('galleryImage')) {
          nextSibling.classList.add('translated');
          nextSibling = nextSibling.nextElementSibling;
        }
      
      // }

 
    

    
      toggleScaleUpClass(galleryImage);

      event.stopPropagation();
    
  };

  return (
    <div className="   md:pt-72 grid pt-40">

      {slides.map((slide, indexSlide) => {
        const matchingSerie = series.find((serie) => serie._id === slide._ref);
        if (matchingSerie) {
          return (
            <div className="customRowspan galleryImage animatedScale grid  transitionScaleUp z-10 gridAutoRows galleryOrigin"          onMouseEnter={Drag} onClick={(event) => {  handleImageClick(event);
            }}  key={indexSlide}>
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
                          indexSlide === 0 ? true : false
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

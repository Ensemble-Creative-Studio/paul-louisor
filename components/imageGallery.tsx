import Image from "next/image";
import urlFor from "@/lib/urlFor";
import { toggleScaleUpClass } from "./utils/toggleScaleUpClass";
import { drag } from "./utils/drag";
import { revealSkew } from "./utils/revealSkew";
import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

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
    // AOS.init();
    
    const galleryImages2 = document.querySelectorAll(".galleryImage.new");

    galleryImages2.forEach((el, index) => {
      // Only add the animReveal class for the third element and onwards
      if (index >= 2) {
        el.classList.add("cool", "top-24");
        // Check if the element is in view within an offset
    
      }
    });
  
  } );
  const Drag = () => {
    drag();
  };

  const [isMaxRow, setIsMaxRow] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(-1);

  const handleMaxRowToggle = (event: any, index: any) => {
    // Check if clicked element has class 'passive'
    let drag = false;

    document.addEventListener("mousedown", () => (drag = false));
    document.addEventListener("mouseup", () => (drag = true));
    document.addEventListener("mousemove", () => (drag = true));

    if (event.target.classList.contains("passive")) {
      if (clickedIndex === index && drag === false) {
        setIsMaxRow(!isMaxRow);
      } else {
        setClickedIndex(index);
        setIsMaxRow(true);
      }
      setTimeout(() => {
        const rect = event.target.getBoundingClientRect();
        const bgWhite = document.querySelector(
          ".galleryContainer"
        ) as HTMLElement;
        if (event.target.nextElementSibling) {
          const top = bgWhite.scrollTop + rect.top - window.innerHeight * 0.105;
          bgWhite.scrollTo({
            top,
            behavior: "smooth",
            
          });
        }
      }, 500);
    }
  };

  return (
    <div className="   md:pt-72 grid pt-40 ">
      {slides.map((slide, indexSlide) => {
        const matchingSerie = series.find((serie) => serie._id === slide._ref);
        if (matchingSerie) {
          return (
            <div
              className={`customRowspan galleryImage new animatedScale relative grid transitionScaleUp z-10 ${
                clickedIndex === indexSlide && isMaxRow ? "max-row" : "min-row"
              } galleryOrigin`}
              onMouseEnter={Drag}
              onClick={(event) => handleMaxRowToggle(event, indexSlide)}
              key={indexSlide}
            >
              {" "}
              <div
                className="customRowspanSmall transitionScaleUp "
                key={indexSlide}
              >
                <div className="md:pb-6 flex cursor-grab flex-nowrap h-full overflow-x-auto gap-2 hideScrollBar pb-4 galleryOrigin transitionScaleUp imageContainer passive ">
                  {matchingSerie.images.map((image, index) => {
                    return (
                      <Image
                        key={index}
                        className={`flex-shrink-0 w-auto h-full pointer-events-none ${
                          index === 0 ? "md:DesktopPaddingleft pl-8" : ""
                        }`}
                        src={urlFor(image.asset).url()}
                        width={1200}
                        height={1800}
                        quality={85}
                     priority= {true}
                        alt="gallery image"
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
        } else {
          <div></div>;
        }
      })}
    </div>
  );
};

export default ImageGallery;

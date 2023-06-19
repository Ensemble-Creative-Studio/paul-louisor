import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import urlFor from "@/lib/urlFor";
import { toggleScaleUpClass } from "./utils/toggleScaleUpClass";
import { drag } from "./utils/drag";
import { revealSkew } from "./utils/revealSkew";
import chevron from '../public/chevron.svg'
import "aos/dist/aos.css";
import AOS from "aos";
import $ from "jquery";
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
  const [displayedSlides, setDisplayedSlides] = useState(3);
  const galleryContainerRef = useRef(null);
  const loadMoreRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => { 
    AOS.init();
    

   }, []);
  useEffect(() => {
  

    const bgWhite = document.querySelector(
      ".galleryContainer.new"
    ) as HTMLElement;

    const handleScroll = () => {
      AOS.refresh();
    };

    bgWhite.addEventListener("scroll", handleScroll);

    setTimeout(() => {
      const galleryImages = document.querySelectorAll(".imageContainer");

      let dragging = false;

      $(".galleryImage").on("mousedown", "img", function () {
        dragging = false;
      });

      $(".galleryImage").on("mousemove", "img", function () {
        dragging = true;
      });

      $(".galleryImage").off("mouseup", "img").on("mouseup", "img", function (event) {
        if (!dragging) {
          // Only run the code if the user is not dragging the container
          const container = $(this).parent(".imageContainer");
          const galleryImage = container.parents(".galleryImage");
          const isMaxRow = galleryImage.hasClass("max-row");
          if (isMaxRow) {
            setTimeout(() => {
              galleryImage.toggleClass("max-row");
            }, 600);
            setTimeout(() => {
              const imagePos = $(this).position();
              if (!container) {
                return; // exit the function if container is undefined
              }
              const containerPos = container[0].offsetLeft;
              const imageLeft =
                isMaxRow ? 0 : imagePos.left - containerPos + container[0].scrollLeft;
              container.animate(
                {
                  scrollLeft: imageLeft,
                },
                "slow"
              );
            }, 0);
          } else {
            galleryImage.toggleClass("max-row");
            setTimeout(() => {
              const imagePos = $(this).position();
              if (!container) {
                return; // exit the function if container is undefined
              }
              const containerPos = container[0].offsetLeft;
              const imageLeft =
                isMaxRow ? 0 : imagePos.left - containerPos + container[0].scrollLeft;
              container.animate(
                {
                  scrollLeft: imageLeft,
                },
                "slow"
              );
      
              const rect = event.target.getBoundingClientRect();
              const bgWhite = document.querySelector(
                ".galleryContainer"
              ) as HTMLElement;
              if (event.target.nextElementSibling) {
                const top =
                  bgWhite.scrollTop + rect.top - window.innerHeight * 0.105;
                bgWhite.scrollTo({
                  top,
                  behavior: "smooth",
                });
              }
            }, 600);
          }
        }
      });
      

      return () => {
        bgWhite.removeEventListener("scroll", handleScroll);
        galleryImages.forEach((imageContainer) => {
          const images = imageContainer.querySelectorAll("img");
          images.forEach((image, index) => {
            image.removeEventListener("click", () => {});
          });
        });
      };
    }, 500);
  }
  
  
  
  , [displayedSlides]);

  const Drag = () => {
    drag();
  };

  const [isMaxRow, setIsMaxRow] = useState<boolean[]>([]);
  const [clickedIndex, setClickedIndex] = useState(-1);

  const handleMaxRowToggle = (event: any, index: any) => {
    const newIsMaxRow = [...isMaxRow];
    let drag = false;

    document.addEventListener("mousedown", () => (drag = false));
    document.addEventListener("mouseup", () => (drag = true));
    document.addEventListener("mousemove", () => (drag = true));

    if (event.target.classList.contains("passive")) {
      if (clickedIndex === index && drag === false) {
        newIsMaxRow[index] = !newIsMaxRow[index];
      } else {
        setClickedIndex(index);
        newIsMaxRow[index] = true;
      }
      setIsMaxRow(newIsMaxRow);
      setTimeout(() => {
        const rect = event.target.getBoundingClientRect();
        const bgWhite = document.querySelector(".galleryContainer") as HTMLElement;
        if (event.target.nextElementSibling) {
          const top = bgWhite.scrollTop + rect.top - window.innerHeight * 0.105;
          bgWhite.scrollTo({
            top,
            behavior: "smooth",
          });
        }
      }, 700);
    }
  };

  const handleLoadMore = () => {
    setDisplayedSlides(displayedSlides + 3);
    // const container = galleryContainerRef.current;
    // if (container) {
    //   container.scrollTop = container.scrollHeight; // Scroll to the bottom after loading more slides
    // }
  };

  useEffect(() => {
    const initialIsMaxRow = Array(displayedSlides).fill(false);
    setIsMaxRow(initialIsMaxRow);
  }, [displayedSlides]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const first = entries[0];
        if (first.isIntersecting) {
          // Visible, load more
          setTimeout(() => {
            handleLoadMore();
          }, 500);
        }
      },
      { threshold: 1.0 } // Trigger when the button is fully visible
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [displayedSlides]); // Rerun when displayedSlides changes

  

  return (
    <div className="md:pt-72 grid pt-40">
      <div className="galleryContainer new" ref={galleryContainerRef}>
        {slides?.slice(0, displayedSlides).map((slide, indexSlide) => {
          const matchingSerie = series.find((serie) => serie._id === slide._ref);
          if (matchingSerie) {
            return (
              <div
                className={`customRowspan  galleryImage new animatedScale relative grid transitionScaleUp z-10 ${
                  clickedIndex === indexSlide && isMaxRow[indexSlide] ? "max-row" : "min-row"
                } galleryOrigin`}
                onMouseEnter={Drag}
                onClick={(event) => handleMaxRowToggle(event, indexSlide)}
                key={indexSlide}
              >
                <div
                  data-aos="scaleY"
                  data-aos-id="super-duper"
                  data-aos-once="true"
                  className="customRowspanSmall transitionScaleUp "
                  key={indexSlide}
                >
                  <div className="md:pb-6 flex cursor-grab flex-nowrap h-full overflow-x-auto gap-2 hideScrollBar pb-4 galleryOrigin transitionScaleUp imageContainer passive ">
                    {matchingSerie.images.map((image, index) => {
                      return (
                        <Image
                          key={index}
                          className={`flex-shrink-0 w-auto h-full  ${
                            index === 0 ? "md:DesktopPaddingleft pl-8" : ""
                          }`}
                          src={urlFor(image.asset).url()}
                          width={1200}
                          height={1800}
                          quality={85}
                          priority={true}
                          draggable={false}
                          alt="gallery image"
                        />
                      );
                    })}
                  </div>
                  <div className="md:flex md:pl-0 md:DesktopPaddingleft pl-8 title transitionScaleUp titleOrigin">
                    <h4 className="fontSize">{matchingSerie.title}</h4>
                    <h4 className="md:pl-4 fontSize">{matchingSerie.date}</h4>
                  </div>
                </div>
                <div className="spaccer row-span-2"></div>
              </div>
            );
          } else {
            return <div key={indexSlide}></div>;
          }
        })}
      </div>
      {displayedSlides < slides.length && (
  <button ref={loadMoreRef} className="loadMoreButton p-40">
  <div className="flex flex-col justify-center">
    <div className="flex flex-col items-center">
      <div>Load More</div>
      <Image src="/chevron.svg" alt="me" width="12" height="12" />
    </div>
  </div>
</button>

      )}
    </div>
  );
};

export default ImageGallery;

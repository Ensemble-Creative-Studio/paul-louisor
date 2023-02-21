export const hoverImage = () => {
  const menuItems = document.querySelectorAll("nav ul li");
  const galleryHeader = document.querySelector(".gallery-header");

  if (galleryHeader) {
    const galleryImages = galleryHeader.querySelectorAll('div');
    menuItems.forEach((menuItem, index) => {
      menuItem.addEventListener("mouseover", () => {
        if (index === 0 ) {
            galleryHeader.children[1].classList.add("invisiblePhoto");
          galleryHeader.children[0].classList.add("invisiblePhoto");
        } else if (index === 1 ) {
       
          galleryHeader.children[0].classList.add("invisiblePhoto");
          galleryHeader.children[2].classList.add("invisiblePhoto");
        }
        else{
          galleryHeader.children[1].classList.add("invisiblePhoto");
          galleryHeader.children[2].classList.add("invisiblePhoto");
        }
        menuItems.forEach((item, i) => {
          if (i !== index) {
            item.classList.add('invisiblePhoto');
          }
        });
      });

      

      menuItem.addEventListener('mouseout', () => {
        galleryHeader.children[0].classList.remove('invisiblePhoto');
        galleryHeader.children[1].classList.remove('invisiblePhoto');
        galleryHeader.children[2].classList.remove('invisiblePhoto');
  
        menuItems.forEach((item, i) => {
          if (i !== index) {
            item.classList.remove('invisiblePhoto');
          }
        });
      });
    });

    galleryImages.forEach((image, index) => {
      image.addEventListener('mouseover', () => {
     
       
            if (index === 0) {
              menuItems[1].classList.add('invisiblePhoto');
              menuItems[2].classList.add('invisiblePhoto');
              galleryImages[1].classList.add('invisiblePhoto');
              galleryImages[2].classList.add('invisiblePhoto');
            }
            else if (index === 1) {
              menuItems[0].classList.add('invisiblePhoto');
              menuItems[2].classList.add('invisiblePhoto');
              galleryImages[0].classList.add('invisiblePhoto');
              galleryImages[2].classList.add('invisiblePhoto');
            }
            else if (index === 2) {
              menuItems[0].classList.add('invisiblePhoto');
              menuItems[1].classList.add('invisiblePhoto');
              galleryImages[1].classList.add('invisiblePhoto');
              galleryImages[0].classList.add('invisiblePhoto');
            }
     

      });
  
      image.addEventListener('mouseout', () => {
        menuItems.forEach((item, i) => {
          item.classList.remove('invisiblePhoto');
        });
  
        galleryImages.forEach((img, i) => {
          if (i !== index) {
            img.classList.remove('invisiblePhoto');
          }
        });
      });
    });
  }
}
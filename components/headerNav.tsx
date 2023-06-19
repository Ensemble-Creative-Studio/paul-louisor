import Link from "next/link";
import { handleHeaderToggle } from "./utils/contactAnim";
import { useRouter } from "next/router";
import { useEffect } from 'react';
import {hoverImage} from './utils/hover';
interface HeaderProps {
  title: string;
  navigation: string[];
}

export default function HeaderNav({ header, menu }: { header: any; menu: any }) {
  // useEffect(() => {
  //   hoverImage();
  // }, []);
  const router = useRouter();
  const handleContactClick = () => {
    if (window.innerWidth < 765) {
      handleHeaderToggle();
    }
  };
  const handleContactHover = () => {
    const contactInfoElements = document.querySelectorAll('.contactInfo');
    contactInfoElements.forEach((element) => {
      element.classList.add('slidingLeft');
    });
  };

  return (


   
        <nav className="md:pt-6 md:w-screen fontSize    z-20 md:grid md:grid-cols-12 md:gap-4 md:px-4  block pt-60  pl-8">
          <ul className="col-start-4 menuTitle galleryOrigin relative">
            {menu.map((item: any, index: any) => (
              <li className="" key={index}>
                <Link scroll={false} href={item.pageName.toLowerCase()}>{item.pageName}</Link>{" "}
              </li>
            ))}
           
          </ul>
          <div  className=" contactButton galleryOrigin  list-none col-start-6 relative ">
          <li
              className="  list-none "
              onClick={handleContactClick}
              onMouseEnter={handleContactHover}
            >
              Contact
            </li>
          </div>
       

            <div className="col-start-8 contactInfo col-end-10 leading-9 md:block hidden md:minusTop">
        {header &&
          header.Contact.map((item: any) => {
            if (item._type === "block") {
              const text = item.children
                .filter((child: any) => child._type === "span")
                .map((child: any) => child.text)
                .join(" ");
              const links = item.markDefs
                .filter((mark: any) => mark._type === "link")
                .map((mark: any) => mark.href);
  
              return (
                <div key={item._key} className =''>
                  {links.length > 0 ? (
                    <a
                      key={links[0]}
                      href={links[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {text}
                    </a>
                  ) : (
                    <p>{text}</p>
                  )}
                </div>
              );
            }
          })}
        {(!header || header.length === 0) && <p>No contact information available.</p>}
        </div>
            <div className="col-start-11 contactInfo col-end-13 md:block hidden">
            {header &&
          header.SiteBy.map((item: any) => {
            if (item._type === "block") {
              const text = item.children
                .filter((child: any) => child._type === "span")
                .map((child: any) => child.text)
                .join(" ");
              const links = item.markDefs
                .filter((mark: any) => mark._type === "link")
                .map((mark: any) => mark.href);
  
              return (
                <div className="opacity-50" key={item._key}>
                  {links.length > 0 ? (
                    <a
                      key={links[0]}
                      href={links[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {text}
                    </a>
                  ) : (
                    <p>{text}</p>
                  )}
                </div>
              );
            }
          })}
        {(!header || header.length === 0) && <p>No contact information available.</p>}
            </div>
        </nav>


  );
}

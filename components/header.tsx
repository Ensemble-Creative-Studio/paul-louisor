import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/router";
interface HeaderProps {
  title: string;
  navigation: string[];
}

export default function Header({

}: {

}) {
  const router = useRouter();

  const headerClassName = router.pathname === "/" ? " scaleUp" : " ";

  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = () => {
    console.log('hover')
    if (router.pathname !== "/") {
      linkRef.current?.click();
    }
  };
  return (
    <div>
        

    <header
      className={`z-20 md:DesktopPaddingleft md:grid-cols-12 md:gap-4 md:px-4   headerMobileCol   fixed top-0 left-0 transitionEasing flex flex-col pl-8 pt-6 h-24 customOrigin ${headerClassName}`}
    >
      <div className="md:col-start-2 md:col-end-4 siteTitle galleryOrigin ">
      <Link         onMouseEnter={handleMouseEnter} scroll={false} href='/' ref={linkRef}>
        <h1 className="fontSize">Paul Louisor</h1>
        <h2 className="fontSize h-full ">Casting Director</h2>
        </Link>
      </div>
      
    </header>

    </div>
  );
}

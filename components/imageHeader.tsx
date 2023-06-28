import Link from "next/link";
import Image from "next/image";
import urlFor from "@/lib/urlFor";
import { useRouter } from "next/router";
import { Key } from "react";
interface HeaderProps {
  title: string;
  navigation: string[];
}

export default function ImageHeader({ header }: { header: any }) {
  // const mobileImageUrls = menu
  //   .filter((item: any) => item.ImageMobile && item.ImageMobile.asset)
  //   .map((item: any) => urlFor(item.ImageMobile!.asset!._ref).url());

  // const desktopImageUrls = menu
  //   .filter((item: any) => item.ImageDesktop && item.ImageDesktop.asset)
  //   .map((item: any) => {
  //     const pageName = item.pageName.toLowerCase();
  //     return { url: urlFor(item.ImageDesktop!.asset!._ref).url(), pageName };
  //   });
  // const desktopImageUrls2 = menu
  //   .filter((item: any) => item.ImageDesktop2 && item.ImageDesktop2.asset)
  //   .map((item: any) => {
  //     const pageName = item.pageName.toLowerCase();
  //     return { url2: urlFor(item.ImageDesktop2!.asset!._ref).url(), pageName };
  //   });
  return (
    <div className=" imageHeaderCol self-end transitionEasingContact">
      <div className=" flex gallery-header-mobile md:[&>*:nth-child(3)]:block [&>*:nth-child(3)]:hidden  md:[&>*:nth-child(4)]:block [&>*:nth-child(4)]:hidden  md:[&>*:nth-child(5)]:block [&>*:nth-child(5)]:hidden">
        {header.images.map((url: any, index: Key | null | undefined) => (
          <div key={index} className="w-full  ">
            <Image
              className="block w-full h-full object-cover"
              src={urlFor(url.asset).url()}
              width={1800}
              height={1200}
              alt="menu item image"
            />
          </div>
        ))}
      </div>

      {/* <div className=" md:flex hidden gallery-header ">
        {desktopImageUrls.map((item: any, index: any) => (
          <div className="md:flex-1" key={index}>
            <Link href={item.pageName}>
              <Image
                className="h-full"
                src={item.url}
                width={1800}
                height={1200}
                alt="menu item desktop image"
              />
            </Link>
          </div>
        ))}
        {desktopImageUrls2.map((item: any, index: any) => (
          <div className="md:flex-1" key={index}>
            <Link href={item.pageName}>
              <Image
                className="h-full"
                src={item.url2}
                width={1800}
                height={1200}
                alt="menu item desktop image"
              />
            </Link>
          </div>
        ))}
      </div> */}
    </div>
  );
}

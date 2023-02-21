import Link from "next/link";
import Image from "next/image";
import urlFor from "@/lib/urlFor";
import { useRouter } from "next/router";
import { Key } from "react";
interface HeaderProps {
  title: string;
  navigation: string[];
}

export default function ImageHeader({ menu }: { menu: any }) {
  const mobileImageUrls = menu
    .filter((item: any) => item.ImageMobile && item.ImageMobile.asset)
    .map((item: any) => urlFor(item.ImageMobile!.asset!._ref).url());

  const desktopImageUrls = menu
    .filter((item: any) => item.ImageDesktop && item.ImageDesktop.asset)
    .map((item: any) => {
      const pageName = item.pageName.toLowerCase();
      return { url: urlFor(item.ImageDesktop!.asset!._ref).url(), pageName };
    });
  return (
    <div className=" imageHeaderCol self-end transitionEasingContact">
      <div className=" md:hidden flex">
        {mobileImageUrls.map((url: any, index: Key | null | undefined) => (
          <div key={index}>
            <Image
              className="block md:hidden"
              src={url}
              width={1200}
              height={800}
              alt="menu item image"
            />
          </div>
        ))}
      </div>

      <div className=" md:flex hidden gallery-header ">
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
      </div>
    </div>
  );
}

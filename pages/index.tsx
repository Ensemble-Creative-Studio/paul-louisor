import { groq } from "next-sanity";
import { client } from "../lib/sanity.client";
import { Key, ReactNode, useState } from "react";
import HeaderNav from "@/components/headerNav";
import ImageHeader from "@/components/imageHeader";
import Contact from "@/components/contact";
import Image from "next/image";
import urlFor from "@/lib/urlFor";
import Header from "@/components/header";
import { useEffect } from "react";
import Head from "next/head";
import {
  animateSiteTitle,
  shouldAnimateSiteTitle,
  markSiteTitleAsAnimated,
} from "../components/utils/intro";
interface PageProps {}

export default function HomePage({ header, menu, page }: { header: any; menu: any, page:any }) {
  const shouldAnimate = shouldAnimateSiteTitle();

  useEffect(() => {

    const homeGridColRow = document.querySelector(
      ".homeGridColRow"
    ) as HTMLElement;
    if (homeGridColRow) {
      homeGridColRow.style.opacity = "1";
    }
    if (shouldAnimate) {
      animateSiteTitle();
      markSiteTitleAsAnimated();
    }
    return () => {
      if (homeGridColRow) {
        homeGridColRow.style.opacity = "";
      }
    };
  }, [shouldAnimate]);
  return (
    <div className="homeGridColRow grid h-svh opacity-0 ">
      <Head>
        <title>Paul Louisor </title>
        <meta property="og:title" content="Paul Louisor" key="title" />



        {/* <meta property="og:description" content={header.description} key="title" /> */}
      </Head>
      <HeaderNav header={header} menu={menu} />
      <ImageHeader menu={menu} />
      <Contact header={header} />
      <div className="hidden">
  
{page.map((serie: { slides: any[]; }) =>

    serie.slides.slice(0, 3).map((slide: { images: any[]; }) =>
      slide.images.map((image: { asset: any; }, index: Key | null | undefined) => (
      
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
      
      ))
    )
  )}

</div>
    </div>
  );
}

export async function getStaticProps() {
  const query = groq`*[_type == 'siteSettings' ] `;
  const data = await client.fetch(query);

  const queryMenu = groq`*[_type == 'pages' ] |order(orderRank) `;
  const dataMenu = await client.fetch(queryMenu);

  // Modify the series query to limit the results to 2 series, including all images
  const queryPage = groq`*[_type == 'pages'][0...3]{..., "slides": slides[]->{..., "images": images}}`;
    const dataPage = await client.fetch(queryPage);

  if (data && data.length > 0) {
    return {
      props: {
        header: data[0],
        menu: dataMenu,
        page: dataPage,
      },
    };
  }
  
  return { props: { header: null, dataMenu: null, dataPage: null } };
}


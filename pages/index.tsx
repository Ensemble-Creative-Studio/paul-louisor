import { groq } from "next-sanity";
import { client } from "../lib/sanity.client";
import { Key, ReactNode, useState } from "react";
import HeaderNav from "@/components/headerNav";
import ImageHeader from "@/components/imageHeader";
import Contact from "@/components/contact";
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

        {page.map((serie: { slides: any[]; }) =>
    serie.slides.slice(0, 2).map((slide: { images: any[]; }) =>
      slide.images.map((image: { asset: any; }, index: Key | null | undefined) => (
        <link
          key={index}
          rel="preload"
          as="image"
          href={urlFor(image.asset).url()}
        />
      ))
    )
  )}

        {/* <meta property="og:description" content={header.description} key="title" /> */}
      </Head>
      <HeaderNav header={header} menu={menu} />
      <ImageHeader menu={menu} />
      <Contact header={header} />
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
console.log(dataPage)
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


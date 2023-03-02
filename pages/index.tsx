import { groq } from "next-sanity";
import { client } from "../lib/sanity.client";
import { ReactNode, useState } from "react";
import HeaderNav from "@/components/headerNav";
import ImageHeader from "@/components/imageHeader";
import Contact from "@/components/contact";
import Header from "@/components/header";
import { useEffect } from "react";
import Head from "next/head";
import {animateSiteTitle, shouldAnimateSiteTitle, markSiteTitleAsAnimated  } from '../components/utils/intro'
interface PageProps {

}

export default function HomePage({ header, menu }: { header: any, menu: any }) {
  const shouldAnimate = shouldAnimateSiteTitle();

  useEffect(() => {
    const homeGridColRow = document.querySelector('.homeGridColRow') as HTMLElement;
    if (homeGridColRow) {
      homeGridColRow.style.opacity = '1';
    }
    if (shouldAnimate) {
      animateSiteTitle();
      markSiteTitleAsAnimated();
    }
    return () => {
      if (homeGridColRow) {
        homeGridColRow.style.opacity = '';
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
        <HeaderNav  header={header} menu = {menu}/>
        <ImageHeader menu = {menu}/>
        <Contact header={header}/>
        
    </div>
  );
}

export async function getStaticProps() {
  const query = groq`*[_type == 'siteSettings' ] `;
  const data = await client.fetch(query);
  const queryMenu = groq`*[_type == 'pages' ] |order(orderRank) `;
  const dataMenu = await client.fetch(queryMenu);
  if (data && data.length > 0) {
    return {
      props: {
        header: data[0],
        menu: dataMenu
      },
    };
  }
  return { props: { header: null, dataMenu: null } };
}


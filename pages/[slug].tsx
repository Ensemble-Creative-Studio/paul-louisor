import { groq } from "next-sanity";
import { client } from "../lib/sanity.client";
import HeaderNav from "@/components/headerNav";
import ImageHeader from "@/components/imageHeader";
import Contact from "@/components/contact";
import Head from "next/head";
import { useRouter } from "next/router";
import ImageGallery from "@/components/imageGallery";
import Link from "next/link";
import { useEffect, useState } from "react";
interface PageProps {}

export default function Page({
  header,
  menu,
  page,
}: {
  header: any;
  menu: any;
  page: any;
}) {
  
  const router = useRouter();
  const slug = router.query.slug ?? "";
  const [matchingSlides, setMatchingSlides] = useState([]);
  const [matchingSeries, setMatchingSeries] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [nextPageSlug, setNextPageSlug] = useState("");
  const CapitaliseSlug = (slug as string).charAt(0).toUpperCase() + slug.slice(1);


    useEffect(() => {
      const bgWhite2 = document.querySelector(".galleryContainer.new") as HTMLElement;

      // Only add the animReveal class for the third element and onwards
      setTimeout(() => {
        bgWhite2.classList.remove('new')
      }, 2000);
  
    // Find the page that matches the current slug
    const currentPage = menu?.find(
      (page: { slug: { current: any } }) => page.slug.current === slug
    );
    const matchingSlides = slug === '/' ? [] : currentPage?.slides ?? [];
    const matchingSeries = page ?? [];


    const pageIndex = menu?.findIndex((item: any) => item.slug.current === slug);
    const nextPageIndex = (pageIndex + 1) % menu?.length; // wrap around to first page if at last page
    const nextPageSlug = menu[nextPageIndex].slug.current;
    const nextPageUrl = `/${nextPageSlug}`;
    setMatchingSlides(matchingSlides);
    setMatchingSeries(matchingSeries);
    setNextPageUrl(nextPageUrl);
    setNextPageSlug(nextPageSlug);
  }, []);
  return (
    <div className="bg-white galleryContainer new overflow-hidden h-screen overflow-y-scroll">
     <Head>
        <title>Paul Louisor - {CapitaliseSlug} </title>
        <meta property="og:title" content="Paul Louisor" key="title" />
        {/* <meta property="og:description" content={header.description} key="title" /> */}
      </Head>
      <ImageGallery slides={matchingSlides} series={matchingSeries} />
      <div className="block lastSpacing transitionScaleUp h-0"></div>
      <Link
        scroll={false}
        className="md:DesktopPaddingleft pb-8 nextPage fontSize pl-8 bottom-8 capitalize relative z-20 "
        href={nextPageUrl}
      >
        {nextPageSlug}
      </Link>{" "}
    </div>
  );
}

export const getStaticProps = async (context: { params: { slug: any } }) => {
  const { slug } = context.params;
  const query = groq`*[_type == 'siteSettings' ] `;
  const data = await client.fetch(query);
  const queryMenu = groq`*[_type == 'pages' ]|order(orderRank) `;
  const dataMenu = await client.fetch(queryMenu);
  const queryPage = groq`*[_type == 'series']`;
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
  return { props: { header: null, dataMenu: null } };
};
export async function getStaticPaths() {
  const query = groq`*[_type == 'pages'  ]`;
  const data = await client.fetch(query);
  const paths = data
    .filter((pages: { slug: null }) => pages.slug !== null)
    .map((pages: { slug: { current: any } }) => ({
      params: { slug: pages.slug.current },
    }));

  return { paths, fallback: true };
}

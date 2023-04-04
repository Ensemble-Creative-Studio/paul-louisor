import "../styles/globals.scss";
import type { AppProps } from "next/app";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "@/components/header";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Transition from "@/components/transition";
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // console.log(`🦃 Dev by : dindon.studio`)
 
    // Add the "home" class to the body element when the route is "/"
    if (router.pathname === "/") {
      document.body.classList.add("home");
    } else {
      document.body.classList.remove("home");
    }
  }, [router.pathname]);
  return (
    <div className="bg-white overflow-x-hidden">
      <Head>
        <title></title>
      </Head>
      <Header/>
      <Transition>
      <Component {...pageProps} />
      </Transition>
    </div>
  );
}

export default MyApp;


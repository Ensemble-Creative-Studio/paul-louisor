import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';
import { SetStateAction, useEffect } from "react";
import { useState } from "react";
const Transition = ({ children }: any) => {
  const router = useRouter();

  // Get previous page URL
  const [prevPageUrl, setPrevPageUrl] = useState(router.asPath);

  // Get next page URL
  const nextPageUrl = "/next-page";

  // State for initial Y position of component
  const [initialY, setInitialY] = useState('100vh');
  const [initialY2, setInitialY2] = useState('-100vh');

  // Listen to route change events
  useEffect(() => {
    const allNav = document.querySelectorAll('nav a') as any;
   
    allNav.forEach((navItem: any) => {
      navItem.addEventListener('click', () => {
      
        setInitialY('100vh');
        setInitialY2('-100vh');
      });
    });
    const handleRouteChange = (url: SetStateAction<string>, { shallow }: any) => {
      const nextPage = document.querySelector('.nextPage') as HTMLElement;
      const siteHome =  document.querySelector('.siteHome') as HTMLElement;
 
      nextPage.addEventListener('click', () => {
        setInitialY('100vh');
        setInitialY2('-100vh');

      });
      siteHome.addEventListener('mouseenter', () => {
        setInitialY('-100vh');
        setInitialY2('100vh');
        // setTimeout(() => {
        //   setInitialY('-100vh');
        //   setInitialY2('100vh');
        // }, 1500);
      });
      siteHome.addEventListener('click', () => {
        setInitialY('-100vh');
        setInitialY2('100vh');

      });

      if (prevPageUrl === '/' && url !== '/') {
        setInitialY('-100vh');
        setInitialY2('100vh');

        
      } else if (prevPageUrl !== '/' && url === '/') {
        setInitialY('100vh');
        setInitialY2('-100vh');
    
      }
       else if (prevPageUrl !== '/' && url !== '/') {
        setInitialY('-100vh');
        setInitialY2('100vh');
        setTimeout(() => {
          setInitialY2('-100vh');
          setInitialY('100vh');
        }, 500);
      }

      // Update previous page URL
      if (!shallow) {
        setPrevPageUrl(url);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, prevPageUrl]);



    let variants = {};
    if (router.asPath === '/') {

        variants = {
          out: {
            y: initialY2, 
    
            transition: {
              duration: 1.2,
              delay: 0,
              ease: [0.85, 0, 0.15, 1] ,
            },
          },
          in: {
            y: '0', 
            opacity: 1,
            transition: {
              duration: 1.2,
              delay: 0,
           
              ease: [0.85, 0, 0.15, 1] ,
            },
          },
          initial :{
            y: initialY, 
    
            transition: {
              duration: 1.2,
              delay: 0,
              ease: [0.85, 0, 0.15, 1] ,
            },
          }
        };
      } else {
        variants = {
            out: {
              
                y: initialY2, 
                opacity: 1 ,
                transition: {
                  duration: 1.2,
                  when: 'beforeChildren',
                  ease: [0.85, 0, 0.15, 1] ,
                },
              },
              in: {
                y: '0rem',
                opacity: 1,
               
                transition: {
                  duration: 1.2,
                  delay: 0,
                   ease: [0.85, 0, 0.15, 1] ,
                  when: 'afterChildren',
                },
              },
              initial: {
              
                y: initialY, 
                opacity: 1 ,
                transition: {
                  duration: 1.2,
                  when: 'beforeChildren',
                  ease: [0.85, 0, 0.15, 1] ,
                },
              },
        };
      }
  return (
    <div className="effect-1 h-screen overflow-hidden">
     			<AnimatePresence
	      initial={false}
	      mode="popLayout"
        onExitComplete={() => window.scrollTo(0, 0)}

	    >
        <motion.div     key={router.asPath} variants={variants} animate="in" initial="initial" exit="out">
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Transition;

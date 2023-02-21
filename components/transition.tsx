import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';
const Transition = ({ children }: any) => {
    const { asPath } = useRouter();
  
    let variants = {};
    if (asPath === '/') {
 
        variants = {
          out: {
            y: '-100vh', 
    
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
        };
      } else {
        variants = {
          
            out: {
              
                y: '100vh', 
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
        };
      }
  return (
    <div className="effect-1 h-screen overflow-hidden">
     			<AnimatePresence
	      initial={false}
	      mode="popLayout"
        onExitComplete={() => window.scrollTo(0, 0)}

	    >
        <motion.div     key={asPath} variants={variants} animate="in" initial="out" exit="out">
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Transition;

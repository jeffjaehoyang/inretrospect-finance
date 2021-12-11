import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import Footer from '../Footer';
import Navbar from '../Navbar';
import * as Styled from './styles';

interface Props {
  children: JSX.Element;
}

const Wrapper: React.FC<Props> = ({ children }: Props) => {
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Styled.Layout>
          <Navbar />
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            {children}
          </motion.div>
          <Footer />
        </Styled.Layout>
      </AnimatePresence>
    </>
  );
};

export default Wrapper;
